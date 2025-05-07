import React from 'react';

const Navbar = ({ darkMode, setDarkMode, token, onLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
            <span className="navbar-brand mb-0 h1">Bookmark Saver</span>
            <div className="ms-auto d-flex align-items-center">
                <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                {token && (
                    <button className="btn btn-danger" onClick={onLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
