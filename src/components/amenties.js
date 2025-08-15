"use client";
import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from 'framer-motion';
import CardsList from "../components/CardsList";
import listing from "../data/listing.json";
import { convertToFileName } from "../app/utils/strings";
import texts from "../data/texts.json";

const categories = [
    "Basic amenities",    
    "Heating and cooling amenities",
    "Parking and facilities",
    "Outdoor amenities",
    "Kitchen amenities",
    "Entertainment amenities",
    "Family amenities",
    "Bedroom and laundry amenities",
    "Bathroom amenities",
    "Location amenities",
    "Safety amenities",    
    "Office amenities",
    "Services"
  ];

function AmenitiesPage() {
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

  const containerVariants = {
    hidden: { opacity: 0.3, scale: isMobile ? 0.98 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : (isMobile ? 0.7 : 0.5),
        ease: "easeOut",
        staggerChildren: shouldReduceMotion ? 0 : (isMobile ? 0.2 : 0.15)
      }
    }
  };

  const categoryVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 20 : 30,
      scale: isMobile ? 0.98 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: shouldReduceMotion ? 0 : (isMobile ? 0.7 : 0.6), 
        ease: [0.25, 0.46, 0.45, 0.94]  // Custom easing for smooth entrance
      }
    }
  };

  return (
    <motion.div
      className="amenities-page"
      style={{ backgroundColor: "var(--main-bg-color)" }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      onViewportEnter={() => {
        if (isMobile) {
          console.log('Amenities entering viewport on mobile');
        }
      }}
      viewport={{ 
        once: false, 
        amount: isMobile ? 0.05 : 0.2,
        margin: isMobile ? "0px 0px -20px 0px" : "0px 0px -50px 0px",
        root: null
      }}
    >
      <motion.div 
        className="overview-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ 
          once: false,
          amount: isMobile ? 0.05 : 0.3,
          margin: isMobile ? "0px 0px -20px 0px" : "0px 0px -50px 0px"
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2>Amenities</h2>
        <p>{listing.texts?.amenities || "Explore our wide range of amenities."}</p>
      </motion.div>
      <motion.section 
        className="amenities-cards"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ 
          once: false,
          amount: isMobile ? 0.05 : 0.1,
          margin: isMobile ? "0px 0px -20px 0px" : "0px 0px -50px 0px",
          root: null
        }}
      >
        {categories.map((category) => {
          const amenities = listing.amentiesCategories[category];
          if (!amenities) return null; // Skip categories not found in the data

          const cardData = amenities.map((amenity) => {
            const fileName = convertToFileName(amenity);
            const imageUrl = `/images/amenities/${fileName}.jpg`;
            return {
              imageUrl,
              title: amenity,
              description: amenity,
            };
          });

          return (
            <motion.div key={category} variants={categoryVariants}>
              <CardsList cards={cardData} listTitle={category} />
            </motion.div>
          );
        })}
      </motion.section>
    </motion.div>
  );
}

export default AmenitiesPage;
