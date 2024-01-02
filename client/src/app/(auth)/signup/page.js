"use client";

import { recoleta } from '@/app/layout';
import React, { useEffect, useState } from 'react';

const SignupPage = () => {
    const [userType, setUserType] = useState('travelAgent');
    const [user, setUser] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        description: '',
        address: '',
    });

    useEffect(() => {
        setUser(localStorage.getItem("activeUser"))
    }, []);

    if (user === 'Business') {
        window.location.href = '/business-profile';
    }

    if (user === 'Agent') {
        window.location.href = '/';
    }

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Check if the name starts with 'business' to handle businessOwner fields
        if (name.startsWith('business')) {
            setFormData((prevData) => ({
                ...prevData,
                description: value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("submit clicked");
        console.log(formData);

        // Determine the API endpoint based on the selected user type
        const apiEndpoint =
            userType === 'travelAgent'
                ? 'https://voyage-hacks-backend.onrender.com/api/user/signup'
                : 'https://voyage-hacks-backend.onrender.com/api/business/signup';

        try {
            // Create the data object to be sent in the request
            const requestData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                description: formData.description,
                address: formData.address,
            };

            // Make the POST request to the respective API endpoint
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            // Handle the response (you can add more error handling as needed)
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Response", jsonResponse)

                // Determine the token key based on the user type
                const tokenKey = userType === 'travelAgent' ? 'agentToken' : 'businessToken';

                // Store the token in local storage
                localStorage.setItem(tokenKey, jsonResponse.token);

                const redirectPath = '/login';

                // Redirect the user
                window.location.href = redirectPath;

                // Successful signup
                console.log('Signup successful');
            } else {
                // Handle error
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="min-h-screen my-10 flex items-center justify-center z-[999]">
            <div className='glass-card py-5 px-3 w-[70%] flex flex-col items-center gap-10 bg-white'>
                <div className='flex flex-col items-center'>
                    <h1 className={`${recoleta.className} text-[40px]`}>Create Your Account</h1>
                    <select
                        value={userType}
                        onChange={handleUserTypeChange}
                        className={`${recoleta.className} text-[32px] focus:outline-none cursor-pointer`}
                    >
                        <option value="travelAgent" className='text-[16px] font-normal'>For Travel Agents</option>
                        <option value="businessOwner" className='text-[16px] font-normal'>For Business Owners</option>
                    </select>
                </div>
                <form className='flex flex-col items-center gap-4 w-[90%]' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={userType === 'travelAgent' ? 'Enter your name' : 'Enter your business name'}
                        className='rounded-md p-4 shadow-md focus:outline-none w-full'
                        required
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Enter your email address'
                        className='rounded-md p-4 shadow-md focus:outline-none w-full'
                        required
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Enter your password'
                        className='rounded-md p-4 shadow-md focus:outline-none w-full'
                        required
                        onChange={handleInputChange}
                    />
                    {userType === 'businessOwner' && (
                        <>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder='Enter your business address'
                                className='rounded-md p-4 shadow-md focus:outline-none w-full'
                                required
                                onChange={handleInputChange}
                            />
                            <textarea
                                name="description"
                                id="description"
                                placeholder='Enter a description about your business'
                                className='rounded-md p-4 shadow-md focus:outline-none w-full'
                                required
                                onChange={handleInputChange}
                            />
                        </>
                    )}
                    <button type="submit" className='bg-[#e9f2ff] rounded-lg py-3 px-10 mt-4'>
                        Sign Up
                    </button>
                    <p>Already have an account? <a href="/login" className='cursor-pointer text-[#8fbefe]'>Login</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
