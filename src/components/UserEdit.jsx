import React, {useEffect, useState} from 'react';
import Input from "./Input";
import Error from "./Error";
import Select from "./Select";
import inputValidation from "../functions/inputValidation.ts";
import {handleInputChange} from "../functions/handleInputChange.ts";


const UserEdit = ({ user, close }) => {
    const [edit, setEdit] = useState({
        name: user.name,
        role: user.role,
    });

    const original = {
        name: user.name,
        role: user.role,
    }

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        if (Object.values(touched).some((fieldTouched) => fieldTouched)) {
            inputValidation(edit, errors, setErrors, touched);
        }
    }, [edit, touched]);

    const onInputChange = (e) => handleInputChange(e, setTouched, setEdit);

    useEffect(() => {
        // Add/remove 'overflow-hidden' class to body when the overlay is open/closed
        document.body.classList.toggle('overflow-hidden', true);

        // Cleanup: remove the class when the component unmounts
        return () => {
            document.body.classList.toggle('overflow-hidden', false);
        };
    }, []);

    const areObjectsEqual = (obj1, obj2) => {
        const keys1 = Object.keys(obj1);

        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    };

    const editUser = async () => {
        if(Object.keys(touched).length > 1 || !areObjectsEqual(edit, original)){
            if(inputValidation(edit, errors, setErrors, touched)){
                try {
                    const response = await fetch(`http://localhost/api/UserUpdate/${user.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json', // or other content type as needed
                        },
                        body: JSON.stringify(edit),
                    });

                    const data = await response.json();
                    if(data.message){
                        close();
                    }
                    console.log('PUT response:', data);
                } catch (error) {
                    console.error('Error sending PUT request:', error.message);
                }
            }
        }else{
            console.log('asd');
        }
    }

    return (
        <div className = "fixed w-full">
            <div className = "min-w-full min-h-screen flex font-custom relative">
                <div className = "min-w-full min-h-full flex justify-center items-center">
                    <div className = "flex xl:w-2/5 lg:w-8/12 md:w-4/6 w-11/12 border-2 border-gray-700 rounded-lg bg-gray-100 shadow-lg flex-col items-center z-50 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-16 md:h-16 w-10 h-10 absolute left-2 top-2 hover:text-green-500 cursor-pointer transition-all duration-300" onClick={close}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className = "text-center text-7xl m-8">Edit user</h1>
                        <Input label = "name" onChange = {onInputChange} value = {edit.name} error = {errors.name}/>
                        <Error error = {errors.name}/>
                        <Select label = "role" onChange = {onInputChange} value = {edit.role} error = {errors.role}/>
                        <Error error = {errors.role}/>
                        <button
                            className = "w-3/5 mb-5 mt-3 rounded-lg h-10 text-xl text-white bg-green-600 font-bold hover:bg-green-500 transition-all hover:border-green-600"
                            onClick = {editUser}
                        >
                            Edit
                        </button>
                    </div>
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-70"></div>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;