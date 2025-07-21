import React, { useEffect, useState } from 'react';
import {
    FaUser,
    FaInfoCircle,
    FaChartBar,
    FaCamera,
    FaEye,
    FaHeart,
    FaStar,
    FaSmile,
    FaEnvelope,
} from 'react-icons/fa';

import ProfileSettings from './ProfileSettings';
import AboutMeProfileSection from './AboutMeProfileSection';
import MatchDataSection from './MatchDataSection';
import PhotoSection from './PhotoSection';
import ViewSection from './ViewSection';
import LikesSection from './LikesSection';
import FavoritesSection from './FavoritesSection';
import WinksSection from './WinksSection';
import MessagesSection from './MessagesSection';
import axios from 'axios';


function LeftMenu() {
    const [selectedId, setSelectedId] = useState(1); // default to 'Personal'
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Optional: for loading state
    const [error, setError] = useState(null);

    const options = [
        { id: 1, label: "Personal", icon: <FaUser /> },
        { id: 2, label: "About me", icon: <FaInfoCircle /> },
        { id: 3, label: "Match Data", icon: <FaChartBar /> },
        { id: 4, label: "Photo", icon: <FaCamera /> },
        // { id: 5, label: "Views", icon: <FaEye /> },
        { id: 6, label: "Likes", icon: <FaHeart /> },
        { id: 7, label: "Favorites", icon: <FaStar /> },
        { id: 8, label: "Winks", icon: <FaSmile /> },
        { id: 9, label: "Messages", icon: <FaEnvelope /> },
    ];

    // Render component based on selectedId
    const renderSelectedComponent = () => {
        switch (selectedId) {
            case 1:
                return <ProfileSettings data={data} />;
            case 2:
                return <AboutMeProfileSection />;
            // Add other components here as needed:
            case 3: return <MatchDataSection />;
            case 4: return <PhotoSection />;
            case 5: return <ViewSection />;
            case 6: return <LikesSection />;
            case 7: return <FavoritesSection />;
            case 8: return <WinksSection />;
            case 9: return <MessagesSection />;
            // ...
            default:
                return <div>Select an option from the menu</div>;
        }
    };

    useEffect(() => {
        axios.get('https://familymatch.aakilarose.com/api/search', {

            headers: {
                'X-API-KEY': '123456'
            },
            // body: params // axios will convert this object to query string automatically
        })
            .then(response => {
                console.log('Data:', response.data);
                setData(response.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // fetchData();
    }, []);




    return (
        <div className='w-full flex '>
            {/* Left Sidebar */}
            <div className='md:w-full  me-3 max-w-full md:max-w-[25vw] px-4 md:ms-14 bg-white flex flex-col justify-start rounded-xl overflow-x-hidden box-border'>
                {options.map((option) => {
                    const isActive = selectedId === option.id;
                    return (
                        <div key={option.id} className=''>
                            <button
                                onClick={() => setSelectedId(option.id)}
                                className={`rounded-lg w-full my-2 py-3 px-4 gap-3 flex items-center transition-colors duration-200
        ${isActive ? 'bg-[#FEE7F5] text-pink-600' : 'bg-[#F2F5F6] text-black'}`}
                            >
                                <div className={`text-lg ${isActive ? 'text-pink-600' : 'text-gray-500'}`}>
                                    {option.icon}
                                </div>
                                <p className='hidden md:block text-sm md:text-base'>{option.label}</p>
                            </button>

                        </div>
                    );
                })}
            </div>

            {/* Right Content Panel */}
            <div className='w-full md:pe-14'>
                {renderSelectedComponent()}
            </div>
        </div>
    );
}

export default LeftMenu;
