import React from "react";
import { FaStar, FaEnvelope, FaUser } from "react-icons/fa";
// import pic  from '../../../public/images/Picture.jpg'
import pic from '/images/profilePicture.jpg'
import pic2 from '/images/profilePicture.jpg'
import pic3 from '/images/profilePicture.jpg'



const FavoritesSection = () => {
    const favorites = [
        {
            name: "Sophie Turner",
            photo: pic,
            location: "Berlin, Germany",
        },
        {
            name: "Daniel Wu",
            photo: pic2,
            location: "Toronto, Canada",
        },
        {
            name: "Lila Kapoor",
            photo: pic3,
            location: "Mumbai, India",
        },
        {
            name: "Ethan Zhang",
            photo: pic2,
            location: "Beijing, China",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 shadow-2xl rounded-2xl">
            <h2 className="text-3xl font-bold text-pink-600 mb-10 text-center">
                Your Favorites
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {favorites.map((user, idx) => (
                    <div
                        key={idx}
                        className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-[1.03] transition-transform duration-300"
                    >
                        {/* Star icon top-right */}
                        <div className="absolute top-4 right-4 bg-pink-600 text-white p-2 rounded-full shadow-lg">
                            <FaStar />
                        </div>

                        {/* Photo cover */}
                        <img
                            src={user.photo}
                            alt={user.name}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                            decoding="async"
                        />

                        {/* Info */}
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {user.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">{user.location}</p>

                            {/* Action buttons */}
                            <div className="flex gap-3 justify-end">
                                <button
                                    aria-label="Message"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
                                >
                                    <FaEnvelope />
                                </button>
                                <button
                                    aria-label="View Profile"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition"
                                >
                                    <FaUser />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritesSection;
