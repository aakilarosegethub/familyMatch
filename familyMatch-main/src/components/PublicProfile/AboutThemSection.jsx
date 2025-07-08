import React from 'react';

function AboutThemSection({data}) {
    const aboutThem = [
        {
            id: 1,
            icon: '👤',
            description: 'Self-growth'
        },
        {
            id: 2,
            icon: '🌍',
            description: 'Global connections'
        },
        {
            id: 3,
            icon: '💡',
            description: 'Problem solver'
        },
        {
            id: 4,
            icon: '🎯',
            description: 'Goal-oriented'
        },
        {
            id: 5,
            icon: '🎨',
            description: 'Storytelling'
        },
        {
            id: 6,
            icon: '🚀',
            description: 'Go-getter'
        },
        {
            id: 7,
            icon: '📚',
            description: 'Lifelong learner'
        },
        {
            id: 8,
            icon: '🤝',
            description: 'Team player'
        },
        {
            id: 9,
            icon: '🧠',
            description: 'Critical thinker'
        },
        {
            id: 10,
            icon: '💬',
            description: 'Clear communicator'
        }
    ];


    return (
        <div className="my-3 px-4 max-w-3xl mx-auto">
            <div className="border-y border-gray-300 py-10 mb-10">
                <p className='font-semibold text-gray-700'>{data?.bio}</p>
            </div>

            <h2 className="text-2xl font-bold mb-4 ">About Them</h2>

            <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {aboutThem.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start gap-2"
                    >
                        <div className="text-lg">{item.icon}</div>
                        <p className="text-gray-800">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AboutThemSection;
