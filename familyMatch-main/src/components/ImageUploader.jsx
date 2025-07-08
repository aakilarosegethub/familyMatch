import React, { useRef, useState } from "react";
import camera from "/icons/camera.svg"; // Adjust the path as necessary
import { getAuthToken } from '../../utils/authToken';
import { API_BASE_URL } from '../config'

const ImageUploader = ({ onButtonClick }) => {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        const token = getAuthToken();

        if (!file) {
            alert("No file selected");
            return false;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("type", "Profile");

        setLoading(true);

        if (!token) {
            alert("You're Not logged in, Signup again")
            // console.log("No token found, user might not be logged in");
            setLoading(false);
            return false;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (data.status === true) {
                alert("Image uploaded successfully! Media ID: " + data.media_id);
                return true;
            } else {
                alert("Upload failed: " + (data.message || "Unknown error"));
                return false;
            }
        } catch (error) {
            // console.error("Upload error:", error);
            alert("Upload failed: " + error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleCombinedClick = async () => {
        const success = await handleSubmit();
        if (success) {
            onButtonClick();
        } else {
            console.log("API failed, staying on the current page.");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <p>Pro tip: Smiling photos receive more attention</p>

            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {imagePreview ? (
                <>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded-lg border"
                    />
                    <div className="flex flex-col items-center space-y-2">
                        <button
                            onClick={handleCombinedClick}
                            disabled={loading}
                            className="bg-[#AE2456] text-white px-12 py-3 rounded-4xl transition-transform hover:scale-105 disabled:opacity-50"
                        >
                            {loading ? "Uploading..." : "Upload Photo"}
                        </button>
                        <button
                            onClick={handleUploadClick}
                            className="text-sm text-blue-500 hover:underline mt-1"
                        >
                            Replace Photo
                        </button>
                    </div>
                </>
            ) : (
                <button
                    onClick={handleUploadClick}
                    className="cursor-pointer hover:opacity-80 border rounded-lg w-48 h-48 flex items-center justify-center bg-pink shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                    <img className="w-12 h-12" src={camera} alt="camera icon" />
                </button>
            )}
        </div>
    );
};

export default ImageUploader;
