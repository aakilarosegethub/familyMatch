import React, { useState } from "react";
import { FaGenderless, FaBirthdayCake, FaHeart } from "react-icons/fa";
import { MdCancel, MdSave } from "react-icons/md";

const MatchDataSection = () => {
    const [formData, setFormData] = useState({
        preferredGender: "",
        minAge: "",
        maxAge: "",
        interests: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Match preferences saved!");
    };

    const handleCancel = () => {
        setFormData({
            preferredGender: "",
            minAge: "",
            maxAge: "",
            interests: "",
        });
    };

    return (
        <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-xl">
            <h2 className="text-3xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
                <FaHeart className="text-pink-600" />
                Match Preferences
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
                {/* Preferred Gender */}
                <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                        <FaGenderless />
                        Preferred Gender
                    </label>
                    <select
                        name="preferredGender"
                        value={formData.preferredGender}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-100 rounded-lg shadow-sm text-gray-700 text-base"
                    >
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="nonbinary">Non-binary</option>
                        <option value="any">Any</option>
                    </select>
                </div>

                {/* Age Range */}
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                            <FaBirthdayCake />
                            Min Age
                        </label>
                        <input
                            type="number"
                            name="minAge"
                            value={formData.minAge}
                            onChange={handleInputChange}
                            placeholder="18"
                            className="w-full p-3 bg-gray-100 rounded-lg shadow-sm text-gray-700 text-base"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                            <FaBirthdayCake />
                            Max Age
                        </label>
                        <input
                            type="number"
                            name="maxAge"
                            value={formData.maxAge}
                            onChange={handleInputChange}
                            placeholder="99"
                            className="w-full p-3 bg-gray-100 rounded-lg shadow-sm text-gray-700 text-base"
                        />
                    </div>
                </div>

                {/* Interests */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                        <FaHeart />
                        Interests / Hobbies
                    </label>
                    <textarea
                        name="interests"
                        value={formData.interests}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="e.g. Traveling, cooking, fitness, art..."
                        className="w-full p-3 bg-gray-100 rounded-lg shadow-sm text-gray-700 text-base"
                    ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="col-span-1 md:col-span-2 flex justify-end mt-4 space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        <MdCancel />
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                    >
                        <MdSave />
                        Save Preferences
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MatchDataSection;
