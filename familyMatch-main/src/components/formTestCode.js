import React, { useState } from 'react';

const questions = [
    { id: 1, question: 'What is your name?' },
    { id: 2, question: 'How old are you?' },
    { id: 3, question: 'What is your favorite color?' },
    // {id : 4, question: 'What is your favorite food?' },
];

const ProfileForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);

        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleChange = (e) => {
        setAnswers({ ...answers, [questions[currentStep].id]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <div className="relative overflow-hidden h-40">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentStep * 100}%)` }}
                >
                    {questions.map((q) => (
                        <div key={q.id} className="w-full flex-shrink-0 px-4">
                            <label className="block text-lg font-medium mb-2">{q.question}</label>
                            <input
                                type="text"
                                value={answers[q.id] || ''}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
                >
                    Previous
                </button>   
                <button
                    onClick={handleNext}
                    disabled={currentStep === questions.length - 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProfileForm;