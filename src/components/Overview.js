"use client";
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import '../App.css';
import texts from '../data/texts.json';
import photos from '../data/photos.json';
import GalleryCard from './GalleryCard';

function Overview() {
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

  const mainIndoorPhotoUrl = `../../images/photos/${photos.mainIndoorPhotoUrl}`;
  const mainOutdoorPhotoUrl = `../../images/photos/${photos.mainOutdoorPhotoUrl}`;
  
  // Combine both indoor and outdoor into a single gallery
  const overviewGallery = {
    feature: "",
    urls: [mainIndoorPhotoUrl, mainOutdoorPhotoUrl],
    titles: ["Indoor", "Outdoor"],
    descriptions: [texts.indoor, texts.outdoor]
  };

  const containerVariants = {
    hidden: { opacity: 0.3, y: isMobile ? 20 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : (isMobile ? 0.7 : 0.5),
        ease: "easeOut",
        staggerChildren: shouldReduceMotion ? 0 : (isMobile ? 0.15 : 0.1)
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0.5, y: isMobile ? 10 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : (isMobile ? 0.6 : 0.4), ease: "easeOut" }
    }
  };

  return (
    <motion.section
      id="overview"
      className="overview-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      onViewportEnter={() => {
        if (isMobile) {
          console.log('Overview entering viewport on mobile');
        }
      }}
      viewport={{ 
        once: false,
        amount: isMobile ? 0.05 : 0.3, 
        margin: isMobile ? "0px 0px -20px 0px" : "0px 0px -50px 0px",
        root: null
      }}
    >
      <motion.div className="overview-text" variants={itemVariants}>
        <h2>Overview</h2>
        <p>{texts.description}</p>
      </motion.div>
      <motion.div className="overview-content centered-content" variants={itemVariants}>
        {/* Single GalleryCard with both indoor and outdoor images */}
        <GalleryCard 
          feature={overviewGallery.feature}
          urls={overviewGallery.urls}
          titles={overviewGallery.titles}
          descriptions={overviewGallery.descriptions}
        />
      </motion.div>
    </motion.section>
  );
}

export default Overview;