import React from 'react';
import './skeleton.css';

const Skeleton = () => {
  return (
    <div>
      {/* First Section */}
      <div className="skeleton-container">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-subtitle"></div>
        <div className="skeleton skeleton-image"></div>
        <div className="skeleton skeleton-button"></div>
      </div>

      {/* Second Section */}
      <div className="skeleton-container">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-subtitle"></div>
        <div className="skeleton skeleton-image"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  );
};

export default Skeleton;
