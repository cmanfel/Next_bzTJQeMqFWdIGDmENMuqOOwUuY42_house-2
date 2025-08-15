"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ListCard from './ListCard';

const CardsList = ({ cards = [], badges = true, badgeStyle, listTitle, cardsPerRow = 6 }) => {
  // Support both badges and badgeStyle props for backward compatibility
  const showBadges = badgeStyle !== undefined ? badgeStyle : badges;
  
  useEffect(() => {
    console.log(`CardsList for category "${listTitle}" received cards:`, cards);
  }, [cards, listTitle]);
  
  // Check if this is being used in property-categories-container (MainContent)
  const isPropertyCategory = badgeStyle === true && !listTitle;

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08, // Faster stagger for amenity cards
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`custom-cards-list ${isPropertyCategory ? 'property-category-list' : ''}`}>
      {listTitle && <h2 className="cards-list-title">{listTitle}</h2>}
      
      {/* For property categories in MainContent, use the traditional container */}
      {isPropertyCategory ? (
        <motion.div 
          className="custom-card-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {Array.isArray(cards) && cards.map((card, index) => (
            <motion.div 
              key={card.id || index}
              className={`custom-list-card ${showBadges ? 'badge-style' : ''}`}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                y: -3,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="custom-list-card-image-container">
                <img src={card.imageUrl} alt={card.title || ''} />
                <div className="custom-list-card-title-overlay">
                  <h3 className="custom-list-card-title">{card.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // For regular card lists, use responsive grid layout similar to GalleryCard
        <div className="cards-grid-container">
          <motion.div 
            className="custom-cards-grid"
            data-max-cards-per-row={cardsPerRow}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {Array.isArray(cards) && cards.map((card, index) => (
              <motion.div key={card.id || index} variants={cardVariants}>
                <ListCard
                  {...card}
                  card={card}
                  showBadge={showBadges}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default CardsList;