import React, { useState } from 'react';

const Input = ({ label, onChange, value, error }) => {
    const [isInputFocused, setIsInputFocused] = useState(value !== '');

    return (
        <div className = "flex justify-center min-w-full items-center mt-3">
            <div className="input-container relative w-3/5">
                <input
                    type= {label == 'password' ? 'password' : 'text'}
                    placeholder=" "
                    name={label}
                    className={`w-full px-4 py-2 border-2 border-gray-300 relative outline-none bg-gray-100 rounded-lg shadow-md text-lg font-bold ${error === '' || !error ? 'text-green-500' : 'text-red-500'} indent-2 ${
                        isInputFocused ? (error === '' || !error ? 'border-green-500' : 'border-red-500') : 'border-gray-300'
                    }`}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={(e) => setIsInputFocused(e.target.value.trim() !== '')}
                    onChange={onChange}
                    value = {value}
                />
                <label
                    className={`absolute left-2 transition-all duration-300 bg-gray-100 text-lg font-bold  ${
                        isInputFocused
                            ? `-top-2.5 text-sm ${error === '' || !error ? 'text-green-500' : 'text-red-500'} z-20 pr-2 pl-2`
                            : 'pr-2 pl-2 top-2.5 text-gray-400 z-10'
                    }`}

                >
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                </label>
            </div>
        </div>
    );
};

export default Input;