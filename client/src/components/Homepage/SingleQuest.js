import { recoleta } from '@/app/layout';
import React, { useState } from 'react';

const SingleQuest = ({ modalData, onClose, authToken }) => {
    console.log(modalData._id);
    const [enrolled, setEnrolled] = useState(false)
    const [code, setCode] = useState('')

    const handleReserve = async () => {
        const enrollEndpoint = `https://voyage-hacks-backend.onrender.com/api/challenges/enroll/${modalData._id}`;

        try {
            const response = await fetch(enrollEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
            });

            if (response.ok) {
                setEnrolled(true)
                const jsonResponse = await response.json();

                console.log(jsonResponse)
                setCode(jsonResponse.pin)
                // Optionally, you can handle success, close the modal, or show a success message
            } else {
                console.error('Reservation failed');
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error during reservation:', error);
        }
    };

    return (
        <div className='modal bg-white p-4 w-[50%]'>
            <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-outlined/24/multiply--v1.png"
                alt="multiply--v1"
                className='cursor-pointer'
                onClick={onClose}
            />
            <div className='flex flex-col items-center gap-6 w-full'>
                <h1 className={`${recoleta.className} text-[32px] text-center`}>{modalData.name}</h1>
                <img
                    src={modalData.image}
                    alt={modalData.name}
                    className='rounded-lg w-[400px]'
                />
                <h1 className='text-[24px] font-bold'>{modalData.location.address}</h1>
                <div className='flex flex-row items-center w-full justify-between'>
                    <p className='flex flex-row items-center gap-1'>
                        {modalData.points} <img src="/assets/points.png" alt="Points" width={16} />
                    </p>
                    <p>{modalData.price} Rs/per person</p>
                </div>
                <div>
                    <p>{modalData.description}</p>
                </div>
                {!enrolled ?
                    <button
                        className='bg-red-500 py-1 px-6 text-white rounded-lg'
                        onClick={handleReserve}
                    >
                        Reserve
                    </button> :

                    <p>Your code is: {code}</p>
                }
            </div>
        </div>
    );
};

export default SingleQuest;
