import { recoleta } from '@/app/layout'
import React, { useEffect, useState } from 'react'
import SingleQuest from './SingleQuest'

const Quests = ({ data, loading, authToken }) => {
    const [user, setUser] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        setUser(localStorage.getItem("activeUser"));
    }, []);

    const handleAttemptClick = (item) => {
        console.log(item);
        setModalData(item);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const questsList = Array.isArray(data) ? data : [];

    return (
        <>
            {(user === "Agent") ?
                (loading ? (
                    // Loading indicator
                    <div className='flex justify-center my-20'>
                        <p className=''>Loading...</p>
                    </div>
                ) : (
                    // Quests list
                    <>
                        {questsList.length > 0 ? (
                            <div className='grid grid-cols-4 gap-5 w-[95%] 2xl:w-[80%] mx-auto mt-6 mb-10'>
                                {questsList.map((item) => (
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
                                            <button
                                                className='text-white bg-red-500 px-4 py-1 rounded-md mt-2'
                                                onClick={() => handleAttemptClick(item)}
                                            >
                                                Attempt This!
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // No challenges message
                            <div className='flex text-center justify-center my-20'>
                                <h1 className={`${recoleta.className} text-[32px]`}>
                                    No challenges at the moment.
                                </h1>
                            </div>
                        )}
                    </>
                )) :
                // Not an agent message
                <div className='flex justify-center my-20'>
                    <h1 className={`${recoleta.className} text-[32px]`}>
                        Please login as a Travel Agent to see the contents!
                    </h1>
                </div>
            }
            {
                showModal &&
                <div className='overlay'>
                    <SingleQuest modalData={modalData} onClose={handleClose} authToken={authToken} />
                </div>
            }
        </>
    );
};

export default Quests;
