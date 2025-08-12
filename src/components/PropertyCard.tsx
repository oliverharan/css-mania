import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  name: string;
  value: string;
  description: string;
  link: string;
  aiLink?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ name, value, description, link, aiLink }) => {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAiSection, setShowAiSection] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const generateAIDefinition = async () => {
    if (!aiLink) return;
    
    setIsLoading(true);
    setShowAiSection(true);
    
    try {
      // For now, we'll use a mock response since we can't actually call external AI APIs
      // In a real implementation, you'd call your AI service API here
      const mockResponse = `Here's a detailed explanation of **${name}**:

**What it does:**
${description}

**Syntax:**
\`\`\`css
${value}
\`\`\`

**Common use cases:**
- Layout management
- Responsive design
- Component alignment

**Browser support:** Modern browsers (IE10+)

**Best practices:**
- Use semantic HTML
- Consider accessibility
- Test across different screen sizes

**Example:**
\`\`\`css
.container {
  ${value}
  /* Additional properties for better layout */
}
\`\`\``;

      // Simulate API delay
      setTimeout(() => {
        setAiResponse(mockResponse);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      setAiResponse('Sorry, unable to generate AI definition at this time.');
      setIsLoading(false);
    }
  };

  return (
    <div className="property-card">
      <div className="property-header">
        <div className="property-title">
          <Link to={link}>{name}</Link>
        </div>
        <button className="copy-btn" onClick={handleCopy} title="Copy CSS value">Copy</button>
      </div>
      <div className="property-value">{value}</div>
      <div>{description}</div>
      <div className="property-actions">
        {aiLink && (
          <button 
            className="ai-btn" 
            onClick={generateAIDefinition} 
            title="Generate AI definition for this property"
            disabled={isLoading}
          >
            {isLoading ? '⏳ Generating...' : '🤖 Run AI'}
          </button>
        )}
      </div>
      
      {showAiSection && (
        <div className="ai-response-section">
          <div className="ai-response-header">
            <h4>AI Definition</h4>
            <button 
              className="close-ai-btn" 
              onClick={() => setShowAiSection(false)}
              title="Close AI definition"
            >
              ×
            </button>
          </div>
          <div className="ai-response-content">
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Generating AI definition...</p>
              </div>
            ) : (
              <div className="ai-response-text" dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br>') }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard; 