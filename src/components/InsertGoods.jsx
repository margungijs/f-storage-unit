import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const GoodsInsert = () => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({
        productName: '',
        productCategory: '',
        productDescription: '',
        price: '',
    });

    const handleInsert = () => {
        // Simple front-end validations
        const errors = {};

        if (!productName.trim()) {
            errors.productName = 'Product Name is required.';
        }

        if (!productCategory.trim()) {
            errors.productCategory = 'Category is required.';
        }

        if (!productDescription.trim()) {
            errors.productDescription = 'Product Description is required.';
        }

        if (!price.trim()) {
            errors.price = 'Price is required.';
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            errors.price = 'Please enter a valid positive number for the price.';
        }

        // If there are errors, update the state and stop the submission
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        navigate('/goodsinfo');

        // If no errors, prepare the data to be sent to Laravel
        const data = {
            name: productName,
            category: productCategory,
            description: productDescription,
            price: parseFloat(price), // Assuming price is a number
        };

        // Make a POST request to the Laravel endpoint
        fetch('http://localhost/api/productAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                // Handle success, e.g., show a success message
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error, e.g., show an error message
            });
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
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500 ${
                                formErrors.productName ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        {formErrors.productName && (
                            <p className="text-red-500 mt-2">{formErrors.productName}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-600 text-sm font-medium mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500 ${
                                formErrors.productCategory ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => setProductCategory(e.target.value)}
                        />
                        {formErrors.productCategory && (
                            <p className="text-red-500 mt-2">{formErrors.productCategory}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productDescription" className="block text-gray-600 text-sm font-medium mb-2">
                            Product Description
                        </label>
                        <textarea
                            id="productDescription"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500 ${
                                formErrors.productDescription ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => setProductDescription(e.target.value)}
                        ></textarea>
                        {formErrors.productDescription && (
                            <p className="text-red-500 mt-2">{formErrors.productDescription}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-600 text-sm font-medium mb-2">
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-green-500 ${
                                formErrors.price ? 'border-red-500' : ''
                            }`}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {formErrors.price && <p className="text-red-500 mt-2">{formErrors.price}</p>}
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
