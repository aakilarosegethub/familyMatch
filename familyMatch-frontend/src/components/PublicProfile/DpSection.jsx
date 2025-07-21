import React from 'react';
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline';

function DpSection({data}) {

  return (
    <div className='p-6'>
      <div className="w-full flex flex-col lg:flex-row-reverse justify-between items-start gap-6">
        {/* Right Side: 3 Dots */}
        <div className="self-end lg:self-start">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        
        {/* Left Side: Image + Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full lg:w-auto">
          {/* Profile Image with gradient border */}
          <div className="relative w-40 h-40 sm:w-36 sm:h-36">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-2xl p-1">
              <div className="bg-white rounded-2xl p-1 w-full h-full">
                <img
                  src={data?.img || '/images/profilePicture.jpg'}
                  alt="profile pic"
                  className="w-full h-full rounded-xl object-cover shadow-lg"
                  onError={(e) => {
                    e.target.src = '/images/profilePicture.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="font-bold text-4xl sm:text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {data?.full_name || 'Profile Name'}
            </h1>
            <p className="text-lg text-gray-600 mb-4 flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
              {data?.age || '25'}-{data?.city || 'City'}, {data?.state || 'State'}, {data?.country || 'Country'}
            </p>

            <div className="flex gap-3 mt-4 justify-center sm:justify-start">
              <button className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <HeartIcon className="h-7 w-7 text-white group-hover:animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <ChatBubbleBottomCenterIcon className="h-7 w-7 text-white group-hover:animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-8">
        <h2 className='font-bold text-2xl mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
          Core Values
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {data?.values?.map((item) => (
            <div
              key={item.id}
              className='group relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer'
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <img 
                  className='h-12 w-12 mb-3 object-contain' 
                  src={item.img} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <label className="text-sm font-medium text-gray-700 text-center block">
                  {item.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        
        {(!data?.values || data.values.length === 0) && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">💎</div>
            <p className="text-gray-500">No core values available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DpSection;
