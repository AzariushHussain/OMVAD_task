import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

const BookmarkForm = ({ token }) => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');
    const [buttonStatus, steButtonState] = useState(false)

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer); // clean up on unmount or message change
        }
    }, [message]);

    const handleSubmit = async (e) => {
        steButtonState(true)
        e.preventDefault();
        try {
            await axios.post(
                `${API_URL}/bookmarks`,
                { url },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage('Bookmark saved!');
            setUrl('');
            window.dispatchEvent(new Event('bookmarkAdded'));
        } catch (err) {
            console.log(err)
            setMessage(err.response.data.message);
        }
        steButtonState(false)
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5>Add Bookmark</h5>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit} className="d-flex">
                    <input
                        type="url"
                        className="form-control me-2"
                        placeholder="Paste URL here"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                    <button className="btn btn-success" type="submit" disabled={buttonStatus}>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookmarkForm;
