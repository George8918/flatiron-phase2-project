import React from 'react';

const CuisineItem = ({ imageUrl, title, description }) => {
  return (
    <div className="cuisine-item">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CuisineItem;