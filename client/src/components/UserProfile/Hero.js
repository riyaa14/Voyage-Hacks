import { recoleta } from '@/app/layout'
import React, { useEffect, useState } from 'react'

const Hero = () => {
    const [authToken, setAuthToken] = useState('')
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setAuthToken(localStorage.getItem("agentToken"))
    }, [])

    const getUserDetails = async () => {
        setLoading(true);

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

                    console.log(jsonResponse)

                    setUserData(jsonResponse);
                } else {
                    // Handle error
                    console.error('Fetching Details Failed');
                }
            } catch (error) {
                console.error('Error during API call:', error);
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [authToken])

    return (
        <div>
            {loading ? (
                <div className='flex justify-center'>
                    <p className='text-[40px]'>Loading ...</p>
                </div>
            ) : (
                <div className='flex flex-col gap-6 items-start w-[90%] mx-auto mb-20'>
                    <div className='grid grid-cols-2 items-center w-full'>
                        <img src={userData.profilePicture} alt={userData.name} width={200} />
                        <div className='flex flex-col items-center gap-2'>
                            <h1 className={`${recoleta.className} text-[40px]`}>{userData.name}</h1>
                            <p>{userData.email}</p>
                        </div>
                    </div>
                    <div className='flex flex-row items-center w-full justify-between'>
                        <p className='text-[24px]'>
                            Your Agent Code: {" "}
                            <b>
                                {userData.agentCode}
                            </b>
                        </p>
                        <button className='px-6 py-2 bg-red-500 text-white rounded-lg'>Redeem your points</button>
                    </div>
                    <div className='w-full flex flex-col mt-6'>
                        <h1 className={`${recoleta.className} text-[44px] text-center`}>Your Attempted Challenges</h1>
                        {userData.completedTasks?.length > 0 ? (
                            <div className='grid grid-cols-3 gap-4 items-center'>
                                {userData.completedTasks.map((item, index) => (
                                    <div key={index} className='border p-4 rounded-lg'>
                                        <h2 className='text-xl font-bold'>{item.challengeName}</h2>
                                        <p>Number of Participants: {item.completedReqs}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                No challenges currently. Attempt some now!
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Hero
