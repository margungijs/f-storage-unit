import React, {useEffect} from 'react';

const SuccessMessage = ({ close }) => {
    useEffect(() => {
        // Set a timeout to call the 'close' prop after 3 seconds
        const timeoutId = setTimeout(() => {
            close();
        }, 3000);

        // Clean up the timeout when the component is unmounted
        return () => {
            clearTimeout(timeoutId);
        };
    }, [close]);

    return (
        <div className = "fixed w-full">
            <div className = "min-w-full min-h-screen flex font-custom relative">
                <div className = "min-w-full min-h-full flex justify-center items-center">
                    <div className = "flex xl:w-2/5 lg:w-5/12 md:w-3/6 w-10/12 border-2 border-gray-700 rounded-lg bg-gray-100 shadow-lg flex-col items-center z-50 relative justify-center">
                        <h1 className = "text-center text-4xl m-8">Edit successful!</h1>
                    </div>
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-70"></div>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;