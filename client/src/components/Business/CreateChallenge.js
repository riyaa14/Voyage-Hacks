import { recoleta } from '@/app/layout';
import React, { useState } from 'react';

const CreateChallenge = ({ onClose, authToken }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        contact: '',
        image: 'https://shorturl.at/ijrvN',
        timings: '',
        category: ["Family", "Adventure"], // Use an array to store multiple selected categories
        address: '',
        longitude: "28.7041° N",
        latitude: "77.1025° E",
        points: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // If the input is a multi-select, handle accordingly
        if (type === 'select-multiple') {
            const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
            setFormData((prevData) => ({
                ...prevData,
                [name]: selectedOptions,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const createChallengeEndpoint = 'https://voyage-hacks-backend.onrender.com/api/challenges/createChallenge';

        try {
            const response = await fetch(createChallengeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Challenge created successfully');
                // Optionally, you can handle success, close the modal, or show a success message
                onClose();
            } else {
                console.error('Error creating challenge');
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };

    return (
        <div className='modal p-6 bg-white'>
            <h2 className={`${recoleta.className} text-[30px]`}>Create Challenge</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
                <div className='flex flex-row items-center gap-4'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} required className='border border-black p-1' />

                    <label htmlFor='description'>Description:</label>
                    <textarea id='description' name='description' value={formData.description} onChange={handleChange} required className='border border-black p-1' />
                </div>

                <div className='flex flex-row items-center gap-4'>
                    <label htmlFor='contact'>Contact:</label>
                    <input type='text' id='contact' name='contact' value={formData.contact} onChange={handleChange} required className='border border-black p-1' />

                    <label htmlFor='image'>Image URL:</label>
                    <input type='text' id='image' name='image' value={formData.image} onChange={handleChange} className='border border-black p-1' />
                </div>

                <div className='flex flex-row items-center gap-4'>
                    <label htmlFor='timings'>Timings:</label>
                    <input type='text' id='timings' name='timings' value={formData.timings} onChange={handleChange} required className='border border-black p-1' />

                    <label htmlFor='category'>Category:</label>
                    <input type='text' id='category' name='category' value={formData.category} onChange={handleChange} className='border border-black p-1' />
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <label htmlFor='address'>Address:</label>
                    <input type='text' id='address' name='address' value={formData.address} onChange={handleChange} required className='border border-black p-1 w-full' />
                </div>

                <div className='flex flex-row items-center gap-4'>
                    <label htmlFor='points'>Points:</label>
                    <input type='number' id='points' name='points' value={formData.points} onChange={handleChange} required className='border border-black p-1' />

                    <label htmlFor='price'>Price:</label>
                    <input type='number' id='price' name='price' value={formData.price} onChange={handleChange} required className='border border-black p-1' />
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CreateChallenge;
