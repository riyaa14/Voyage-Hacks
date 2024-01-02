import React from 'react';

const Preferences = () => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-row items-center gap-2 bg-gray-100 px-8 py-4 rounded-lg shadow-md w-max'>
                <div className='flex flex-col items-start'>
                    <label htmlFor='location' className='text-gray-600 block mb-2'>
                        Location
                    </label>
                    <input
                        type='text'
                        id='location'
                        placeholder='Enter location'
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                    />
                </div>

                <div className='flex flex-col items-start'>
                    <label htmlFor='startDate' className='text-gray-600 block mb-2'>
                        Start Date
                    </label>
                    <input
                        type='date'
                        id='startDate'
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                    />
                </div>

                <div className='flex flex-col items-start'>
                    <label htmlFor='endDate' className='text-gray-600 block mb-2'>
                        End Date
                    </label>
                    <input
                        type='date'
                        id='endDate'
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                    />
                </div>

                <div className='flex flex-col items-start'>
                    <label htmlFor='numberOfPeople' className='text-gray-600 block mb-2'>
                        Number of People
                    </label>
                    <input
                        type='number'
                        id='numberOfPeople'
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                        onWheel={(e) => e.target.blur}
                    />
                </div>

                <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex flex-row items-center gap-1'>
                    <img src="/assets/search.png" alt="Search" width={20} />
                    Search
                </button>
            </div>
        </div>
    );
}

export default Preferences;
