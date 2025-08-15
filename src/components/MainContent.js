"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import texts from '../data/texts.json';
import photos from '../data/photos.json';
import { getAppUrl } from '../app/utils/strings.js';

function MainContent() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const slogan = texts.slogan;
  const mainPhotoUrl = `../../images/photos/${photos.mainPhotoUrl}`;

  const handleBookClick = () => {
    const url = getAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.main
      id="home"
      className="App-main"
      initial={{ opacity: 0.5 }}
      animate={{ 
        opacity: 1,
        backgroundSize: imageLoaded ? "cover" : "110%"
      }}
      transition={{ 
        opacity: { duration: 0.4, ease: "easeOut" },
        backgroundSize: { duration: 0.8, ease: "easeOut", delay: 0.2 }
      }}
      style={{
        backgroundImage: imageLoaded ? `url(${mainPhotoUrl})` : 'none',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Hidden image for load detection */}
      <img
        src={mainPhotoUrl}
        alt=""
        style={{ display: 'none' }}
        onLoad={() => setImageLoaded(true)}
      />
      
      <motion.section 
        className="image-container"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        <button className="book-button" onClick={handleBookClick}>Book It</button>
      </motion.section>
      <motion.div 
        className="fullwidth-content-text"
        initial={{ y: 20, opacity: 0.7 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <h2>
          {slogan.split("").map((char, index) => (
            <span
              key={index}
              className={`letter ${imageLoaded ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>
      </motion.div>
    </motion.main>
  );
}

export default MainContent;