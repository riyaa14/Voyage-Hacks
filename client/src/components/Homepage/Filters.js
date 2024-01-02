import React from 'react'

const Filters = ({ onFilterClick }) => {
    const filterData = [
        {
            id: 0,
            title: "All",
            iconUrl: "/assets/all.png"
        },
        {
            id: 1,
            title: "Adventure",
            iconUrl: "/assets/adventure.png"
        },
        {
            id: 2,
            title: "Nightlife",
            iconUrl: "/assets/nightlife.png"
        },
        {
            id: 3,
            title: "Outdoors",
            iconUrl: "/assets/outdoor.png"
        },
        {
            id: 4,
            title: "Cultural",
            iconUrl: "/assets/cultural.png"
        },
        {
            id: 5,
            title: "Foodie",
            iconUrl: "/assets/foodie.png"
        },
        {
            id: 6,
            title: "Family",
            iconUrl: "/assets/family.png"
        },
        {
            id: 7,
            title: "Relaxation",
            iconUrl: "/assets/relaxation.png"
        },
    ]

    const handleFilterClick = (title) => {
        onFilterClick(title);
    };

    return (
        <div className='flex justify-center mt-10'>
            <ul className='flex flex-row items-center gap-10'>
                {filterData.map((item) => (
                    <li
                        className='flex flex-col items-center cursor-pointer'
                        key={item.id}
                        onClick={() => handleFilterClick(item.title)}
                    >
                        <img src={item.iconUrl} alt={item.title} width={28} /> {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Filters
