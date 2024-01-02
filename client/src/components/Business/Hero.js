import { recoleta } from '@/app/layout';
import React, { useEffect, useState } from 'react';
import CreateChallenge from './CreateChallenge';

const Hero = () => {
    const [businessData, setBusinessData] = useState({});
    const [loading, setLoading] = useState(false);
    const [authToken, setAuthToken] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [challengeList, setChallengeList] = useState([])
    const [challengeData, setChallengeData] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setAuthToken(localStorage.getItem("businessToken"));
    }, []);

    const getBusinessData = async () => {
        setLoading(true);

        const endpoint = "https://voyage-hacks-backend.onrender.com/api/business/";

        if (authToken) {
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                });

                if (response.ok) {
                    const jsonResponse = await response.json();
                    setBusinessData(jsonResponse);
                } else {
                    console.error('Fetching Business Data Failed');
                }
            } catch (error) {
                console.error('Error during API call:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const verifyAgentCode = async () => {
        const verifyEndpoint = "https://voyage-hacks-backend.onrender.com/api/requests/verify";

        try {
            const response = await fetch(verifyEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    code: verificationCode
                })
            });

            if (response.ok) {
                console.log('Verification successful');
                // Handle success, e.g., show a success message to the user
            } else {
                console.error('Verification failed');
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error during verification:', error);
        }
    };

    const getPastChallenges = async () => {
        const endpoint = 'https://voyage-hacks-backend.onrender.com/api/challenges/businessChallenges'

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Challenges Lists", jsonResponse)
                setChallengeList(jsonResponse);
            } else {
                console.error('error fetching lists');
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error during fetching:', error);
        }
    }

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        getBusinessData();
        getPastChallenges();
    }, [authToken]);

    useEffect(() => {
        setChallengeData(challengeList);
    }, [challengeList]);

    return (
        <div>
            {loading ? (
                <div className='flex justify-center my-20'>
                    <p className='text-[40px]'>Loading ...</p>
                </div>
            ) : (
                <>
                    <div className='w-[90%] mx-auto grid grid-cols-2 items-center'>
                        <img src="/assets/business-image.avif" alt="Business Store" width={300} className='rounded-full' />
                        <div className='flex flex-col items-center gap-2'>
                            <h1 className={`${recoleta.className} text-[40px]`}>{businessData.name}</h1>
                            <p className='text-[20px]'>{businessData.address}</p>
                            <p>{businessData.description}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <label htmlFor="code" className={`${recoleta.className} text-[22px]`}>
                            Enter the agent code to verify
                        </label>
                        <input
                            type="number"
                            name="code"
                            id="code"
                            placeholder='Enter the code'
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            onWheel={(e) => e.target.blur()}
                            className='p-2 border border-black rounded-[12px]'
                        />
                        <button
                            className='px-6 py-2 rounded-lg bg-red-500 text-white'
                            onClick={verifyAgentCode}
                        >
                            Submit
                        </button>
                    </div>
                    <div className='flex flex-col w-[90%] mx-auto mt-10'>
                        <h1 className={`${recoleta.className} text-[40px] text-center`}>Your Challenges</h1>
                        <button
                            className='flex justify-end border border-black ml-auto px-6 py-1 rounded-lg shadow-md'
                            onClick={() => setShowModal(true)}
                        >
                            Create a new challenge
                        </button>
                        {challengeData.length > 0 ?
                            <div className='grid grid-cols-4 gap-5 w-[95%] 2xl:w-[80%] mx-auto mt-6 mb-10'>
                                {challengeData.map((item) => (
                                    <div className='glass-card mb-10' key={item.id}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className='rounded-t-[25px] w-full h-[180px] object-cover'
                                        />
                                        <div className='flex flex-col p-3 items-center'>
                                            <div className='flex flex-row items-center w-full justify-between'>
                                                <h1 className={`${recoleta.className} text-[20px] uppercase`}>{item.name}</h1>
                                                <p>{item.location.address}</p>
                                            </div>
                                            <p className='flex flex-row items-center gap-1 mt-2'>
                                                Points - <b> {item.points} </b>
                                                <img src="/assets/points.png" alt="Points" width={16} />
                                            </p>
                                            <p className='flex flex-row items-center gap-1'>
                                                Price - <b> {item.price} </b> Rs/per person
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div> : (
                                <div className='flex justify-center my-20'>
                                    <p className={`${recoleta.className} text-[28px]`}>
                                        No current challenges. Create a new one now!
                                    </p>
                                </div>
                            )}
                    </div>
                    {showModal &&
                        <div className='overlay'>
                            <CreateChallenge authToken={authToken} onClose={handleClose} />
                        </div>
                    }
                </>
            )}
        </div>
    );
};

export default Hero;
