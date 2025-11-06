"use client";
import React from "react";
import { ReactLenis } from '@studio-freight/react-lenis'; // COMMENTED OUT for compilation

/**
 * SmoothScrollProvider component wraps the entire layout.
 * * NOTE: The "ReactLenis" component is commented out to allow the code
 * to compile in this environment due to missing external dependencies.
 * * To use smooth scrolling in your local project:
 * 1. Ensure you have installed the required packages:
 * npm install @studio-freight/lenis @studio-freight/react-lenis --force
 * 2. UNCOMMENT the import line above (line 4).
 * 3. UNCOMMENT the <ReactLenis> wrapper block below (lines 24 and 28).
 */
const SmoothScrollProvider = ({ children }) => {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false,
    wheelMultiplier: 0.8,
    root: true,
  };

  return (
    // The active ReactLenis wrapper (UNCOMMENT THIS BLOCK in your project)
    <ReactLenis root options={lenisOptions}>
    {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;
