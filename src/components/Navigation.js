"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { getAppUrl } from '../app/utils/strings.js';

function Navigation() {
  const baseUrl = getAppUrl();

  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Animation variants for nav container
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
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

  // Animation variants for nav links
  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Special variants for the Book It button
  const bookButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.nav 
      className="App-nav"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
        <motion.a 
          href="#home" 
          onClick={(e) => handleSmoothScroll(e, 'home')}
          variants={linkVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "var(--text-color)",
            color: "var(--nav-bg-color)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.a>
        <motion.a 
          href="#overview" 
          onClick={(e) => handleSmoothScroll(e, 'overview')}
          variants={linkVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "var(--text-color)",
            color: "var(--nav-bg-color)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Overview
        </motion.a>
        <motion.a 
          href="#gallery" 
          onClick={(e) => handleSmoothScroll(e, 'gallery')}
          variants={linkVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "var(--text-color)",
            color: "var(--nav-bg-color)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Gallery
        </motion.a>
        <motion.a 
          href="#location" 
          onClick={(e) => handleSmoothScroll(e, 'location')}
          variants={linkVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "var(--text-color)",
            color: "var(--nav-bg-color)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Location
        </motion.a>
        <motion.a 
          href={baseUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          variants={linkVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "var(--text-color)",
            color: "var(--nav-bg-color)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Rates
        </motion.a>
        <motion.a 
          href={baseUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          variants={linkVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "var(--text-color)",
            color: "var(--nav-bg-color)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Availability
        </motion.a>
        <motion.a 
          href={baseUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          variants={linkVariants}
          whileHover={{ 
            scale: 1.05, 
            backgroundColor: "var(--text-color)",
            color: "var(--nav-bg-color)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
        </motion.a>
        <motion.a 
          href={baseUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-book-button"
          variants={bookButtonVariants}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: "var(--text-color)",
            color: "var(--button-bg-color)",
            boxShadow: "0 4px 12px rgba(255, 255, 255, 0.3)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          Book It
        </motion.a>
    </motion.nav>
  );
}
export default Navigation;