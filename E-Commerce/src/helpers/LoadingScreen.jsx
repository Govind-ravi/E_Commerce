import React from 'react'

const LoadingScreen = ({ width, height }) => {
    return (
      <div
        className="bg-gray-300 animate-pulse-sync rounded my-4"
        style={{ width: width, height: height }}
      >
      </div>
    );
  };
  
  export default LoadingScreen;
  