// GoodsInsert.js
import React, { useState } from 'react';

const GoodsInsert = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleInsert = () => {
        // Add your logic to handle inserting goods
        console.log('Inserting goods...', { productName, productDescription, price });
        // You can send this data to a backend API for further processing
    };

    return (
        <div className="flex justify-center h-full pt-32">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Insert Product</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productDescription" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Description
                        </label>
                        <textarea
                            id="productDescription"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                            onChange={(e) => setProductDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-600 text-sm font-medium mb-2">
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={handleInsert}
                    >
                        Add this product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GoodsInsert;
