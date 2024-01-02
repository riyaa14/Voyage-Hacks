"use client";

import { recoleta } from '@/app/layout';
import React, { useEffect, useState } from 'react';

const LoginPage = () => {
    const [userType, setUserType] = useState('travelAgent');
    const [user, setUser] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("LOGIN CLICKED")

        // Determine the API endpoint based on the selected user type
        const apiEndpoint = userType === 'travelAgent'
            ? 'https://voyage-hacks-backend.onrender.com/api/user/login'
            : 'https://voyage-hacks-backend.onrender.com/api/business/login';

        try {
            // Make the POST request to the respective API endpoint
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Handle the response (you can add more error handling as needed)
            if (response.ok) {
                // Successful login
                const jsonResponse = await response.json();

                console.log(jsonResponse)

                // Determine the redirect path based on the user type
                const redirectPath = userType === 'travelAgent' ? '/' : '/business-profile';

                if (userType === 'travelAgent') {
                    localStorage.setItem("activeUser", "Agent")
                } else {
                    localStorage.setItem("activeUser", "Business")
                }

                const tokenKey = userType === 'travelAgent' ? 'agentToken' : 'businessToken';

                // Store the token in local storage
                localStorage.setItem(tokenKey, jsonResponse.token);

                // Redirect the user
                window.location.href = redirectPath;
            } else {
                // Handle error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center z-[999]">
            <div className='glass-card py-5 px-3 w-[70%] flex flex-col items-center gap-10 bg-white'>
                <div className='flex flex-col items-center'>
                    <h1 className={`${recoleta.className} text-[40px]`}>Log Into Your Account</h1>
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
                    <button type="submit" className='bg-[#e9f2ff] rounded-lg py-3 px-10 mt-4'>
                        Log In
                    </button>
                    <p>Don&apos;t have an account? <a href="/signup" className='cursor-pointer text-[#8fbefe]'>Signup</a></p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
