"use client";

import React from 'react';
import { motion } from 'framer-motion';
import GalleryCard from './GalleryCard';
import '../App.css';
import photos from '../data/photos.json';

function CustomGallery() {
  // Helper function to find photo descriptions based on filenames
  const getDescriptionsForPhotos = (photoFilenames) => {
    return photoFilenames.map(filename => {
      const photoDetails = photos.photoList.find(photo => photo.fileName === filename);
      return photoDetails ? photoDetails.description : "";
    });
  };

  const containerVariants = {
    hidden: { opacity: 0.3, y: 20 },
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
      id="gallery"
      className="gallery-section overview-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
    >
      <motion.h2 variants={itemVariants}>Gallery</motion.h2>
      <motion.div className="card-container" variants={itemVariants}>
        {Object.entries(photos.indoorPhotoUrlsMap).map(([feature, urls]) => {
          // Get descriptions for each photo in this feature
          const descriptions = getDescriptionsForPhotos(urls);
          
          return (
            <GalleryCard 
              key={feature} 
              feature={feature} 
              urls={urls} 
              descriptions={descriptions} 
            />
          );
        })}
      </motion.div>
      
      <motion.h2 variants={itemVariants}>Outdoor Gallery</motion.h2>
      <motion.div className="card-container" variants={itemVariants}>
        {/* Get descriptions for outdoor photos */}
        <GalleryCard 
          feature="outdoor" 
          urls={photos.outdoorPhotoUrls} 
          descriptions={getDescriptionsForPhotos(photos.outdoorPhotoUrls)} 
        />
      </motion.div>
    </motion.section>
  );
}

export default CustomGallery;
