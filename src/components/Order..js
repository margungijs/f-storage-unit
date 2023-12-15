import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [editOrderId, setEditOrderId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [validationError, setValidationError] = useState('');

    // Define static status values
    const staticStatusValues = ['Processing', 'Shipped', 'Delivered'];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost/storage/orderoutput.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const restartAPI = async () => {
        try {
            // Send a request to restart the API
            const response = await fetch('http://localhost/storage/restartapi.php', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log('API restarted successfully');
        } catch (error) {
            console.error('Error restarting API:', error);
        }
    };

    const handleEdit = (orderId) => {
        setEditOrderId(orderId);
        setNewStatus(''); // Clear any previous status
        setValidationError('');
    };

    const handleUpdateStatus = async () => {
        // Check if the selected status is empty or not in the allowed values
        if (!newStatus || !staticStatusValues.includes(newStatus)) {
            const errorMessage = !newStatus ? 'Status is required' : 'Invalid status selected';
            setValidationError(errorMessage);
            return { success: false, error: errorMessage };
        }

        try {
            // Send a request to update the status
            const response = await fetch(`http://localhost/storage/editorder.php`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: editOrderId, newStatus: newStatus }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // If the status is set to 'Delivered', remove the order from the state
            if (newStatus === 'Delivered') {
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== editOrderId));
            } else {
                // Update the order in the state with the new status
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === editOrderId ? { ...order, statuss: newStatus } : order
                    )
                );
            }

            // Restart the API
            await restartAPI();

            // Close the edit popup
            setEditOrderId(null);
            setValidationError('');

            return { success: true };
        } catch (error) {
            console.error('Error updating status:', error);
            return { success: false, error: 'Error updating status' };
        }
    };

    const handleDelete = async (orderId) => {
        try {
            // Send a request to delete the order
            const response = await fetch(`http://localhost/storage/deleteorder.php?id=${orderId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Remove the deleted order from the state
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div className="container mx-auto mt-12 shadow-lg" style={{ overflowY: 'hidden' }}>
            <h1 className="text-3xl font-bold mb-4">Orders</h1>
            <div className="overflow-y-auto max-h-[600px] rounded-lg shadow-md bg-gray-100 p-4">
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} className="bg-white p-4 my-2 rounded-md shadow-md">
                            <p className="text-lg font-semibold">Product: {order.product}</p>
                            <p>Company Name: {order.order_company_name}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Status: {order.statuss}</p>
                            <button
                                onClick={() => handleEdit(order.id)}
                                className="bg-green-500 text-white px-4 py-2 mt-2 mr-2 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(order.id)}
                                className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                            {editOrderId === order.id && (
                                <div className="mt-4">
                                    <select
                                        value={newStatus}
                                        onChange={(e) => {
                                            setNewStatus(e.target.value);
                                            setValidationError('');
                                        }}
                                        className={`border rounded-md p-2 mr-2 ${
                                            validationError ? 'border-red-500' : ''
                                        }`}
                                    >
                                        <option value="">Select Status</option>
                                        {staticStatusValues.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={handleUpdateStatus}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                                    >
                                        Update Status
                                    </button>
                                    {validationError && (
                                        <p className="text-red-500 mt-2">{validationError}</p>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Orders;
