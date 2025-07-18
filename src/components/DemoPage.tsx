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
      <h2 style={{ marginTop: '1rem' }}>{item.name}</h2>
      <div className="property-value" style={{ margin: '1rem 0' }}>{item.value}</div>
      <div style={{ marginBottom: '1.5rem' }}>{item.description}</div>
      <div style={{ padding: '1.5rem', background: 'var(--card-bg)', borderRadius: 6, border: '1px solid var(--card-border)' }}>
        <strong>Demo:</strong>
        <div style={{ marginTop: '1rem' }}>
          {/* Placeholder for demo. You can add custom demos per property here. */}
          <em>Demo coming soon for {item.name}.</em>
        </div>
      </div>
    </div>
  );
};

export default DemoPage; 