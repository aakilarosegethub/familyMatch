import React from 'react';

const users = [
    {
        name: 'Kristen',
        age: 40,
        country: 'USA',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        online: true
    },
    {
        name: 'Amy',
        age: 39,
        country: 'USA',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        online: false
    },
    {
        name: 'Dana',
        age: 35,
        country: 'USA',
        image: 'https://randomuser.me/api/portraits/women/20.jpg',
        online: true
    },
    {
        name: 'Sarah',
        age: 42,
        country: 'Canada',
        image: 'https://randomuser.me/api/portraits/women/32.jpg',
        online: true
    },
    {
        name: 'Emma',
        age: 38,
        country: 'UK',
        image: 'https://randomuser.me/api/portraits/women/55.jpg',
        online: false
    }
];

const MoreLikeThem = () => {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-2xl">💕</span>
                    More like them
                </h2>
                <p className="text-purple-100 text-sm mt-1">Discover similar profiles</p>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                    {users.map((user, index) => (
                        <div 
                            key={index} 
                            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                        >
                            <div className="relative">
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                />
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                    user.online ? 'bg-green-400' : 'bg-gray-400'
                                }`}></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 truncate">
                                    {user.name}, {user.age}
                                </p>
                                <p className="text-gray-500 text-sm truncate flex items-center gap-1">
                                    <span className="text-xs">📍</span>
                                    {user.country}
                                </p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm hover:shadow-lg transition-shadow duration-300">
                                    →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        View All Matches
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MoreLikeThem;
