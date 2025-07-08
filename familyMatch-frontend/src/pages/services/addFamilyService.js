// services/profileService.js
import axios from "axios";
import API_BASE_URL from '../../config'


// Personal Section Data
export const getPersonalData = () => {
    return axios.get(`${API_BASE_URL}/profile_options/personal`, {);
};

// // Lifestyle Section Data
// export const getLifestyleData = () => {
//     return axios.get("/api/lifestyle");
// };

// // Interests Section Data
// export const getInterestsData = () => {
//     return axios.get("/api/interests");
// };
