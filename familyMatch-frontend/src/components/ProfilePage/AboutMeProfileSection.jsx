import React, { useState, useEffect } from "react";
import {
    FaUser, FaUsers, FaTrashAlt
} from "react-icons/fa";
import axios from 'axios';
import { getAuthToken } from "../../../utils/authToken";
import { API_BASE_URL, API_KEY } from "../../config";

import Button from "../Button";

const AboutMeProfileSection = () => {
    const [activeTab, setActiveTab] = useState("me");
    const [formData, setFormData] = useState({
        full_name: "",
        dob: "",
        location: "",
        bio: "",
        gender: "",
        country: "",
        state: "",
        city: ""
    });

    const [familyMemberInput, setFamilyMemberInput] = useState({
        name: "",
        relation: "",
        dob: "",
        occupation: "",
    });

    const [allFamilyMembers, setAllFamilyMembers] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const token = getAuthToken();
    const [genders, setGenders] = useState([]);
    const [locations, setLocations] = useState('');
    const [profileUpdated, setProfileUpdated] = useState(null);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Handle cascading dropdowns
        if (name === 'country') {
            setFormData(prev => ({ ...prev, state: '', city: '' }));
            setStates([]);
            setCities([]);
            if (value) {
                fetchStates(value);
            }
        } else if (name === 'state') {
            setFormData(prev => ({ ...prev, city: '' }));
            setCities([]);
            if (value) {
                fetchCities(value);
            }
        }
    };

    const handleFamilyInputChange = (e) => {
        const { name, value } = e.target;
        setFamilyMemberInput(prev => ({ ...prev, [name]: value }));
    };

    // Fetch states for selected country
    const fetchStates = async (countryId) => {
        setLoadingStates(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/states/${countryId}`, {
                headers: { 'X-API-KEY': API_KEY, Authorization: `Bearer ${token}` }
            });
            setStates(res.data.data || []);
        } catch (err) {
            console.log(err);
            setStates([]);
        } finally {
            setLoadingStates(false);
        }
    };

    // Fetch cities for selected state
    const fetchCities = async (stateId) => {
        setLoadingCities(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/cities/${stateId}`, {
                headers: { 'X-API-KEY': API_KEY, Authorization: `Bearer ${token}` }
            });
            setCities(res.data.data || []);
        } catch (err) {
            console.log(err);
            setCities([]);
        } finally {
            setLoadingCities(false);
        }
    };

    const addFamilyMember = async (e) => {
        e.preventDefault();

        if (!familyMemberInput.name.trim()) {
            alert("Please enter the family member's name.");
            return;
        }

        try {
            const form = new FormData();
            Object.entries(familyMemberInput).forEach(([key, value]) => {
                form.append(key, value);
            });

            const response = await axios.post(
                `${API_BASE_URL}/childern/add`,
                form,
                {
                    headers: {
                        'X-API-KEY': '123456',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const newMember = {
                id: response.data.data?.id || Date.now(),
                name: familyMemberInput.name,
                relation: familyMemberInput.relation,
                dob: familyMemberInput.dob,
                occupation: familyMemberInput.occupation,
            };

            setAllFamilyMembers(prev => [...prev, newMember]);
            setFamilyMemberInput({ name: "", relation: "", dob: "", occupation: "" });

        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    const deleteFamilyMember = async (id) => {
        if (!window.confirm("Are you sure you want to delete this member?")) return;

        try {
            const res = await axios.get(
                `${API_BASE_URL}/delete-childern/${id}`,
                {
                    headers: {
                        'X-API-KEY': '123456',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (res.data.status) {
                setAllFamilyMembers(prev => prev.filter(member => member.id !== id));
            } else {
                alert("Failed to delete member.");
            }
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Saved:", formData);
    //     alert("Data saved successfully!");
    // };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const token = getAuthToken(); // your custom function to get auth token
    //         const response = await axios.post(`${API_BASE_URL}/update-profile`, formData, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         console.log('Saved:', response.data);
    //         alert('Data saved successfully!');
    //     } catch (error) {
    //         console.error('Error saving data:', error);
    //         alert('Something went wrong!');
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = getAuthToken(); // your auth token logic

            // Convert JSON to FormData
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await axios.post(`${API_BASE_URL}/update-profile`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // DO NOT set Content-Type here. Let browser handle it.
                },
            });

            console.log('Saved:', response.data);
            alert('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Something went wrong!');
        }
    };


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = res.data.data;
                setProfileData(data);
                if (data?.childerns?.length) {
                    setAllFamilyMembers(data.childerns);
                }
            } catch (err) {
                alert("Failed to load profile");
            }
        };
        fetchProfile();
    }, []);

    // Get genders
    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/genders`, {
                    headers: { 'X-API-KEY': API_KEY, Authorization: `Bearer ${token}` }
                });

                const data = res.data.data;
                setGenders(data);

            } catch (err) {
                console.log(err);
                alert("Failed to load genders");
            }
        };
        fetchGenders();
    }, []);

    // Get locations
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/countries`, {
                    headers: { 'X-API-KEY': API_KEY, Authorization: `Bearer ${token}` }
                });

                const data = res.data.data;
                setLocations(data);

            } catch (err) {
                console.log(err);
                alert("Failed to load countries");
            }
        };
        fetchLocations();
    }, []);

    useEffect(() => {
        const fetchProfileUpdated = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/profile-data`, {
                    headers: { 'X-API-KEY': API_KEY, Authorization: `Bearer ${token}` }
                });
                const data = res.data?.data || res.data;
                setProfileUpdated(data);
            }
            catch (err) {
                console.log(err);
                alert("Failed to load updated profile");
            }
        }
        fetchProfileUpdated();
    }, []);

    useEffect(() => {
        if (profileData) {
            setFormData({
                full_name: profileData.full_name || '',
                dob: profileData.dob || '',
                location: profileData.country || '',
                bio: profileData.bio || '',
                gender: profileData.gender || '',
                country: profileData.country || '',
                state: profileData.state || '',
                city: profileData.city || ''
            });
        }
    }, [profileData]);

    useEffect(() => {
        if (profileUpdated) {
            console.log('✅ Final Profile Data:', profileUpdated);
        }
    }, [profileUpdated]);

    return (
        <div className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Profile Settings
                </h1>
                <p className="text-gray-600 text-lg">Manage your personal information and family details</p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
                    <button
                        onClick={() => setActiveTab("me")}
                        className={`flex-1 px-8 py-6 font-semibold text-lg transition-all duration-300 relative group ${
                            activeTab === "me" 
                                ? "text-purple-600 bg-white shadow-lg" 
                                : "text-gray-600 hover:text-purple-500 hover:bg-white/50"
                        }`}
                    >
                        <div className="flex items-center justify-center gap-3">
                            <div className={`p-2 rounded-full transition-all duration-300 ${
                                activeTab === "me" 
                                    ? "bg-purple-100 text-purple-600" 
                                    : "bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600"
                            }`}>
                                <FaUser className="text-xl" />
                            </div>
                            <span>About Me</span>
                        </div>
                        {activeTab === "me" && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("family")}
                        className={`flex-1 px-8 py-6 font-semibold text-lg transition-all duration-300 relative group ${
                            activeTab === "family" 
                                ? "text-purple-600 bg-white shadow-lg" 
                                : "text-gray-600 hover:text-purple-500 hover:bg-white/50"
                        }`}
                    >
                        <div className="flex items-center justify-center gap-3">
                            <div className={`p-2 rounded-full transition-all duration-300 ${
                                activeTab === "family" 
                                    ? "bg-purple-100 text-purple-600" 
                                    : "bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600"
                            }`}>
                                <FaUsers className="text-xl" />
                            </div>
                            <span>About My Family</span>
                        </div>
                        {activeTab === "family" && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                        )}
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-8">
                    {activeTab === "me" && (
                        <div className="space-y-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h2>
                                <p className="text-gray-600">Update your basic profile details</p>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Personal Details Section */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            Basic Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    name="full_name" 
                                                    value={formData.full_name} 
                                                    onChange={handleInputChange} 
                                                    placeholder="Enter your full name" 
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-purple-300 placeholder-gray-400" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                                <input 
                                                    type="date" 
                                                    name="dob" 
                                                    value={formData.dob} 
                                                    onChange={handleInputChange} 
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-purple-300" 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                                <select 
                                                    name="gender"
                                                    value={formData.gender} 
                                                    onChange={handleInputChange} 
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-purple-300 cursor-pointer"
                                                >
                                                    <option value="">Select Gender</option>
                                                    {profileUpdated?.genders?.map((gender) => (
                                                        <option
                                                            key={gender.id}
                                                            value={gender.id}
                                                            selected={gender.selected === 1}
                                                        >
                                                            {gender.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Section */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            Location Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer"
                                                >
                                                    <option value="">Select Country</option>
                                                    {profileUpdated?.countries?.map((country) => (
                                                        <option
                                                            key={country.id}
                                                            value={country.id}
                                                            selected={country.selected === 1}
                                                        >
                                                            {country.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                                <select
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer"
                                                >
                                                    <option value="">{loadingStates ? "Loading states..." : "Select State"}</option>
                                                    {!loadingStates && states.map((state) => (
                                                        <option
                                                            key={state.id}
                                                            value={state.id}
                                                            selected={state.selected === 1}
                                                        >
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                                <select
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer"
                                                >
                                                    <option value="">{loadingCities ? "Loading cities..." : "Select City"}</option>
                                                    {!loadingCities && cities.map((city) => (
                                                        <option
                                                            key={city.id}
                                                            value={city.id}
                                                            selected={city.selected === 1}
                                                        >
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bio Section - Full Width */}
                                <div className="md:col-span-2">
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            About You
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                            <textarea 
                                                name="bio" 
                                                value={formData.bio} 
                                                onChange={handleInputChange} 
                                                rows={4} 
                                                placeholder="Tell us about yourself..." 
                                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-green-300 placeholder-gray-400 resize-none" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="md:col-span-2 flex justify-center pt-6">
                                    <button
                                        type="submit"
                                        className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === "family" && (
                        <div className="space-y-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Family Information</h2>
                                <p className="text-gray-600">Add and manage your family members</p>
                            </div>

                            {/* Add Family Member Form */}
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl border border-orange-100">
                                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    Add New Family Member
                                </h3>
                                
                                <form onSubmit={addFamilyMember} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={familyMemberInput.name} 
                                            onChange={handleFamilyInputChange} 
                                            placeholder="Enter member name" 
                                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-orange-300 placeholder-gray-400" 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Relation</label>
                                        <input 
                                            type="text" 
                                            name="relation" 
                                            value={familyMemberInput.relation} 
                                            onChange={handleFamilyInputChange} 
                                            placeholder="e.g., Brother, Sister, Parent" 
                                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-orange-300 placeholder-gray-400" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                        <input 
                                            type="date" 
                                            name="dob" 
                                            value={familyMemberInput.dob} 
                                            onChange={handleFamilyInputChange} 
                                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-orange-300" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                                        <input 
                                            type="text" 
                                            name="occupation" 
                                            value={familyMemberInput.occupation} 
                                            onChange={handleFamilyInputChange} 
                                            placeholder="Enter occupation" 
                                            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300 outline-none shadow-sm hover:shadow-md hover:border-orange-300 placeholder-gray-400" 
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex justify-center pt-4">
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                        >
                                            <FaUsers className="text-lg" />
                                            Add Family Member
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Family Members List */}
                            {allFamilyMembers.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Family Members ({allFamilyMembers.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {allFamilyMembers.map((member, index) => (
                                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                            {member.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-gray-800 text-lg">{member.name}</h4>
                                                            <p className="text-purple-600 font-medium">{member.relation}</p>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => deleteFamilyMember(member.id)} 
                                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-300"
                                                    >
                                                        <FaTrashAlt className="text-lg" />
                                                    </button>
                                                </div>
                                                <div className="space-y-2 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">DOB:</span>
                                                        <span>{member.dob}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">Occupation:</span>
                                                        <span>{member.occupation}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutMeProfileSection;
