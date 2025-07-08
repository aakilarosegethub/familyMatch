import React, { useEffect, useState } from 'react';
import DpSection from '../components/PublicProfile/DpSection';
import AboutThemSection from '../components/PublicProfile/AboutThemSection';
import InterestSection from '../components/PublicProfile/InterestSection';
import TextSection from '../components/PublicProfile/TextSection';
import MoreLikeThem from '../components/PublicProfile/MoreLikeThem';
import ProfileHeader from '../components/ProfilePage/ProfileHeader';
import { getAuthToken } from '../../utils/authToken';
import { API_BASE_URL } from '../config';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PublicProfilePage() {
  const { id } = useParams(); // id will be undefined if not in URL
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    console.log("this is id", id);
    const fetchProfile = async () => {
      try {
        const token = getAuthToken(); // get token once

        if (id) {
          // User came from search/listing page – fetch public profile by ID with token
          const response = await axios.get(`${API_BASE_URL}/user-profile/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setProfileData(response.data.data);
          console.log("Public profile data loaded by ID:", response.data);
        } else {
          // User came from propage – fetch own profile using token
          const response = await axios.get(`${API_BASE_URL}/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          setProfileData(response.data.data);
          console.log("Own profile data loaded:", response.data.data);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    fetchProfile();
  }, [id]);


  if (!profileData) return <div className='h-[100vh] flex justify-center items-center'>
    <div className='loader'></div>
  </div>;

  return (
    <>
      <ProfileHeader />
      <div className='md:flex justify-center'>
        <div>
          <DpSection data={profileData} />
          <AboutThemSection data={profileData} />
          <InterestSection data={profileData} />
          <TextSection />
        </div>
        <MoreLikeThem />
      </div>
    </>
  );
}

export default PublicProfilePage;
