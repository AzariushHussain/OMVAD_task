import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import BookmarkForm from './components/BookmarkForm';
import BookmarkGrid from './components/BookmarkGrid';
import Navbar from './components/Navbar';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-bs-theme',
            darkMode ? 'dark' : 'light'
        );
    }, [darkMode]);

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <div>
            <div className="container py-4  min-vh-100 ">
                {!token ? (
                    <AuthForm setToken={setToken} />
                ) : (
                    <> 
                        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} token={token} onLogout={handleLogout} />
                    <div>
                                <BookmarkForm token={token} />
                                <hr />
                                <BookmarkGrid token={token} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
