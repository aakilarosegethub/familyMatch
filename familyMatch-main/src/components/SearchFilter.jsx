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
        });

        const updateFilter = (key, value) => {
            setFilters((prev) => ({ ...prev, [key]: value }));
        };

        // const handleSearch = (overrides = {}) => {
        //     const params = { ...filters, page: 1, ...overrides };

        //     if (overrides.triggeredByButton) {
        //         clearProfileData();
        //     }

        //     setLoadingSearch(true);

        //     axios
        //         .get(`${API_BASE_URL}/results`, {
        //             headers: {
        //                 "X-API-KEY": API_KEY,
        //             },
        //             params,
        //         })
        //         .then((response) => {
        //             searchResultData(response.data);
        //             setIsSearched(true);
        //             setFilters(params);
        //         })
        //         .catch((error) => {
        //             console.error("Error:", error);
        //         })
        //         .finally(() => {
        //             setLoadingSearch(false);
        //         });
        // };


        const handleSearch = (overrides = {}) => {
            const params = { ...filters, page: 1, ...overrides };

            if (overrides.triggeredByButton) {
                clearProfileData();
            }

            setLoadingSearch(true);

            const token = getAuthToken(); // or from cookies / auth context

            const endpoint = token
                ? `${API_BASE_URL}/results-login`
                : `${API_BASE_URL}/results`;

            const headers = {
                "X-API-KEY": API_KEY,
                ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
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
                className={`transition-all duration-500 top-6 mx-0 sm:mx-6 md:mx-0 ${isSearched ? "md:h-[650px]" : "h-auto"
                    } lg:sticky`}
            >
                <div
                    className={`backdrop-blur-md rounded-2xl shadow-2xl bg-cover bg-center transition-all duration-500 p-6 w-full md:w-[500px] flex ${isSearched ? "flex-col" : "flex-wrap"
                        } gap-6`}
                    style={{
                        backgroundImage: `url(${img})`,
                    }}
                >
                    {/* Filter Cards */}
                    <FilterCard label="Gender" icon={<FaUser />}>
                        <select
                            className="w-full border p-2 rounded-md"
                            value={filters.gender}
                            onChange={(e) => updateFilter("gender", e.target.value)}
                        >
                            <option value="">Any</option>
                            {data?.data?.genders?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </FilterCard>

                    <FilterCard label="Age Range">
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={filters.min_age}
                                min={13}
                                placeholder="min age"
                                max={filters.max_age}
                                onChange={(e) => updateFilter("min_age", e.target.value)}
                                className="w-full border p-2 rounded-md"
                            />
                            <span>–</span>
                            <input
                                type="number"
                                value={filters.max_age}
                                placeholder="max age"
                                min={13}
                                onChange={(e) => updateFilter("max_age", e.target.value)}
                                className="w-full border p-2 rounded-md"
                            />
                        </div>
                    </FilterCard>

                    <FilterCard label="Marital Status" icon={<FaMusic />}>
                        <select
                            className="w-full border p-2 rounded-md"
                            value={filters.marital_status}
                            onChange={(e) =>
                                updateFilter("marital_status", e.target.value)
                            }
                        >
                            <option value="">Any</option>
                            {data?.data?.marital_status?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </FilterCard>

                    <FilterCard label="Religion" icon={<FaPray />}>
                        <select
                            className="w-full border p-2 rounded-md"
                            value={filters.religion_id}
                            onChange={(e) => updateFilter("religion_id", e.target.value)}
                        >
                            <option value="">Any</option>
                            {data?.data?.religions?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </FilterCard>

                    <FilterCard label="Qualification" icon={<FaBook />}>
                        <select
                            className="w-full border p-2 rounded-md"
                            value={filters.qualification}
                            onChange={(e) => updateFilter("qualification", e.target.value)}
                        >
                            <option value="">Any</option>
                            <option value="highschool">High School</option>
                            <option value="bachelors">Bachelor's</option>
                            <option value="masters">Master's</option>
                            <option value="phd">PhD</option>
                        </select>
                    </FilterCard>

                    <FilterCard label="Looking For" icon={<FaHeart />}>
                        <div className="flex flex-wrap gap-2">
                            {["Friendship", "Casual", "Serious"].map((goal) => (
                                <button
                                    key={goal}
                                    onClick={() => updateFilter("goal", goal)}
                                    className={`px-4 py-2 rounded-full drop-shadow-md ${filters.goal === goal
                                            ? "bg-[#AE2456] text-white"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                        }`}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </FilterCard>

                    <div className="w-full flex justify-end mt-3">
                        {loadingSearch ? (
                            <div className="flex items-center gap-2">
                                <span className="loader"></span>
                                <p className="text-gray-500">Searching...</p>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleSearch({ triggeredByButton: true })}
                                className="w-full md:w-auto bg-[#9334EB] hover:bg-[#AE2456] text-white px-6 py-2 rounded-3xl flex items-center justify-center gap-2 shadow-md"
                            >
                                <FaSearch /> Search
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
    <div className="w-full md:min-w-[180px]">
        <label className="text-sm font-semibold flex items-center gap-2 mb-2 text-[#AE2456]">
            {icon} {label}
        </label>
        {children}
    </div>
);

export default SearchFilter;
