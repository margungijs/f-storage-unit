// GoodsOutput.js
import React, { useState } from 'react';
import {Link} from "react-router-dom";

const dummyGoods = [
    { id: 1, name: 'Bleach', description: 'chemical product that is used industrially or domestically to remove colour (whitening) from fabric or fiber (in a process called bleaching) or to disinfect after cleaning', price: 20.99 },
    { id: 2, name: 'Jew', description: 'a member of the people and cultural community whose traditional religion is Judaism and who trace their origins through the ancient Hebrew people of Israel to Abraham.', price: 15.49 },
    { id: 3, name: 'Iphone 15', description: 'Cool phone', price: 1200.99 },
    { id: 4, name: 'Iphone 15', description: '', price: 1200.99 },
];

const GoodsOutput = () => {
    const [selectedGood, setSelectedGood] = useState(null);
    const [sortedGoods, setSortedGoods] = useState(dummyGoods);
    const [selectedSort, setSelectedSort] = useState('none');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMoreInfo = (good) => {
        setSelectedGood(good);
    };

    const handleClose = () => {
        setSelectedGood(null);
    };

    const handleSort = (criteria) => {
        let sorted;

        switch (criteria) {
            case 'mostExpensive':
                sorted = [...dummyGoods].sort((a, b) => b.price - a.price);
                break;
            case 'leastExpensive':
                sorted = [...dummyGoods].sort((a, b) => a.price - b.price);
                break;
            case 'aToZ':
                sorted = [...dummyGoods].sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'zToA':
                sorted = [...dummyGoods].sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                sorted = dummyGoods;
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
                            <path
                                fillRule="evenodd"
                                d="M10 15l-5-5 5-5 5 5-5 5z"
                            />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedGoods.map((good) => (
                    <div key={good.id} className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{good.name}</h3>
                        <p className="text-green-500 font-bold">${good.price.toFixed(2)}</p>
                        <button
                            className="text-blue-500 hover:underline focus:outline-none"
                            onClick={() => handleMoreInfo(good)}
                        >
                            More Info
                        </button>
                    </div>
                ))}
            </div>

            {selectedGood && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-md shadow-md max-w-md p-8">
                        <h2 className="text-2xl font-bold mb-4">{selectedGood.name}</h2>
                        <p className="text-green-500 font-bold mb-4">${selectedGood.price.toFixed(2)}</p>
                        <p className="text-gray-600 mb-4">{selectedGood.description}</p>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition-all duration-300"
                            onClick={handleClose}
                        >
                            Close
                        </button>
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
