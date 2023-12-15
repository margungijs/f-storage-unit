import React, {useEffect, useState} from 'react';
import UserEdit from "./UserEdit";
import UserDelete from "./UserDelete";
import SuccessMessage from "./SuccessMessage";
import {Link} from "react-router-dom";

const UserOutput = () => {
    const [users, setUsers] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isDelete, setIsDelete] = useState(false);
    const [deletedUser, setDeletedUser] = useState(null);
    const [editSuccess, setEditSuccess] = useState(false);

    const handleDeleteClick = (userID) => {
        setIsDelete(true);
        setDeletedUser(userID);
    }

    const handleDeleteClose = () => {
        setIsDelete(false);
        setDeletedUser(null);
    }

    const handleEditClick = (user) => {
        setIsEdit(true);
        setEditingUser(user);
    };

    const handleCloseEdit = () => {
        setIsEdit(false);
        setEditingUser(null);
        setEditSuccess(true);
    };

    const closeSuccess = () => {
        setEditSuccess(false);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost/api/Users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [deletedUser, editingUser]);


    const mapRoleToString = (role) => {
        switch (role) {
            case 0:
                return 'Admin';
            case 1:
                return 'Storage Worker';
            case 2:
                return 'Storage Organizer';
            default:
                return "Unknown";
        }
    };

    console.log(editingUser);

    return (
        <div className = "bg-gray-200">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 transition-all duration-300 m-5">
                <Link to = "/UserAdd">Add User</Link>
            </button>
            {isEdit && <UserEdit user={editingUser} close={handleCloseEdit} />}
            {isDelete && <UserDelete user={deletedUser} close={handleDeleteClose} />}
            {editSuccess && <SuccessMessage close = {closeSuccess}/>}
            <div className="min-w-full min-h-screen bg-gray-200 font-custom p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="border-2 border-gray-400 bg-gray-100 rounded-lg text-center p-2 shadow-lg flex flex-col">
                            <h1 className="text-6xl m-5 overflow-hidden">{user.name}</h1>
                            <h2 className="text-4xl m-5 text-blue-500">{mapRoleToString(user.role)}</h2>
                            <div className="flex flex-row justify-evenly mt-auto">
                                <svg
                                    key={`edit-${String(user.id)}`}
                                    onClick={() => handleEditClick(user)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-16 h-16 text-green-500 cursor-pointer hover:text-green-300 transition-all duration-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                <svg
                                    key={`delete-${String(user.id)}`}
                                    onClick = {() => handleDeleteClick(user)}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-green-500 cursor-pointer hover:text-green-300 transition-all duration-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserOutput;