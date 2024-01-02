import { recoleta } from '@/app/layout'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [user, setUser] = useState("")

    const isLogin = user === "Business" ? true : false;

    useEffect(() => {
        setUser(localStorage.getItem("activeUser"))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("businessToken")
        localStorage.removeItem("activeUser")
        window.location.href = '/login';
    }

    return (
        <div className='flex flex-row items-center w-full justify-between py-6 px-10'>
            <h1 className={`${recoleta.className} text-[34px] font-extrabold`}>TravelRun</h1>
            <div className='flex flex-row items-center gap-4'>
                <button className='rounded-lg py-1 px-6 shadow' onClick={handleLogout}>
                    {isLogin ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>
    )
}

export default Navbar
