// src/Login.js
import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    const navigate = useNavigate();

    // Use useEffect to update showSidebar state based on screen width
    useEffect(() => {
        const handleResize = () => {
            setShowSidebar(window.innerWidth > 640); // Adjust the width breakpoint as needed
        };

        // Initial check on mount
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogin = () => {
        // Simple front-end validations
        let hasError = false;

        if (!username.trim()) {
            setUsernameError('Username is required.');
            hasError = true;
        } else {
            setUsernameError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required.');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (hasError) {
            // Stop login process if there are validation errors
            return;
        }

        // Add your login logic here (backend validation can be added as well)
        console.log('Logging in...', { username, password });

        navigate('/goodsinfo')
    };

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className={`flex ${showSidebar ? 'flex-row' : 'flex-col'} h-96 shadow-md rounded bg-transparent`}>
                <div className="bg-white p-8 rounded-l-lg w-full sm:w-96">
                    <h2 className="text-5xl text-center font-bold mb-5">Login</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className={`w-full px-3 py-2 border rounded-md focus:border-green-500 ${
                                    usernameError ? 'border-red-500' : ''
                                }`}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameError && <p className="text-red-500 mt-2">{usernameError}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className={`w-full px-3 py-2 border rounded-md focus:border-green-500 ${
                                    passwordError ? 'border-red-500' : ''
                                }`}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
                        </div>
                        <button
                            type="button"
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </form>
                </div>
                {showSidebar && (
                    <div className="bg-green-500 p-8 rounded-r-lg w-full sm:w-20"></div>
                )}
            </div>
        </div>
    );
};

export default Login;
