import { recoleta } from '@/app/layout'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [user, setUser] = useState("")
    const [authToken, setAuthToken] = useState('')
    const [points, setPoints] = useState('')

    const isLogin = user === "Agent" ? true : false;

    useEffect(() => {
        setUser(localStorage.getItem("activeUser"))
        setAuthToken(localStorage.getItem("agentToken"))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("agentToken")
        localStorage.removeItem("activeUser")
        window.location.href = '/login';
    }

    const getUserDetails = async () => {
        if (authToken) {
            try {
                const response = await fetch("https://voyage-hacks-backend.onrender.com/api/user/", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                });

                if (response.ok) {
                    // Successful login
                    const jsonResponse = await response.json();

                    setPoints(jsonResponse.points)
                } else {
                    // Handle error
                    console.error('Fetching Details Failed');
                }
            } catch (error) {
                console.error('Error during API call:', error);
            }
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [authToken])

    return (
        <div className='flex flex-row items-center w-full justify-between py-6 px-10'>
            <h1 className={`${recoleta.className} text-[34px] font-extrabold`}>TravelRun</h1>
            <div className='flex flex-row items-center gap-4 text-[18px]'>
                <a href="/" className='hover:underline'>Home</a>
                <a href="/" className='hover:underline'>Explore</a>
                <a href="/user-profile" className='hover:underline'>Profile</a>
            </div>
            <div className='flex flex-row items-center gap-4'>
                <div className='flex flex-row items-center gap-1 text-[14px] border px-2 py-1 rounded-full'>
                    <img src="/assets/points.png" alt="Points" width={18} />
                    {points}
                </div>
                <button className='rounded-lg py-1 px-6 shadow' onClick={handleLogout}>
                    {isLogin ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>
    )
}

export default Navbar
