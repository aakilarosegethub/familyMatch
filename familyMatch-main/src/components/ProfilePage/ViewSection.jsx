import React from "react";
import { FaMapMarkerAlt, FaClock, FaEnvelope, FaUser } from "react-icons/fa";

const mockViewers = [
    {
        id: 1,
        name: "Jane Doe",
        photo: "https://randomuser.me/api/portraits/women/1.jpg",
        location: "New York, USA",
        viewedAt: "2025-06-01T10:15:00Z",
        profileUrl: "#profile-jane",
        messageUrl: "#message-jane",
    },
    {
        id: 2,
        name: "John Smith",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
        location: "Los Angeles, USA",
        viewedAt: "2025-06-01T11:45:00Z",
        profileUrl: "#profile-john",
        messageUrl: "#message-john",
    },
    {
        id: 3,
        name: "Alice Johnson",
        photo: "https://randomuser.me/api/portraits/women/3.jpg",
        location: "London, UK",
        viewedAt: "2025-05-31T14:30:00Z",
        profileUrl: "#profile-alice",
        messageUrl: "#message-alice",
    },
    {
        id: 4,
        name: "Bob Brown",
        photo: "https://randomuser.me/api/portraits/men/4.jpg",
        location: "Toronto, Canada",
        viewedAt: "2025-05-31T09:20:00Z",
        profileUrl: "#profile-bob",
        messageUrl: "#message-bob",
    },
    {
        id: 5,
        name: "Emma Wilson",
        photo: "https://randomuser.me/api/portraits/women/5.jpg",
        location: "Sydney, Australia",
        viewedAt: "2025-05-30T16:45:00Z",
        profileUrl: "#profile-emma",
        messageUrl: "#message-emma",
    },
];

const groupByDate = (viewers) => {
    return viewers.reduce((groups, viewer) => {
        const date = new Date(viewer.viewedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        if (!groups[date]) groups[date] = [];
        groups[date].push(viewer);
        return groups;
    }, {});
};

const ViewSection = () => {
    const groupedViewers = groupByDate(
        mockViewers.sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt))
    );

    return (
        <div className=" max-w-6xl mx-auto  p-8 bg-white rounded-2xl shadow-lg">
            <h1 className="text-3xl font-semibold mb-12 text-gray-900 tracking-wide">
                Who Viewed Your Profile
            </h1>

            {mockViewers.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-20">
                    No views yet. Check back later!
                </p>
            ) : (
                <div className="relative">
                    {/* Vertical dashed line */}
                    <div className="absolute left-16 top-10 bottom-10 border-l border-dashed border-gray-300"></div>

                    <div className="space-y-12">
                        {Object.entries(groupedViewers).map(([date, viewers], idx, arr) => (
                            <div key={date} className="flex items-start space-x-10">
                                {/* Date and timeline dot */}
                                <div className="flex flex-col items-center w-28 select-none">
                                    <span className="text-gray-600 font-medium text-sm mb-1">
                                        {date}
                                    </span>
                                    <div className="w-4 h-4 rounded-full border-2 border-pink-400 bg-white shadow-sm"></div>
                                    {/* Connecting line between dots */}
                                    {idx !== arr.length - 1 && (
                                        <div className="flex-1 w-px bg-gray-300 mt-1"></div>
                                    )}
                                </div>

                                {/* Viewer cards */}
                                <div className="flex flex-col space-y-5 flex-1">
                                    {viewers.map(
                                        ({
                                            id,
                                            name,
                                            photo,
                                            location,
                                            viewedAt,
                                            profileUrl,
                                            messageUrl,
                                        }) => (
                                            <div
                                                key={id}
                                                className="flex items-center justify-between space-x-5 bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                                title={`Viewed at ${new Date(viewedAt).toLocaleString()}`}
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <img
                                                        src={photo}
                                                        alt={name}
                                                        className="w-14 h-14 rounded-full border-2 border-pink-300 object-cover"
                                                    />
                                                    <div className="flex flex-col">
                                                        <h3 className="font-semibold text-gray-800 text-lg">
                                                            {name}
                                                        </h3>
                                                        <div className="flex items-center space-x-2 text-gray-500 text-sm mt-0.5">
                                                            <FaMapMarkerAlt className="text-pink-400" />
                                                            <span>{location}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2 text-gray-400 text-xs mt-0.5 font-mono">
                                                            <FaClock />
                                                            <span>
                                                                {new Date(viewedAt).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Small icon buttons with pink styling */}
                                                <div className="flex space-x-3">
                                                    <a
                                                        href={messageUrl}
                                                        className="relative group p-2 rounded-full hover:bg-pink-100 text-pink-600 transition"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label="Message"
                                                    >
                                                        <FaEnvelope size={18} />
                                                        <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none select-none">
                                                            Message
                                                        </span>
                                                    </a>
                                                    <a
                                                        href={profileUrl}
                                                        className="relative group p-2 rounded-full hover:bg-pink-100 text-pink-600 transition"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label="View Profile"
                                                    >
                                                        <FaUser size={18} />
                                                        <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none select-none">
                                                            View Profile
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewSection;
