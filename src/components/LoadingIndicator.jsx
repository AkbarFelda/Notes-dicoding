import React from 'react';

const LoadingIndicator = ({ size = 80 }) => {
  return (
    <div className="loading-indicator" style={{ width: size, height: size }}>
      <div className="spinner">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`blade blade-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingIndicator;