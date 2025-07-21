import React from 'react';
import { Link } from 'react-router-dom';

function ProfileHeader() {
    return (
        <div className='bg-[#ad46ff] py-5'>
            <div className='flex justify-between px-8'>
                {/* Logo navigates to home */}
                <Link to="/" className='font-bold text-2xl text-white'>
                    FamilyMatch
                </Link>

                <div className='flex items-center gap-4 text-[#F2F2F2]'>
                    {/* Home button navigates to home */}
                    <Link to="/" className='hover:underline'>Home</Link>
                    <p className='cursor-pointer'>Messages</p>
                    <p className='cursor-pointer'>Settings</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
