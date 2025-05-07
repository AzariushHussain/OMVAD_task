import React, { useState } from 'react';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const AuthForm = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/login' : '/register';
            const res = await axios.post(`${API_URL}${endpoint}`, { email, password });
            console.log("Login response: ",res);
            if (isLogin) {
                localStorage.setItem('token', res.data.data.token);
                setToken(res.data.token);
                window.location.reload(); 
            }
            setMessage(res.data.message || 'Success!');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error!');
        }
    };

    return (
        <div className="card mx-auto" style={{ maxWidth: 400 }}>
            <div className="card-body">
                <h4 className="card-title text-center">{isLogin ? 'Login' : 'Register'}</h4>
                {message && <div className="alert alert-info">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Create an account' : 'Already have an account?'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
