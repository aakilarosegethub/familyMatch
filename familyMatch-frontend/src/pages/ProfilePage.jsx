import React from 'react';
import ProfileHeader from '../components/ProfilePage/ProfileHeader';
import ProfileHeroSection from '../components/ProfilePage/profileHeroSection';
import LeftMenu from '../components/ProfilePage/LeftMenu';
import ProfileSettings from '../components/ProfilePage/ProfileSettings';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../../utils/authToken';


function ProfilePage() {
    // const token = localStorage.getItem('authToken');
    const token = getAuthToken();
    if (!token) {
        return <Navigate to="/login" replace />;
    }
  return (
    <div className='min-h-screen bg-[#F2F5F6]'>
        <ProfileHeader/>
        <ProfileHeroSection/>
        <div className=' m-2'>
              <LeftMenu />
              {/* <ProfileSettings/> */}

        </div>
    </div>
  )
}

export default ProfilePage;