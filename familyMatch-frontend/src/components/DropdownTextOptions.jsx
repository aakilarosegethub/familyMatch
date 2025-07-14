import React, { useState } from 'react';

const DropdownTextOptions = ({ options = [], selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    const selectedOption = options.find(option => option === selected);

    return (
        
        <div className="relative">
            I MHERE
            {/* Dropdown Button */}
            <button
                type="button"
                className="w-full text-left border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#AE2456] focus:border-transparent"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedOption ? 'text-black' : 'text-gray-500'}>
                    {selectedOption || 'Select an option...'}
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-full text-left px-4 py-3 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                                selected === option ? 'bg-[#AE2456] text-white hover:bg-[#AE2456]' : ''
                            }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default DropdownTextOptions; 