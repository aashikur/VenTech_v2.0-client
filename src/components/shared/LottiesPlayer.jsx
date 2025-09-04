// src/components/LottiePlayer.jsx
import React from "react";
import Lottie from "lottie-react";

// Import all your Lottie JSON files
import workingAnimation from "@/assets/working.json";

// Map names to animations
const animations = {
  working: workingAnimation,
};

const LottieIcon = ({ name, width, height, loop = true }) => {
  const animationData = animations[name];

  if (!animationData) {
    return <p>Animation not found!</p>;
  }

  return (
    <div style={{ width, height }}>
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
};

export default LottieIcon;
