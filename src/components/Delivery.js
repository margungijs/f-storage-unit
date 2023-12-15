import React, { useEffect, useState } from 'react';

const Delivery = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost/storage/orderdelivery.php');
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

    const handleCheckboxChange = (orderId) => {
        setSelectedOrders((prevSelected) => {
            if (prevSelected.includes(orderId)) {
                // Remove orderId from selectedOrders
                return prevSelected.filter((id) => id !== orderId);
            } else {
                // Add orderId to selectedOrders
                return [...prevSelected, orderId];
            }
        });
    };

    const handleConfirmButtonClick = async () => {
        setIsConfirming(true);

        try {
            // Send a POST request to the PHP script to update the status for selected orders
            const response = await fetch('http://localhost/storage/orderaccepted.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderIds: selectedOrders }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Handle the response if needed
            const result = await response.json();
            console.log('Order status updated:', result);

            // Update the local state to remove the selected orders
            setOrders((prevOrders) =>
                prevOrders.filter((order) => !selectedOrders.includes(order.id))
            );

            // Clear selected orders after a successful update
            setSelectedOrders([]);
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <div className="container mx-auto mt-12 shadow-lg" style={{ overflowY: 'hidden' }}>
            <h1 className="text-3xl font-bold mb-4">Orders</h1>
            <div className="overflow-y-auto max-h-[600px] rounded-lg shadow-md bg-gray-100 p-4">
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} className="bg-white p-4 my-2 rounded-md shadow-md flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold">Product: {order.product}</p>
                                <p>Company Name: {order.order_company_name}</p>
                                <p>Quantity: {order.quantity}</p>
                                <p>Status: {order.statuss}</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={selectedOrders.includes(order.id)}
                                onChange={() => handleCheckboxChange(order.id)}
                                className="ml-2 h-6 w-6 text-green-500 border-green-500 focus:ring-green-500"
                            />
                        </li>
                    ))}
                </ul>
                {selectedOrders.length > 0 && (
                    <div className="mt-4">
                        <div className="flex items-center">
                            <div className="text-green-500">Selected orders: {selectedOrders.length}</div>
                            <button
                                onClick={handleConfirmButtonClick}
                                disabled={isConfirming}
                                className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md"
                            >
                                {isConfirming ? 'Confirming...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Delivery;
