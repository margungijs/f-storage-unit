// Header.js
import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-green-500 text-white p-5">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-bold">Balodītis</h1>

                <div className="flex space-x-4">
                    <button className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-300"><Link to = "/goodsinfo">Products</Link></button>
                    <button className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-300">Ongoing shipments</button>
                    <button className="bg-white text-green-500 px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-300">Change Password</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
