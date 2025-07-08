// // src/hooks/usePost.js
// import { useState } from 'react';
// import axios from 'axios';

// const usePost = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const postData = async (url, payload, config = {}) => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await axios.post(url, payload, config);
//             setData(response.data);
//             return response.data;
//         } catch (err) {
//             setError(err);
//             return null;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { postData, data, loading, error };
// };

// export default usePost;
