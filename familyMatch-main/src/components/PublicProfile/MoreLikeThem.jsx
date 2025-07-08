import React from 'react';

const users = [
    {
        name: 'Kristen',
        age: 40,
        country: 'USA',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        name: 'Amy',
        age: 39,
        country: 'USA',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
        name: 'Dana',
        age: 35,
        country: 'USA',
        image: 'https://randomuser.me/api/portraits/women/20.jpg',
    },
];

const MoreLikeThem = () => {
    return (
        <div className="md:w-80 bg-white rounded-xl p-4 shadow-md mt-2 max-h-70">
            <h2 className="text-lg font-semibold mb-4">More like them</h2>
            <div className="space-y-4">
                {users.map((user, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <img
                            src={user.image}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold">
                                {user.name}, {user.age}
                            </p>
                            <p className="text-gray-500 text-sm">{user.country}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoreLikeThem;
