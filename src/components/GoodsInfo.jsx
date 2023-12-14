import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {findAllByDisplayValue} from "@testing-library/react";

const GoodsOutput = () => {
    const [goods, setGoods] = useState([]);
    const [selectedGood, setSelectedGood] = useState(null);
    const [sortedGoods, setSortedGoods] = useState([]);
    const [selectedSort, setSelectedSort] = useState('none');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState({ id: null, category: null });
    const [imzis, setImzis] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const role = localStorage.getItem('role');

    useEffect(() => {
        // Check if user is logged in when the component mounts
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        if (!token) {
            // Redirect or handle unauthorized access
            navigate('/');
        } else {
            fetchData(); // Fetch data only if logged in
        }
    }, [imzis, navigate]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/api/getProducts');
            console.log('API Response:', response.data);
            setGoods(response.data);
            setSortedGoods(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCategoryChange = async (goodId, category) => {
        setSelectedProduct({ id: goodId, category });

        try {
            const response = await fetch(`http://localhost/api/updateCategory/${selectedProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // or other content type as needed
                },
                body: JSON.stringify(selectedProduct),
            });

            const data = await response.json();
            if(data.message){
                setSelectedProduct({ id: null, category: null });
            }
            console.log('POST response:', data);
        } catch (error) {
            console.error('Error sending POST request:', error.message);
        }
    };

    //console.log(selectedProduct.category);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/groupedProducts');
                console.log('API Response:', response.data);
                setGoods(response.data);
                setSortedGoods(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedProduct ]);

    const handleMoreInfo = (good) => {
        setSelectedGood(good);
    };

    const handleClose = () => {
        setSelectedGood(null);
    };

    const handleEdit = (good) => {
        if (good) {
            navigate(`/goodsEdit/${good.id}`);
        }
    };

// GoodsOutput.jsx

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost/api/products/${selectedGood.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to include additional headers if required by your API
                },
                // You can include a body if your API expects data for deletion
                // body: JSON.stringify({ /* your data */ }),
            });

            if (!response.ok) {
                // Handle non-successful responses here
                console.error('Error deleting product:', response.statusText);

            }
            setImzis(!imzis);
            if(response.ok){
                handleClose();
            }

            // Add any additional logic after successful deletion

        } catch (error) {
            console.error('Error deleting product:', error.message);
        }
    };




    const handleSort = (criteria) => {
        let sorted;

        switch (criteria) {
            case 'mostExpensive':
                sorted = Object.keys(goods).reduce((acc, category) => {
                    const categoryItems = goods[category].sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
                    acc[category] = categoryItems;
                    return acc;
                }, {});
                break;
            case 'leastExpensive':
                sorted = Object.keys(goods).reduce((acc, category) => {
                    const categoryItems = goods[category].sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
                    acc[category] = categoryItems;
                    return acc;
                }, {});
                break;
            case 'aToZ':
                sorted = Object.keys(goods).reduce((acc, category) => {
                    const categoryItems = goods[category].sort((a, b) => a.name.localeCompare(b.name) || a.price - b.price);
                    acc[category] = categoryItems;
                    return acc;
                }, {});
                break;
            case 'zToA':
                sorted = Object.keys(goods).reduce((acc, category) => {
                    const categoryItems = goods[category].sort((a, b) => b.name.localeCompare(a.name) || a.price - b.price);
                    acc[category] = categoryItems;
                    return acc;
                }, {});
                break;
            default:
                sorted = goods;
        }

        setSortedGoods(sorted);
        setSelectedSort(criteria);
        closeDropdown();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <div className="relative inline-block">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        Sort by: {selectedSort === 'none' ? 'Select' : selectedSort.replace(/([A-Z])/g, ' $1')}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path fillRule="evenodd" d="M10 15l-5-5 5-5 5 5-5 5z" />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button
                                    onClick={() => handleSort('mostExpensive')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                    role="menuitem"
                                >
                                    Most Expensive
                                </button>
                                <button
                                    onClick={() => handleSort('leastExpensive')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                    role="menuitem"
                                >
                                    Least Expensive
                                </button>
                                <button
                                    onClick={() => handleSort('aToZ')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                    role="menuitem"
                                >
                                    A-Z
                                </button>
                                <button
                                    onClick={() => handleSort('zToA')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                    role="menuitem"
                                >
                                    Z-A
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div>
                {[...Object.keys(sortedGoods).sort((a, b) => (a === 'Unsorted' ? -1 : b === 'Unsorted' ? 1 : a.localeCompare(b)))].map((category) => (
                    <div className = "p-5">
                        <h2 className = "text-3xl font-bold mb-5">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sortedGoods[category].map((good) => (
                                <div key={good.id} className="bg-white p-4 rounded-md shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">{good.name}</h3>
                                    {good.price !== null && !isNaN(good.price) ? (
                                        <p className="text-green-500 font-bold">${Number(good.price).toFixed(2)}</p>
                                    ) : (
                                        <p className="text-red-500">Invalid price</p>
                                    )}
                                    <div className="mt-4 mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Select Category:</label>
                                        <select
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedProduct[good.id] || 'All'}
                                            onChange={(e) => handleCategoryChange(good.id, e.target.value)}
                                        >
                                            <option value="All">All Categories</option>
                                            <option value="Electronics and Gadgets">Electronics and Gadgets</option>
                                            <option value="Apparel and Fashion">Apparel and Fashion</option>
                                            <option value="Home and Kitchen">Home and Kitchen</option>
                                            <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                                            <option value="Sports and Outdoors">Sports and Outdoors</option>
                                            <option value="Books and Stationery">Books and Stationery</option>
                                            <option value="Health and Wellness">Health and Wellness</option>
                                            <option value="Toys and Games">Toys and Games</option>
                                        </select>
                                    </div>
                                    <button
                                        className="text-blue-500 hover:underline focus:outline-none"
                                        onClick={() => handleMoreInfo(good)}
                                    >
                                        More Info
                                    </button>
                                    {selectedGood && selectedGood.id === good.id && (
                                        <button
                                            className="text-blue-500 hover:underline focus:outline-none"
                                            onClick={() => handleEdit(good)}
                                        >
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>



            {selectedGood && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-md shadow-md max-w-md p-8">
                        <h2 className="text-2xl font-bold mb-4">{selectedGood.name}</h2>
                        {selectedGood.price !== null && !isNaN(selectedGood.price) ? (
                            <p className="text-green-500 font-bold">${Number(selectedGood.price).toFixed(2)}</p>
                        ) : (
                            <p className="text-red-500">Invalid price</p>
                        )}
                        <p className="text-gray-600 mb-4">{selectedGood.description}</p>
                        <p className="text-gray-600 mb-4">In storage: {selectedGood.count}</p>
                        <div className="flex space-x-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition-all duration-300"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                            { (role == 1 || role == 3) &&
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-all duration-300"
                                onClick={() => handleEdit(selectedGood)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </button>
                            }
                            {(role == 1 || role == 3) &&
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition-all duration-300"
                                onClick={handleDelete}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        }
                        </div>
                    </div>
                </div>
            )}

            <footer className="flex justify-center mt-4">
                { (role == 1 || role == 3) &&
                    <Link to="/insert-goods">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition-all duration-300">
                            Add Product
                        </button>
                    </Link>
                }

            </footer>
        </div>
    );
};

export default GoodsOutput;
