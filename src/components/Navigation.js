"use client";

import React from 'react';
import { getAppUrl } from '../app/utils/strings.js';

function Navigation() {
  const baseUrl = getAppUrl();

  return (
    <nav className="App-nav">
        <a href="#home">Home</a>
        <a href="#overview">Overview</a>
        <a href="#gallery">Gallery</a>
        <a href="#location">Location</a>
        <a href={baseUrl} target="_blank" rel="noopener noreferrer">Rates</a>
        <a href={baseUrl} target="_blank" rel="noopener noreferrer">Availability</a>
        <a href={baseUrl} target="_blank" rel="noopener noreferrer">Contact</a>
    </nav>
  );
}
export default Navigation;