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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("this is id", id);
    const fetchProfile = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex justify-center items-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200 mx-auto mb-6"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-purple-600 mx-auto"></div>
          </div>
          <p className="text-purple-700 font-medium text-lg loading-dots">Loading profile</p>
          <p className="text-purple-500 text-sm mt-2">Please wait while we fetch the details</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl mb-6 animate-float">😔</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 gradient-text">Profile Not Found</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            The profile you're looking for doesn't exist or is no longer available.
          </p>
          <button className="btn-gradient text-white px-6 py-3 rounded-xl font-medium">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-100 to-indigo-100 rounded-full opacity-10 blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Floating hearts */}
        <div className="absolute top-20 left-10 text-2xl opacity-20 animate-float" style={{animationDelay: '0.5s'}}>💕</div>
        <div className="absolute top-40 right-20 text-xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>✨</div>
        <div className="absolute bottom-20 left-20 text-xl opacity-20 animate-float" style={{animationDelay: '2.5s'}}>💝</div>
        <div className="absolute bottom-40 right-10 text-2xl opacity-20 animate-float" style={{animationDelay: '3s'}}>💖</div>
      </div>

      <div className="relative z-10">
        <ProfileHeader />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:flex gap-8">
              {/* Main Content */}
              <div className="flex-1 space-y-6">
                <div className="profile-card rounded-2xl shadow-xl border border-white/20 overflow-hidden hover-lift">
                  <DpSection data={profileData} />
                </div>
                
                <div className="profile-card rounded-2xl shadow-xl border border-white/20 overflow-hidden hover-lift">
                  <AboutThemSection data={profileData} />
                </div>
                
                <div className="profile-card rounded-2xl shadow-xl border border-white/20 overflow-hidden hover-lift">
                  <InterestSection data={profileData} />
                </div>
                
                <div className="profile-card rounded-2xl shadow-xl border border-white/20 overflow-hidden hover-lift">
                  <TextSection />
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-80 mt-8 lg:mt-0">
                <div className="sticky top-8">
                  <MoreLikeThem />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfilePage;
