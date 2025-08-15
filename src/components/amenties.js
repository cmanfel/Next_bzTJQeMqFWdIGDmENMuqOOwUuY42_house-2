"use client";
import React from "react";
import { motion } from 'framer-motion';
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
  const containerVariants = {
    hidden: { opacity: 0.3, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.15  // Slightly longer stagger for amenity categories
      }
    }
  };

  const categoryVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
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
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div 
        className="overview-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
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
        viewport={{ once: true, amount: 0.1 }}
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
