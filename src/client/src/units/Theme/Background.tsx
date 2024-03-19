import React from "react";

interface BackgroundProps {
  isDarkMode: boolean;
}

const Background: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  const bgClasses = 'bg-gradient-to-bl from-purple-950 to-black'
  const bgColor = isDarkMode ? bgClasses : '';
  return (
    <div className={`fixed inset-0 ${bgColor}`}></div>
  );
}

export default Background;
