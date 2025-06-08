"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  charChangeCount?: number; // How many times each character changes
  charChangeSpeed?: number; // Speed of character changes in ms
  randomChars?: string;
  delay?: number; // Delay before animation starts in ms
}

export function TextScramble({
  text,
  className = "",
  charChangeCount = 10, 
  charChangeSpeed = 40,
  randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?",
  delay = 0,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const originalText = useRef(text);
  const isAnimating = useRef(false);
  const charTimers = useRef<number[]>([]);
  const hasAnimated = useRef(false);
  
  // Create function to get random character
  const getRandomChar = () => {
    return randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  };
  
  // Reset all timers
  const clearAllTimers = () => {
    charTimers.current.forEach(timer => window.clearTimeout(timer));
    charTimers.current = [];
  };
  
  // Handle animation start
  const startScrambleAnimation = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    // Clear any existing timers
    clearAllTimers();
    
    // Create array of character states
    const chars = originalText.current.split("");
    const finalChars = [...chars];
    const animatingChars = Array(chars.length).fill(true);
    
    // Update function that handles the random character swapping
    const updateCharacters = () => {
      // If all characters are done animating, stop
      if (!animatingChars.some(Boolean)) {
        isAnimating.current = false;
        hasAnimated.current = true;
        return;
      }
      
      // Update characters
      for (let i = 0; i < chars.length; i++) {
        if (animatingChars[i]) {
          // Replace with random character
          chars[i] = getRandomChar();
        }
      }
      
      // Update the display text
      setDisplayText(chars.join(""));
      
      // Schedule next frame
      const timerId = window.setTimeout(updateCharacters, charChangeSpeed);
      charTimers.current.push(timerId);
    };
    
    // Set timers to finish animation for each character
    for (let i = 0; i < chars.length; i++) {
      // Skip spaces
      if (originalText.current[i] === " ") {
        animatingChars[i] = false;
        continue;
      }
      
      // Set timeout to stop animation for this character and restore original
      const finishTime = Math.random() * charChangeCount * charChangeSpeed + charChangeSpeed * 2;
      const timerId = window.setTimeout(() => {
        animatingChars[i] = false;
        chars[i] = finalChars[i];
        setDisplayText(chars.join(""));
      }, finishTime);
      
      charTimers.current.push(timerId);
    }
    
    // Start the animation
    updateCharacters();
  };
  
  // Start animation on mount with delay
  useEffect(() => {
    if (!hasAnimated.current) {
      const timer = setTimeout(() => {
        startScrambleAnimation();
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);
  
  // Update internal text if prop changes
  useEffect(() => {
    originalText.current = text;
    if (!isAnimating.current) {
      setDisplayText(text);
    }
  }, [text]);
  
  return (
    <span className={cn("inline-block", className)}>
      {displayText}
    </span>
  );
} 