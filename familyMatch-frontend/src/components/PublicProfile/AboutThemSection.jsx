import React from 'react';

function AboutThemSection({data}) {
    const aboutThem = [
        {
            id: 1,
            icon: '👤',
            description: 'Self-growth',
            color: 'from-blue-400 to-indigo-500'
        },
        {
            id: 2,
            icon: '🌍',
            description: 'Global connections',
            color: 'from-green-400 to-emerald-500'
        },
        {
            id: 3,
            icon: '💡',
            description: 'Problem solver',
            color: 'from-yellow-400 to-orange-500'
        },
        {
            id: 4,
            icon: '🎯',
            description: 'Goal-oriented',
            color: 'from-red-400 to-pink-500'
        },
        {
            id: 5,
            icon: '🎨',
            description: 'Storytelling',
            color: 'from-purple-400 to-violet-500'
        },
        {
            id: 6,
            icon: '🚀',
            description: 'Go-getter',
            color: 'from-indigo-400 to-purple-500'
        },
        {
            id: 7,
            icon: '📚',
            description: 'Lifelong learner',
            color: 'from-teal-400 to-cyan-500'
        },
        {
            id: 8,
            icon: '🤝',
            description: 'Team player',
            color: 'from-emerald-400 to-teal-500'
        },
        {
            id: 9,
            icon: '🧠',
            description: 'Critical thinker',
            color: 'from-violet-400 to-purple-500'
        },
        {
            id: 10,
            icon: '💬',
            description: 'Clear communicator',
            color: 'from-cyan-400 to-blue-500'
        }
    ];

    return (
        <div className="p-6">
            {/* Bio Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold text-purple-700 mb-3 flex items-center gap-2">
                        <span className="text-2xl">💭</span>
                        About Me
                    </h3>
                    <p className='text-gray-700 leading-relaxed text-lg'>
                        {data?.bio || "This person hasn't shared their bio yet. They're probably crafting something amazing!"}
                    </p>
                </div>
            </div>

            {/* About Them Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                    <span className="text-3xl">✨</span>
                    About Them
                </h2>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {aboutThem.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                            <div className="relative z-10 flex items-center gap-3">
                                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <p className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors duration-300">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AboutThemSection;
