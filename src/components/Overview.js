"use client";
import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';
import texts from '../data/texts.json';
import photos from '../data/photos.json';
import GalleryCard from './GalleryCard';

function Overview() {
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
    hidden: { opacity: 0.3, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0.5, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      id="overview"
      className="overview-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
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