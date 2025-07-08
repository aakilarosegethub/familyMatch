import React, { useState, useEffect } from 'react'
import SearchFilter from '../components/SearchFilter'
import ProfileCard from '../components/ProfileCard'
// import Header from '../components/header';
import ProfileHeader from '../components/ProfilePage/ProfileHeader';
import  { useRef } from 'react';

function SearchListingPage() {
    // const [loadingSearch, setLoadingSearch] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const searchFilterRef = useRef();

    const [profileData, setProfileData] = useState([]);

    const clearProfileData = () => {
        setProfileData([]); // Clear the profileData state
        setIsSearched(false); // Reset search status
    };

    const handleDataFromChild = (data) => {
        console.log("Data received from child:", data);
        setProfileData((prevData) => [...prevData, ...data.data]);
        console.log("handle child view length", profileData.length)
        setIsSearched(true); // Mark that a search has been performed
    };

    const loadMoreResults = () => {
        if (searchFilterRef.current?.handleLoadMore) {
            searchFilterRef.current.handleLoadMore(profileData);
        }
    };

// For loading new data on auto scroll but its only working on desktop

    // useEffect(() => {
    //     const handleScroll = () => {
    //         // Check if user reached the bottom of the page
    //         if (
    //             window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
    //         ) {
    //             // Call your function here
    //             console.log('Reached bottom!');
    //             loadMoreResults();
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    
  return (
      <div className="min-h-screen  bg-cover bg-repeat-y bg-center " >
          <div className='border sticky top-0 z-1 bg-white'>
              <ProfileHeader />
          </div>
          <div className='lg:flex justify-center items-start mx-auto p-6 space-y-4 lg:space-y-0 lg:space-x-4 '>
              <SearchFilter 
            //   onLoadingChange={handleLoadingChange}
              clearProfileData={clearProfileData} 
              ref={searchFilterRef} 
              searchResultData={handleDataFromChild} 
              />

              {isSearched && profileData.length > 0 && (
                  <div className='w-full'>
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl gap-4 p-6">
                          {profileData.map((profile) => (
                              <ProfileCard key={profile?.id} profile={profile} />
                          ))}
                      </div>
                      <div className="flex justify-center">
                          <button
                              className="border px-10 py-3 rounded-4xl hover:bg-[#AE2456] hover:text-white"
                              onClick={loadMoreResults}
                          >
                              Load More
                          </button>
                      </div>
                  </div>
              )}

              {isSearched && profileData.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center text-gray-500 w-full h-[70vh] space-y-4 p-6 rounded-lg">
                      <img
                          src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                          alt="No results"
                          className="w-20 h-20 opacity-60"
                      />
                      <p className="text-lg font-semibold">Oops! Nothing to see here...</p>
                      <p className="text-sm text-gray-400">Try tweaking your filters — magic might happen! ✨</p>
                  </div>
              )}
          </div>
    </div>
  )
}

export default SearchListingPage