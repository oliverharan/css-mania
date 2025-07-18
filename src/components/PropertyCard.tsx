import React from 'react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  name: string;
  value: string;
  description: string;
  link: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ name, value, description, link }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="property-card">
      <div className="property-title">
        <Link to={link}>{name}</Link>
      </div>
      <div className="property-value">{value}</div>
      <div>{description}</div>
      <button className="copy-btn" onClick={handleCopy} title="Copy CSS value">Copy</button>
    </div>
  );
};

export default PropertyCard; 