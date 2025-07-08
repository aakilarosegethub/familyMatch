import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pic from '/images/onlineMoney2.jpg';
import Button from './Button';
import { API_BASE_URL } from '../config';
import toast from 'react-hot-toast';

function ApiTesting() {



    const apiCall = async () => {
        const token = 'eyJ1c2VyX2lkIjoiOTEiLCJ0aW1lc3RhbXAiOjE3NTA5MzI5NTN9';
        // const profile_id = 91;

        try {
            // Create and populate FormData
            // const formData = new FormData();
            // formData.append('profile_id', profile_id);

            const response = await axios.get(
                'https://familymatch.aakilarose.com/api/profile/winks',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Don't set Content-Type manually — Axios handles it with FormData
                    },
                }
            );

            console.log('API Response:', response.data);
            console.log('Token:', token);
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
        }
    };




    const handleClick=()=>{
        toast.success("You winked at this user! 😉 You can send unlimited winks.");

    }


    return (
        <div>
            <div className="border w-full h-[500px] overflow-hidden">
                <img className="w-full h-full object-cover" src={pic} alt="" />
            </div>

            <Button variant="primary" onClick={apiCall}>
                Hellow
            </Button>


            <Button onClick={handleClick}> wink </Button>

        </div>
    );
}

export default ApiTesting;
