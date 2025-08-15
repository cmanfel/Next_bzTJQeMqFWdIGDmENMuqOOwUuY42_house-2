"use client";

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

function buildImageUrl(url) {
  if (url.startsWith('/')) {
    return url;
  }
  return `/images/photos/${url}`;
}

function GalleryCard({ feature, urls, titles = [], descriptions = [], cardsPerRow = 2 }) {
  const [open, setOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = urls.map((url, index) => ({
    src: buildImageUrl(url),
    title: titles[index] || '',
    description: descriptions[index] || '',
    alt: `${feature} ${index + 1}`,
    // Use the built-in caption property
    caption: titles[index] && descriptions[index] 
      ? `${titles[index]} - ${descriptions[index]}` 
      : titles[index] || descriptions[index] || ''
  }));

  // Calculate the appropriate grid template columns based on cardsPerRow
  const gridStyle = {
    gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)`,
  };

  // Handle image load
  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  // Container animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: isMobile ? 0.5 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : (isMobile ? 0.5 : 0.3),
        staggerChildren: shouldReduceMotion ? 0 : (isMobile ? 0.2 : 0.15),
        delayChildren: shouldReduceMotion ? 0 : (isMobile ? 0.1 : 0.2)
      }
    }
  };

  // Individual card animation variants
  const cardVariants = {
    hidden: { 
      opacity: isMobile ? 0.3 : 0, 
      scale: isMobile ? 0.95 : 0.8,
      y: isMobile ? 20 : 40
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0 : (isMobile ? 0.8 : 0.6), 
        ease: [0.25, 0.46, 0.45, 0.94]  // Custom cubic-bezier for smooth entrance
      }
    }
  };

  return (
    <div className="gallery-card">
      <h3>{feature}</h3>
      <motion.div 
        className="gallery-grid" 
        style={gridStyle}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        onViewportEnter={() => {
          if (isMobile) {
            console.log(`${feature} GalleryCard entering viewport on mobile`);
          }
        }}
        viewport={{ 
          once: false, 
          amount: isMobile ? 0.05 : 0.2,
          margin: isMobile ? "0px 0px -20px 0px" : "0px 0px -50px 0px",
          root: null
        }}
      >
        {urls.map((url, index) => (
          <motion.div 
            key={index} 
            className="grid-item" 
            style={{ height: cardsPerRow <= 2 ? '400px' : '200px' }}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.03,
              y: -5,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.img
              src={buildImageUrl(url)}
              alt={`${feature} ${index + 1}`}
              className="thumbnail"
              onClick={() => setOpen(true)}
              onLoad={() => handleImageLoad(index)}
              initial={{ opacity: 0 }}
              animate={{ opacity: loadedImages.has(index) ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
            {(titles[index] || descriptions[index]) && (
              <motion.div 
                className="overlay"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: loadedImages.has(index) ? 1 : 0,
                  y: loadedImages.has(index) ? 0 : 10
                }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {titles[index] && <h4 className="overlay-title">{titles[index]}</h4>}
                {descriptions[index] && <p className="overlay-description">{descriptions[index]}</p>}
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          plugins={[Captions]}
        />
      )}
    </div>
  );
}

export default GalleryCard;