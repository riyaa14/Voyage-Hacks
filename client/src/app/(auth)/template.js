import React from 'react'

const Template = ({ children }) => {
    return (
        <div className='bg-[#e9f2ff] grid grid-cols-2 items-center relative'>
            {children}
            <img src="/assets/authImg.jpg" alt="Authentication Image" className='absolute -right-36' />
        </div>
    )
}

export default Template
