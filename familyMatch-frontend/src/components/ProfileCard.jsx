import React, { useEffect, useState } from 'react';
import {
    FaMapMarkerAlt, FaHeart, FaBook, FaMusic,
    FaEnvelope, FaPrayingHands, FaSmileWink, FaRing
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../utils/authToken';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import toast from 'react-hot-toast';


const ProfileCard = ({ profile }) => {
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLiked, setIsLiked] = useState(0);
    const [clicked, setClicked] = useState(false);
    // const [isWinked, setIsWinked] = useState(0); // new state for wink

    const handleClick = () => {
        const token = getAuthToken();
        if (token) {
            navigate(`/publicview/${profile.user_id}`);
            console.log("this is profile", profile);
        } else {
            setShowLoginModal(true); // Show login popup instead of navigating
            console.log("User not logged in, showing login modal");
        }
    };

    const likeProfile = async () => {
        const token = getAuthToken();

        if (!token) {
            setShowLoginModal(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('profile_id', profile.id);

            const response = await axios.post(
                `${API_BASE_URL}/like-profile`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('API Response for Like:', response.data.is_like);
            setIsLiked(response.data.is_like);
            window.toaster('success', response.data.is_like === 1 ? "Profile liked! ❤️" : "Profile unliked");
            // toast.success(response.data.is_like === 1 ? "Profile liked! ❤️" : "Profile unliked");
        } catch (error) {
            // console.error('Error liking profile:', error.response?.data || error.message);
            window.toaster('error', "Failed to like profile. Please try again.");
            // toast.error("Failed to like profile. Please try again.");
        }
    };

    // New function for wink functionality
    const winkProfile = async () => {
        const token = getAuthToken();


        if (!token) {
            setShowLoginModal(true);
            return;
        }
        // Trigger animation first
        setClicked(true);

        // Slight delay before running heavy logic to allow animation to start
        requestAnimationFrame(() => {
            setTimeout(() => setClicked(false), 1000); // match animation duration
        });

        try {
            const formData = new FormData();
            formData.append('profile_id', profile.id);

            // Slight delay to avoid blocking render cycle (optional but safer)
            setTimeout(async () => {
                const response = await axios.post(
                    `${API_BASE_URL}/profile/wink_profile`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('API Response for Wink:', response.data.is_wink);
                // toast.success("You winked at this user! 😉 You can send unlimited winks.");
                toast.success(response.data.message)
            }, 20); // Delay API call just enough to let animation start
        } catch (error) {
            console.error('Error sending wink:', error.response?.data || error.message);
        }
    };


    useEffect(() => {
        console.log("ProfileCard mounted with profile:", profile);
        setIsLiked(profile.is_like);   // Initialize isLiked based on profile data
        // setIsWinked(profile.is_wink);   // Initialize isWinked based on profile data (if provided)
    }, [profile]);

    return (
        <>
            <div
                className="max-w-sm w-full h-auto p-2 rounded-3xl backdrop-blur-md bg-[#fcf8ff] border-white/20 shadow-2xl hover:shadow-xl transition flex flex-col justify-between"
                onClick={handleClick}
            >
                {/* Top Section */}
                <div className="flex flex-col items-center text-center">
                    <img
                        src={profile?.profile_image}
                        alt={profile?.full_name || 'Profile Image'}
                        className="w-full h-46 object-cover rounded-3xl border-2 border-white shadow-md mb-4"
                    />
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {profile?.full_name}, {profile?.age} -id {profile.user_id}
                        </h2>
                        <p className="text-[#AE2456] font-medium flex items-center gap-1">
                            <FaMapMarkerAlt /> {profile?.location} New York, USA
                        </p>
                        <p className="text-sm text-gray-600 mt-3 px-2">{profile?.bio}</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="mt-4 text-sm text-gray-700 space-y-2 px-2">
                        <p className="flex items-center gap-2">
                            <FaBook className="text-[#AE2456]" />
                            Education: <span className="font-medium">{profile?.qualification}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <FaMusic className="text-[#AE2456]" />
                            Hobbies: <span className="font-medium">{profile?.hobbies}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <FaPrayingHands className="text-[#AE2456]" />
                            Religion: <span className="font-medium">{profile?.religion}</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <FaRing className="text-[#AE2456]" />
                            Marital Status: <span className="font-medium">{profile?.ms_name}</span>
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-5 flex gap-6 justify-center px-2 items-center">
                        <div className="relative group">
                            <button className="bg-[#9334EB] text-white px-4 py-2 rounded-3xl hover:bg-[#AE2456]/90 text-sm font-medium flex items-center gap-2">
                                <FaEnvelope />
                            </button>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                Send Message
                            </span>
                        </div>

                        <div className="relative group">
                            <button
                                className={`px-4 py-2 rounded-3xl text-sm font-medium flex items-center gap-2 border
                                        ${isLiked === 1
                                        ? 'bg-[#AE2456] text-white border-[#AE2456]'
                                        : 'border-[#AE2456] text-[#AE2456] hover:bg-[#AE2456]/10'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    likeProfile();
                                }}
                            >
                                <FaHeart />
                            </button>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                {isLiked === 1 ? 'Liked ❤️' : 'Like'}
                            </span>
                        </div>

                        <div className="relative group">
                            <button
                                className="flex items-center gap-2 text-[#AE2456] "
                                onClick={(e) => {
                                    e.stopPropagation();
                                    winkProfile(); // keep your API or logic
                                    // Add animation/toast here if needed
                                }}
                            >
                                <FaSmileWink className={`w-7 h-7 ${clicked ? 'animate-bounce' : ''}`} />
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-6 text-white text-4xl font-bold hover:text-red-400 transition"
                        onClick={() => setShowLoginModal(false)}
                    >
                        ×
                    </button>
                    {/* Login Form (centered in full screen) */}
                    <LoginForm />
                </div>
            )}
        </>
    );
};

export default ProfileCard;
