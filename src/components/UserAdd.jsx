import React, {useState, useEffect} from 'react';
import Input from "./Input";
import Select from "./Select";
import {handleInputChange} from "../functions/handleInputChange.ts";
import inputValidation from "../functions/inputValidation.ts";
import Error from "./Error";

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



    return (
        <div>
            <div className = "min-w-full min-h-screen flex bg-gray-200 font-custom">
                <div className = "min-w-full min-h-full flex justify-center items-center">
                    <div className = "flex xl:w-2/5 lg:w-8/12 md:w-4/6 w-11/12 border-2 border-gray-400 rounded-lg bg-gray-100 shadow-lg flex-col items-center">
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