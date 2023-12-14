import React from 'react';


const UserDelete = ({ user, close }) => {
    const handleDeleteRequest = async () => {
        try {
            const response = await fetch(`http://localhost/api/UserDelete/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // or other content type as needed
                },
            });

            const data = await response.json();
            console.log('DELETE response:', data);
            close();
        } catch (error) {
            console.error('Error sending DELETE request:', error.message);
        }
    };

    return (
        <div className = "fixed w-full">
            <div className = "min-w-full min-h-screen flex font-custom relative">
                <div className = "min-w-full min-h-full flex justify-center items-center">
                    <div className = "flex xl:w-2/5 lg:w-5/12 md:w-3/6 w-10/12 border-2 border-gray-700 rounded-lg bg-gray-100 shadow-lg flex-col items-center z-50 relative justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-16 md:h-16 w-10 h-10 absolute left-2 top-2 hover:text-green-500 cursor-pointer transition-all duration-300" onClick={close}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className = "text-center text-4xl m-8">Are you sure you wish to delete {user.name}</h1>
                        <button
                            className = "w-3/5 mb-5 mt-3 rounded-lg h-10 text-xl text-white bg-red-600 font-bold hover:bg-red-500 transition-all hover:border-green-600"
                            onClick = {handleDeleteRequest}
                        >
                            Delete
                        </button>
                    </div>
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-70"></div>
                </div>
            </div>
        </div>
    );
};

export default UserDelete;