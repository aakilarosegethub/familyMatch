// import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import axios from "axios";
import { getAuthToken } from "../../../utils/authToken";
import { useNavigate } from 'react-router-dom';


const LikesSection = () => {

    const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const fetchLikes = async () => {
        const token = getAuthToken();
        setLoading(true); // Set loading state to true before fetching data

        try {
            const response = await axios.get(
                'https://familymatch.aakilarose.com/api/likes',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // console.log('API Response:', response.data.data);
            setLikes(response.data.data); // Update state with the fetched likes
            return response.data; // Optional: if you want to use the data in state
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
        }
        finally {
            setLoading(false); // Set loading state to false after fetching data
        };
    };

    useEffect(() => {
        fetchLikes();
    }, []);


    return (
        <>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-xl font-semibold text-pink-600 mb-6">People Who Liked You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {likes.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-md transition"
                        >
                            <div className="flex items-center space-x-3">
                                <img
                                    src={user.profile_pic}
                                    alt={user.full_name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="text-sm">
                                    <div className="font-semibold text-gray-800">{user.full_name}</div>
                                    <div className="text-gray-500 text-xs">{user.country}</div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="p-2 rounded-full text-pink-600 hover:bg-pink-50 transition"
                                    title="Message"
                                >
                                    <FaEnvelope size={14} />
                                </button>
                                <button
                                    className="p-2 rounded-full text-pink-600 hover:bg-pink-50 transition"
                                    title="View Profile"
                                    onClick={() => navigate(`/publicview/${user.user_id}`)}
                                >
                                    <FaUser size={14} />
                                </button>

                                {/* <button
                                    className="p-2 rounded-full text-pink-600 hover:bg-pink-50 transition"
                                    title="View Profile"
                                >
                                    <FaUser size={14} />
                                </button> */}
                    

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <p className="loader"></p>
                </div>) : null}


        </>

    );
};

export default LikesSection;
