import React, { useState, useEffect } from 'react';
import Category from '../modules/models/category';
import Subcategory from '../modules/models/subcategory';
import { trackView, trackSearch } from '../utils/googleAnalytics';
import SearchBar from '../components/searchBar';
import Categories from '../components/categories';
import Footer from '../components/footer';
import Tagline from '../components/tagline';
import cheatsheetJson from '../modules/cheatsheet.json';

const getInitialDarkMode = (): boolean => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true' || stored === 'false') {
        return stored === 'true';
    }
    // Fallback to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const Home: React.FC = () => {
    const [cheatsheet, setCheatsheet] = useState<Category[]>(cheatsheetJson);
    const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode());

    useEffect(() => {
        trackView('/cheatsheet');
    }, []);

    useEffect(() => {
        const handleStorage = () => setDarkMode(getInitialDarkMode());
        const handleSystemTheme = (e: MediaQueryListEvent) => {
            // Only update if user hasn't set a preference
            if (localStorage.getItem('darkMode') !== 'true' && localStorage.getItem('darkMode') !== 'false') {
                setDarkMode(e.matches);
            }
        };
        window.addEventListener('storage', handleStorage);
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', handleSystemTheme);
        return () => {
            window.removeEventListener('storage', handleStorage);
            mq.removeEventListener('change', handleSystemTheme);
        };
    }, []);

    const search = (text: string) => {
        const lowerText = text.toLowerCase();
        const newCheatsheet: Category[] = cheatsheetJson.map((category: Category) => {
            if (window.history?.pushState) {
                const { origin, pathname } = window.location;
                const newUrl = `${origin}${pathname}${text ? `?q=${encodeURIComponent(text)}` : ''}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
            }
            if (category.title.toLowerCase().includes(lowerText)) {
                return category;
            } else {
                return {
                    title: category.title,
                    content: category.content.map((subcategory: Subcategory) => {
                        if (
                            subcategory.title.toLowerCase().includes(lowerText) ||
                            subcategory.description.toLowerCase().includes(lowerText)
                        ) {
                            return subcategory;
                        } else {
                            return {
                                title: subcategory.title,
                                docs: subcategory.docs,
                                description: subcategory.description,
                                table: subcategory.table.filter((tr) =>
                                    tr.some((td) => td.toLowerCase().includes(lowerText))
                                ),
                            };
                        }
                    })
                };
            }
        });
        setCheatsheet(newCheatsheet);
        trackSearch(text);
    };

    return (
        <main className={`tracking-wide font-roboto min-h-screen grid content-start ${darkMode ? 'dark bg-gray-900' : ''}`}>
            <button
                onClick={() => {
                    const newMode = !darkMode;
                    setDarkMode(newMode);
                    localStorage.setItem('darkMode', newMode.toString());
                }}
                className="absolute z-[100] top-4 right-4 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {darkMode ? '🌙 Dark Mode (On)' : '☀️ Light Mode (On)'}
            </button>
            <SearchBar searchFilter={search} />
            <Categories cheatsheet={cheatsheet} />
            <Footer />
        </main>
    );
};

export default Home;
