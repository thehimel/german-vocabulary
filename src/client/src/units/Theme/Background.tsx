import React from "react";

interface BackgroundProps {
  isDarkMode: boolean;
}

const Background: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  const bgClasses = 'bg-gradient-to-tr from-black via-sky-950 to-purple-950 from-50%'
  const bgColor = isDarkMode ? bgClasses : '';
  return (
    <div className={`fixed inset-0 ${bgColor}`}></div>
  );
}

export default Background;
