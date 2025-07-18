import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { cssGroups } from './data';
import PropertyCard from './components/PropertyCard';
import DemoPage from './components/DemoPage';
import './styles.css';

const MainPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true' || stored === 'false') return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('darkMode', dark.toString());
  }, [dark]);

  const filteredGroups = cssGroups
    .map(group => ({
      ...group,
      items: group.items.filter(
        item =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.value.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter(group => group.items.length > 0);

  return (
    <div className="app-container">
      <div className="header">
        <h1>CSS Reference</h1>
        <button className="dark-toggle" onClick={() => setDark(d => !d)}>
          {dark ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search CSS properties..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="property-list">
        {filteredGroups.map(group => (
          <div key={group.group} className="accordion-group">
            <button
              className="accordion-toggle"
              onClick={() => setOpen(open === group.group ? null : group.group)}
            >
              {group.group} {open === group.group ? '▲' : '▼'}
            </button>
            {open === group.group && (
              <div className="accordion-content">
                {group.items.map(item => (
                  <PropertyCard key={item.name} {...item} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/demo/:property" component={DemoPage} />
    </Switch>
  </BrowserRouter>
);

export default App; 