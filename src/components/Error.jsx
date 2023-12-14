import React from 'react';

const Error = ({ error }) => {
    return (
        <p className = "mb-5 text-red-500 text-lg font-bold text-left w-3/5 indent-4 mt-2">
            {error}
        </p>
    );
};

export default Error;