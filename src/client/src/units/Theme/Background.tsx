import React from "react";

interface BackgroundProps {
  isDarkMode: boolean;
}

const Background: React.FC<BackgroundProps> = ({ isDarkMode }) => {
  const bgClasses = 'bg-gradient-to-tr from-sky-950 via-black to-purple-950 from-5% via-60%'
  const bgColor = isDarkMode ? bgClasses : '';
  return (
    <div className={`fixed inset-0 ${bgColor}`}></div>
  );
}

export default Background;
