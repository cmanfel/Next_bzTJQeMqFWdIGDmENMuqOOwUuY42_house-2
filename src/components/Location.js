"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';
import locationData from '../data/location.json';
import GalleryCard from './GalleryCard';
import { convertToFileName } from '../app/utils/strings';

function generatePhotoUrls(categories) {
  return categories.map(categoryData => {
    const fileName = convertToFileName(categoryData.category);
    return `/images/location/${fileName}.jpg`;
  });
}

function generateTitles(categories) {
  return categories.map(categoryData => categoryData.category);
}

function generateDescriptions(categories) {
  return categories.map(categoryData => categoryData.description);
}

function Location() {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0.3, x: 25 },
    visible: {
      opacity: 1,
      x: 0,
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

  const mapImageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      id="location"
      className="overview-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2 variants={itemVariants}>Location</motion.h2>
      <motion.div className="map-container" variants={itemVariants}>
        <motion.img 
          src={`/images/location/map.png`} 
          alt="Map" 
          className="main-image"
          initial="hidden"
          animate={mapLoaded ? "visible" : "hidden"}
          variants={mapImageVariants}
          onLoad={() => setMapLoaded(true)}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        />
      </motion.div>
      <motion.div className="location-details" variants={itemVariants}>
        <a href={`https://www.google.com/maps?q=${locationData.geoCode.lat},${locationData.geoCode.lng}`} target="_blank" rel="noopener noreferrer" className="App-link">
          View on Google Maps
        </a>
      </motion.div>
      <motion.div variants={itemVariants}>
        <GalleryCard 
          feature="Nearby places" 
          urls={generatePhotoUrls(locationData.nearbyCategories)} 
          titles={generateTitles(locationData.nearbyCategories)} 
          descriptions={generateDescriptions(locationData.nearbyCategories)} 
        />
      </motion.div>
    </motion.section>
  );
}

export default Location;