import React from 'react';
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline';

function DpSection({data}) {

  return (
    <div className='w-full max-w-3xl mx-auto rounded-lg p-4'>
      <div className="w-full md:flex-row-reverse flex flex-wrap md:flex-nowrap justify-between items-start gap-4">

        {/* Right Side: 3 Dots */}
        <div className="ml-auto sm:ml-0">
          <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" />
        </div>
        {/* Left Side: Image + Info */}
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start w-full md:w-auto">
          <img
            src={data?.img}
            alt="profile pic"
            className="w-36 h-36 sm:w-32 sm:h-32 rounded-lg object-cover"
          />

          <div className="text-center sm:text-left">
            <h1 className="font-bold text-3xl">{data?.full_name}</h1>
            <p className="text-sm text-gray-600">{data?.age}-{data?.city},{data?.state},{data?.country}</p>

            <div className="flex gap-2 mt-3 justify-center sm:justify-start">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-red-500" />
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ChatBubbleBottomCenterIcon className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* Core Values */}
      <div className="mt-6">
        <p className='font-bold text-xl mb-4'>Core Values</p>
        <div className='flex flex-wrap gap-4 justify-start'>
          {data?.values?.map((item) => (
              <div
                key={item.id}
                className='flex flex-col items-center mx-auto justify-center border border-gray-300 w-32 h-32 rounded-lg flex-shrink-0'
              >
                <img className='h-14 w-14 mb-2' src={item.img} alt="" />
                <label className="text-sm">{item.name}</label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DpSection;
