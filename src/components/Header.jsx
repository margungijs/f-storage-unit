import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        setMobileMenuOpen(false); // Close mobile menu after logout
    };

    const handleToggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        // Close the mobile menu when the screen size is larger than 768px (adjust as needed)
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="bg-green-500 text-white p-5">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-bold">Balodītis</h1>

                <div className="flex space-x-4 items-center">
                    {/* Burger menu icon for mobile */}
                    <button
                        className="lg:hidden"
                        onClick={handleToggleMobileMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>

                    {/* Navigation links for desktop */}
                    <div className="hidden lg:flex space-x-4">
                        <button className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-300">
                            <Link to="/goodsinfo">Products</Link>
                        </button>
                        <button className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-300">
                            Ongoing shipments
                        </button>
                        <button className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-300">
                            Change Password
                        </button>
                    </div>

                    {/* Burger menu for mobile */}
                    {isMobileMenuOpen && (
                        <div className="z-50 lg:hidden absolute top-16 right-0 bg-white p-4 shadow-md">
                            <button
                                className="block text-green-500 py-2 hover:text-green-600"
                            >
                                <Link to="/goodsinfo">Products</Link>
                            </button>
                            <button
                                className="block text-green-500 py-2 hover:text-green-600"
                            >
                                Ongoing shipments
                            </button>
                            <button
                                className="block text-green-500 py-2 hover:text-green-600"
                            >
                                Change Password
                            </button>
                            {token && (
                                <button
                                    className="block text-green-500 py-2 hover:text-green-600"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    )}

                    {/* Logout button for desktop */}
                    {token && (
                        <button
                            className="bg-transparent hidden lg:block"
                            onClick={handleLogout}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
