import React, {  useState } from 'react';

const InputField = ({ q, answers, handleChange, errors, }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = q.input === 'password';
    const inputType = isPassword && showPassword ? 'text' : q.input;



    return (
        
        <div>
            <div className='flex'>
                <input
                    type={inputType}
                    value={answers[q.apiname] || ''}
                    onChange={handleChange}
                    className="border-b-2 border-[#AE2456] pt-4 sm:pt-6 w-full focus:outline-none text-base sm:text-lg"


                />
                {isPassword && (
                    <p
                        className="border-b-2 border-[#AE2456] text-sm text-blue-500 cursor-pointer flex items-end me-2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </p>
                )}
            </div>
            {errors[q.apiname] && (
                <p className="text-red-500 text-xs mt-1">{errors[q.apiname]}</p>
            )}

            <p className="text-[#AE2456] mt-1 text-xs">You can type your answer here</p>
        </div>
    );
};

export default InputField;
