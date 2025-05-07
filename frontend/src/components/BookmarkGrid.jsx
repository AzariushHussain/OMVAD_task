import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const BookmarkGrid = ({ token }) => {
    const [bookmarks, setBookmarks] = useState([]);

    const fetchBookmarks = async () => {
        try {
            const res = await axios.get(`${API_URL}/bookmarks`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookmarks(res.data.data);
        } catch {
            console.error('Failed to fetch bookmarks');
        }
    };

    const deleteBookmark = async (id) => {
        try {
            await axios.delete(`${API_URL}/bookmarks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookmarks((prev) => prev.filter((b) => b._id !== id));
        } catch {
            console.error('Failed to delete bookmark');
        }
    };

    useEffect(() => {
        fetchBookmarks();
        const listener = () => fetchBookmarks();
        window.addEventListener('bookmarkAdded', listener);
        return () => window.removeEventListener('bookmarkAdded', listener);
    }, []);

    return (
        <div className="row">
            {bookmarks.length>0&&bookmarks.map((bm) => (
                <div className="col-md-4 mb-3" key={bm._id}>
                    <div className="card h-100">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <img
                                src={bm.favicon}
                                alt=""
                                style={{ width: 24, height: 24 }}
                                onError={(e) => (console.log('favicon not found'))}
                            />
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteBookmark(bm._id)}
                            >
                                Delete
                            </button>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{bm.title}</h5>
                            <p className="card-text">{bm.summary}</p>
                        </div>
                        <div className="card-footer">
                            <a href={bm.url} target="_blank" rel="noopener noreferrer" className="card-link">
                                Visit
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookmarkGrid;
