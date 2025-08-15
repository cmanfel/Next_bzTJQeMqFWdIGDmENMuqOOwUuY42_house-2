"use client";

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import texts from '../data/texts.json';
import photos from '../data/photos.json';
import { getAppUrl } from '../app/utils/strings.js';

function MainContent() {
  const [imageLoaded, setImageLoaded] = useState(false);
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
        opacity: { duration: shouldReduceMotion ? 0 : (isMobile ? 0.6 : 0.4), ease: "easeOut" },
        backgroundSize: { duration: shouldReduceMotion ? 0 : (isMobile ? 1.0 : 0.8), ease: "easeOut", delay: shouldReduceMotion ? 0 : (isMobile ? 0.3 : 0.2) }
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
        transition={{ duration: shouldReduceMotion ? 0 : (isMobile ? 0.6 : 0.4), ease: "easeOut", delay: shouldReduceMotion ? 0 : (isMobile ? 0.15 : 0.1) }}
      >
        <button className="book-button" onClick={handleBookClick}>Book It</button>
      </motion.section>
            <motion.div
        className="fullwidth-content-text"
        initial={{ y: isMobile ? 15 : 20, opacity: 0.7 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : (isMobile ? 0.7 : 0.5), ease: "easeOut", delay: shouldReduceMotion ? 0 : (isMobile ? 0.3 : 0.2) }}
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