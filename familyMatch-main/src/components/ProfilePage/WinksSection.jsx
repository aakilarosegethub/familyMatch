import React, { useEffect } from "react";
import { FaRegSmileWink } from "react-icons/fa";
import axios from "axios";
import { getAuthToken } from "../../../utils/authToken";
// import { getAuthToken } from "../../../utils/authToken";

const Winks = () => {
    const winks = [
        { name: "Alice", photo: "https://randomuser.me/api/portraits/women/65.jpg" },
        { name: "Mark", photo: "https://randomuser.me/api/portraits/men/72.jpg" },
        { name: "Clara", photo: "https://randomuser.me/api/portraits/women/29.jpg" },
        { name: "James", photo: "https://randomuser.me/api/portraits/men/88.jpg" },
        { name: "Sophia", photo: "https://randomuser.me/api/portraits/women/12.jpg" },
        { name: "Olivia", photo: "https://randomuser.me/api/portraits/women/45.jpg" },
        { name: "Liam", photo: "https://randomuser.me/api/portraits/men/56.jpg" },
        { name: "Emma", photo: "https://randomuser.me/api/portraits/women/71.jpg" },
        { name: "Noah", photo: "https://randomuser.me/api/portraits/men/90.jpg" },
        { name: "Ava", photo: "https://randomuser.me/api/portraits/women/33.jpg" },
    ];


    const winksList = async () => {
        // const token = 'eyJ1c2VyX2lkIjoiOTEiLCJ0aW1lc3RhbXAiOjE3NTA5MzI5NTN9';
        const token = getAuthToken();

        try {
            const response = await axios.get(
                'https://familymatch.aakilarose.com/api/profile/winks',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('API Response:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
        }
    };

    useEffect( ()=>{
        winksList()
    },[]
    )


    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
            <style>{`
                /* Custom Scrollbar */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #fce7f3;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #AE2456;
                    border-radius: 10px;
                    border: 2px solid #fce7f3;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #931C48;
                }
            `}</style>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-h-[60vh] sm:max-h-[530px] flex flex-col">
                <h2 className="text-2xl md:text-3xl font-bold text-[#AE2456] px-6 pt-6">Winks Received</h2>

                {/* Scrollable section with custom scrollbar */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 mt-4 custom-scrollbar">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {winks.map((user, idx) => (
                            <div
                                key={idx}
                                className="group bg-pink-50 hover:bg-pink-100 p-4 rounded-2xl shadow-sm transition hover:shadow-md flex flex-col items-center text-center"
                            >
                                <div className="relative w-24 h-24 md:w-28 md:h-28 mb-3">
                                    <img
                                        src={user.photo}
                                        alt={user.name}
                                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-[#AE2456] text-white p-1 rounded-full border-2 border-white">
                                        <FaRegSmileWink size={14} />
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                                <button
                                    className="mt-2 px-4 py-1 text-xs font-medium rounded-full bg-[#AE2456]/10 text-[#AE2456] hover:bg-[#AE2456]/20 transition"
                                    aria-label={`Send Wink to ${user.name}`}
                                >
                                    Wink Back
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Winks;
