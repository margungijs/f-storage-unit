import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/solid'; // Import the PencilIcon from Heroicons
import axios from 'axios';

const GoodsOutput = () => {
    const [goods, setGoods] = useState([]);
    const [selectedGood, setSelectedGood] = useState(null);
    const [sortedGoods, setSortedGoods] = useState([]);
    const [selectedSort, setSelectedSort] = useState('none');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
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

        fetchData();
    }, []);

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
                sorted = [...goods].sort((a, b) => b.price - a.price);
                break;
            case 'leastExpensive':
                sorted = [...goods].sort((a, b) => a.price - b.price);
                break;
            case 'aToZ':
                sorted = [...goods].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'zToA':
                sorted = [...goods].sort((a, b) => b.name.localeCompare(a.name));
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
                <h2 className="text-2xl font-bold">Goods List</h2>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedGoods.map((good) => (
                    <div key={good.id} className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{good.name}</h3>
                        {good.price !== null && !isNaN(good.price) ? (
                            <p className="text-green-500 font-bold">${Number(good.price).toFixed(2)}</p>
                        ) : (
                            <p className="text-red-500">Invalid price</p>
                        )}
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
                                <PencilIcon className="h-5 w-5" />
                            </button>
                        )}
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
                                <PencilIcon className="h-5 w-5" />
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
