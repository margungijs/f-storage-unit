import React, {useState, useEffect} from 'react';
import Input from "./Input";
import Select from "./Select";
import {handleInputChange} from "../functions/handleInputChange.ts";
import inputValidation from "../functions/inputValidation.ts";
import Error from "./Error";
import {useNavigate} from "react-router-dom";

const UserAdd = () => {

    const [user, setUser] = useState({
        name: '',
        password: '',
        role: '',
    });


    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        if (Object.values(touched).some((fieldTouched) => fieldTouched)) {
            inputValidation(user, errors, setErrors, touched);
        }
    }, [user, touched]);

    const onInputChange = (e) => handleInputChange(e, setTouched, setUser);

    const makeUser = async () => {
        if(Object.keys(touched).length === 3){
            if(inputValidation(user, errors, setErrors, touched)){
                try {
                    const response = await fetch(`http://localhost/api/UserAdd`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // or other content type as needed
                        },
                        body: JSON.stringify(user),
                    });

                    const data = await response.json();
                    if(data.error){
                        const updatedErrorState = {};
                        data.messages.forEach((error) => {
                            updatedErrorState[error.field] = error.message;
                        });
                        setErrors(updatedErrorState);
                    }
                    console.log('POST response:', data);
                } catch (error) {
                    console.error('Error sending POST request:', error.message);
                }
            }
        }
    }
    const navigate = useNavigate();
    const backOut = () => {
        navigate('/UserOutput');
    }



    return (
        <div>
            <div className = "min-w-full min-h-screen flex bg-gray-200 font-custom">
                <div className = "min-w-full min-h-full flex justify-center items-center">
                    <div className = " relative flex xl:w-2/5 lg:w-8/12 md:w-4/6 w-11/12 border-2 border-gray-400 rounded-lg bg-gray-100 shadow-lg flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-16 md:h-16 w-10 h-10 absolute left-2 top-2 hover:text-green-500 cursor-pointer transition-all duration-300"
                             onClick ={backOut}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className = "text-center text-7xl m-8">Add user</h1>
                        <Input label = "name" onChange = {onInputChange} value = {user.name} error = {errors.name}/>
                        <Error error = {errors.name} />
                        <Select label = "role" onChange = {onInputChange}  value = {user.role} error = {errors.role}/>
                        <Error error = {errors.role} />
                        <Input label = "password" onChange = {onInputChange} value = {user.password} error = {errors.password}/>
                        <Error error = {errors.password} />
                        <button
                            className = "w-3/5 mb-5 mt-3 rounded-lg h-10 text-xl text-white bg-green-600 font-bold hover:bg-green-500 transition-all hover:border-green-600"
                            onClick={makeUser}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAdd;