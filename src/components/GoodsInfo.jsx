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
            const productId = good.id;
            navigate(`/goodsEdit/${productId}`);
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
            case 'edit':
                handleEdit(selectedGood);
                return;
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
                                <button
                                    onClick={() => handleSort('edit')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                    role="menuitem"
                                >
                                    Edit
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
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-all duration-300"
                                onClick={handleEdit}
                            >
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="flex justify-center mt-4">
                <Link to="/insert-goods">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition-all duration-300">
                        Add Product
                    </button>
                </Link>
            </footer>
        </div>
    );
};

export default GoodsOutput;
