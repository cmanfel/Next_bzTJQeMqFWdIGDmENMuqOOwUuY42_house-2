"use client";

import React from 'react';
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

  return (
    <nav className="App-nav">
        <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')}>Home</a>
        <a href="#overview" onClick={(e) => handleSmoothScroll(e, 'overview')}>Overview</a>
        <a href="#gallery" onClick={(e) => handleSmoothScroll(e, 'gallery')}>Gallery</a>
        <a href="#location" onClick={(e) => handleSmoothScroll(e, 'location')}>Location</a>
        <a href={baseUrl} target="_blank" rel="noopener noreferrer">Rates</a>
        <a href={baseUrl} target="_blank" rel="noopener noreferrer">Availability</a>
        <a href={baseUrl} target="_blank" rel="noopener noreferrer">Contact</a>
        <a href={baseUrl} target="_blank" rel="noopener noreferrer" className="nav-book-button">Book It</a>
    </nav>
  );
}
export default Navigation;