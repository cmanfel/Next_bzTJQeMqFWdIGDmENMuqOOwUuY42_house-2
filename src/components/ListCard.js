"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function ListCard({ imageUrl, title, description }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    console.log("ListCard received data:", { imageUrl, title, description });
  }, [imageUrl, title, description]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="custom-list-card"
      initial="hidden"
      animate={imageLoaded ? "visible" : "hidden"}
      variants={imageVariants}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="custom-list-card-image-container">
        <motion.img 
          src={imageUrl} 
          alt={title}
          onLoad={() => setImageLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="custom-list-card-title-overlay"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="custom-list-card-title">{title}</h2>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ListCard;