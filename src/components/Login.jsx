import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async () => {
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

        try {
            // Prepare the data to be sent to Laravel
            const loginData = {
                name: username,
                password: password,
            };

            // Make a POST request to the Laravel login endpoint
            const response = await fetch('http://localhost/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            // Handle the response
            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                // You can handle the successful login, e.g., store the token in local storage and redirect to another page
                navigate('/goodsinfo');
            } else {
                // Handle login failure
                const errorData = await response.json();

                if (response.status === 401 && errorData.name === 'Username not found') {
                    setUsernameError('Username not found.');
                } else if (response.status === 401 && errorData.password === 'Password incorrect') {
                    setPasswordError('Password incorrect.');
                } else {
                    console.error('Login failed:', errorData);
                    // Update state or show an error message to the user
                }
            }
        } catch (error) {
            console.error('Error sending login request:', error.message);
            // Handle other errors, e.g., network issues
        }
    };

    // ... (other component code)

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
