// GoodsEdit.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GoodsEdit = () => {
    const { id } = useParams();
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        // Fetch existing product details when the component mounts
        fetch(`http://localhost/api/getProducts/${id}`)
            .then(response => response.json())
            .then(data => {
                setProductName(data.name);
                setProductDescription(data.description);
                setPrice(data.price.toString()); // Assuming price is a number
            })
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    const navigate = useNavigate();

    const handleUpdate = () => {
        // Prepare the data to be sent to Laravel
        const data = {
            name: productName,
            description: productDescription,
            price: parseFloat(price), // Assuming price is a number
        };

        // Make a PUT request to the Laravel endpoint
        fetch(`http://localhost/api/getProducts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log('Update successful:', result);
                navigate('/goodsinfo');
                // Handle success, e.g., show a success message or redirect
            })
            .catch(error => {
                console.error('Error updating product:', error);
                // Handle error, e.g., show an error message
            });
    };

    return (
        <div className="flex justify-center h-full pt-32">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500"
                            value={productName}
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
                            value={productDescription}
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
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={handleUpdate}
                    >
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GoodsEdit;
