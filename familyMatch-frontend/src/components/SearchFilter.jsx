import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useEffect,
} from "react";
import img from "/images/heartRibbon.avif";
import useFetch from "../components/hooks/useFetch";
import {
    FaUser,
    FaHeart,
    FaSearch,
    FaBook,
    FaPray,
    FaMusic,
} from "react-icons/fa";
import { API_KEY, API_BASE_URL } from "../config";
import axios from "axios";
import { getAuthToken } from "../../utils/authToken";

const SearchFilter = forwardRef(
    ({ searchResultData, clearProfileData }, ref) => {
        const [filters, setFilters] = useState({
            gender: "",
            location: "",
            min_age: "",
            max_age: "",
            goal: "",
            marital_status: "",
            religion_id: "",
            qualification: "",
            page: 1,
            per_page: 5,
            sort: "asc",
        });

        const [loadingSearch, setLoadingSearch] = useState(false);
        const [isSearched, setIsSearched] = useState(false);

        const { data, loading, error } = useFetch(`${API_BASE_URL}/search`, {
            headers: {
                "X-API-KEY": "123456",
                "Content-Type": "application/json",
            },
        }, 10 * 60 * 1000); // 10 minutes cache for search data

        const updateFilter = (key, value) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
        };

        const handleSearch = (overrides = {}) => {
            const params = { ...filters, page: 1, ...overrides };

            if (overrides.triggeredByButton) {
                clearProfileData();
            }

            setLoadingSearch(true);

            const token = getAuthToken();

            const endpoint = token
                ? `${API_BASE_URL}/results-login`
                : `${API_BASE_URL}/results`;

            const headers = {
                "X-API-KEY": API_KEY,
                ...(token && { Authorization: `Bearer ${token}` }),
            };

            axios
                .get(endpoint, {
                    headers,
                    params,
                })
                .then((response) => {
                    searchResultData(response.data);
                    setIsSearched(true);
                    setFilters(params);
                })
                .catch((error) => {
                    console.error("Error:", error);
                })
                .finally(() => {
                    setLoadingSearch(false);
                });
        };

        const handleLoadMore = () => {
            const nextPage = filters.page + 1;
            handleSearch({ page: nextPage });
        };

        useImperativeHandle(ref, () => ({
            handleLoadMore,
        }));

        return (
            <div
                className={`transition-all duration-500 top-6 mx-0 sm:mx-6 md:mx-0 ${
                    isSearched ? "md:h-[650px]" : "h-auto"
                } lg:sticky`}
            >
                <div
                    className={`bg-gradient-to-br from-white via-purple-50 to-pink-50 border border-purple-100 rounded-3xl shadow-2xl transition-all duration-500 p-8 w-full md:w-[520px] flex ${
                        isSearched ? "flex-col" : "flex-wrap"
                    } gap-6 backdrop-blur-sm`}
                    style={{
                        boxShadow: "0 20px 40px rgba(147, 52, 235, 0.1), 0 8px 16px rgba(174, 36, 86, 0.1)"
                    }}
                >
                    {/* Filter Cards */}
                    <FilterCard label="Gender" icon={<FaUser />}>
                        <select
                            className="w-full bg-white border-2 border-purple-200 p-3 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none shadow-sm"
                            value={filters.gender}
                            onChange={(e) => updateFilter("gender", e.target.value)}
                            disabled={loading}
                        >
                            <option value="">{loading ? "Loading..." : "Select Gender"}</option>
                            {!loading && data?.data?.genders?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </FilterCard>

                    <FilterCard label="Age Range">
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                value={filters.min_age}
                                min={13}
                                placeholder="Min"
                                max={filters.max_age}
                                onChange={(e) => updateFilter("min_age", e.target.value)}
                                className="w-full bg-white border-2 border-purple-200 p-3 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none shadow-sm"
                            />
                            <span className="text-purple-500 font-semibold text-lg">–</span>
                            <input
                                type="number"
                                value={filters.max_age}
                                placeholder="Max"
                                min={13}
                                onChange={(e) => updateFilter("max_age", e.target.value)}
                                className="w-full bg-white border-2 border-purple-200 p-3 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none shadow-sm"
                            />
                        </div>
                    </FilterCard>

                    <FilterCard label="Marital Status" icon={<FaMusic />}>
                        <select
                            className="w-full bg-white border-2 border-purple-200 p-3 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none shadow-sm"
                            value={filters.marital_status}
                            onChange={(e) =>
                                updateFilter("marital_status", e.target.value)
                            }
                            disabled={loading}
                        >
                            <option value="">{loading ? "Loading..." : "Select Status"}</option>
                            {!loading && data?.data?.marital_status?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </FilterCard>

                    <FilterCard label="Religion" icon={<FaPray />}>
                        <select
                            className="w-full bg-white border-2 border-purple-200 p-3 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none shadow-sm"
                            value={filters.religion_id}
                            onChange={(e) => updateFilter("religion_id", e.target.value)}
                            disabled={loading}
                        >
                            <option value="">{loading ? "Loading..." : "Select Religion"}</option>
                            {!loading && data?.data?.religions?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </FilterCard>

                    <FilterCard label="Qualification" icon={<FaBook />}>
                        <select
                            className="w-full bg-white border-2 border-purple-200 p-3 rounded-xl text-gray-700 font-medium focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200 outline-none shadow-sm"
                            value={filters.qualification}
                            onChange={(e) => updateFilter("qualification", e.target.value)}
                        >
                            <option value="">Select Qualification</option>
                            <option value="highschool">High School</option>
                            <option value="bachelors">Bachelor's</option>
                            <option value="masters">Master's</option>
                            <option value="phd">PhD</option>
                        </select>
                    </FilterCard>

                    <FilterCard label="Looking For" icon={<FaHeart />}>
                        <div className="flex flex-wrap gap-3">
                            {["Friendship", "Casual", "Serious"].map((goal) => (
                                <button
                                    key={goal}
                                    onClick={() => updateFilter("goal", goal)}
                                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                                        filters.goal === goal
                                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                            : "bg-white text-gray-600 hover:text-purple-600 border-2 border-purple-200 hover:border-purple-400 shadow-sm"
                                    }`}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </FilterCard>

                    <div className="w-full flex justify-end mt-6">
                        {loadingSearch ? (
                            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm">
                                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-600 font-medium">Searching...</p>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleSearch({ triggeredByButton: true })}
                                className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                <FaSearch className="text-lg" /> Search
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

// FilterCard component
const FilterCard = ({ label, icon, children }) => (
    <div className="w-full md:min-w-[200px]">
        <label className="text-sm font-bold flex items-center gap-2 mb-3 text-gray-700 uppercase tracking-wide">
            <span className="text-purple-500">{icon}</span> {label}
        </label>
        {children}
    </div>
);

export default SearchFilter;
