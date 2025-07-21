import React, { useEffect } from 'react';

function InterestSection({data}) {
    return (
        <div className="p-6">
            {/* More Info Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                    <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                        <span className="text-2xl">ℹ️</span>
                        More Information
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                            <span className="text-xl">👤</span>
                            <div>
                                <p className="text-sm text-gray-500">Ethnicity</p>
                                <p className="font-medium text-gray-800">White/Caucasian</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                            <span className="text-xl">💕</span>
                            <div>
                                <p className="text-sm text-gray-500">Looking for</p>
                                <p className="font-medium text-gray-800">Start a Serious Relationship</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interests Section */}
            <div>
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    Interests
                </h2>

                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {data?.interests?.map((item) => (
                        <div
                            key={item.id}
                            className="group relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-3 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10 flex flex-col items-center gap-2">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <img 
                                        className='w-6 h-6 object-contain' 
                                        src={item.image} 
                                        alt={item.title}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <p className="text-sm font-medium text-gray-700 text-center leading-tight">
                                    {item.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {(!data?.interests || data.interests.length === 0) && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🎨</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Interests Yet</h3>
                        <p className="text-gray-500">This person hasn't added their interests yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InterestSection;
