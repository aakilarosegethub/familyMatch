import React, { useState, useEffect } from 'react';

const GalleryStyle = ({ handleSelectedValues, handleNextFucntion, apiData }) => {
    const [selected, setSelected] = useState([]);

    const toggleValue = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((val) => val !== id));
        } else if (selected.length < 3) {
            setSelected([...selected, id]);
        }
    };

    useEffect(() => {
        if (selected.length > 0) {
            handleSelectedValues(selected);
            console.log("Updated selected values:", selected);
        }

        if (selected.length === 3) {
            handleNextFucntion();
        }
    }, [selected]);

    useEffect(() => {
        console.log("gallery data", apiData);
    },);

    return (
        <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-gray-600 mb-6">Choose 3 values to share on your profile.</p>
            {/* Scrollable fixed-height grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-scroll no-scrollbar">
                {/* {apiData.map(({ id, name, image }) => (
                    <div
                        key={id}
                        onClick={() => toggleValue(id)}
                        className={`relative p-6 border rounded-xl cursor-pointer transition duration-200 ${selected.includes(id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:bg-gray-50'
                            }`}
                    >
                        <img src={image} alt={name} className="mx-auto mb-2 max-h-16 object-contain" />
                        <div className="">{name}</div>

                        {selected.includes(id) && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                                ✓
                            </div>
                        )}
                    </div>
                ))} */}
            </div>

            <div className="mt-6 font-semibold text-blue-600">{selected.length}/3 Selected</div>
        </div>
    );
};

export default GalleryStyle;
