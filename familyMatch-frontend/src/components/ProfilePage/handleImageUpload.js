// utils/handleFileUpload.js
import axios from 'axios';
import { getAuthToken } from '../../../utils/authToken';

export const handleImageUpload = async ({
    e,
    endpoint,
    fileFieldName = 'image',
    type = '',
    onPreview,
    onSuccess,
    onError
}) => {
    const token = getAuthToken();
    const selectedFile = e.target.files[0];
    if (!selectedFile || !token) return;

    const tempImageURL = URL.createObjectURL(selectedFile);
    if (onPreview) onPreview(tempImageURL); // show preview immediately

    const formData = new FormData();
    formData.append(fileFieldName, selectedFile);
    if (type) formData.append("type", type);

    try {
        const response = await axios.post(endpoint, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.status === true) {
            if (onSuccess) onSuccess(response.data);
        } else {
            throw new Error(response.data.message || "Upload failed");
        }
    } catch (error) {
        if (onError) onError(error);
    }
};
