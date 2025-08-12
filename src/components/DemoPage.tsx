import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cssGroups } from '../data';

const DemoPage: React.FC = () => {
  const { property } = useParams<{ property: string }>();
  const allItems = cssGroups.flatMap(g => g.items);
  const item = allItems.find(i => i.link === `/demo/${property}`);

  if (!item) {
    return (
      <div className="app-container">
        <p>Property not found.</p>
        <Link to="/">← Back to list</Link>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Link to="/">← Back to list</Link>
      <h2 className="demo-page-title">{item.name}</h2>
      <div className="property-value demo-page-property-value">{item.value}</div>
      <div className="demo-page-description">{item.description}</div>
      <div className="demo-page-container">
        <strong>Demo:</strong>
        <div className="demo-page-content">
          {/* Placeholder for demo. You can add custom demos per property here. */}
          <em>Demo coming soon for {item.name}.</em>
        </div>
      </div>
    </div>
  );
};

export default DemoPage; 