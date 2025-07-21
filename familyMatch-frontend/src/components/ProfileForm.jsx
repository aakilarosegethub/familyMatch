import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import GalleryStyle from './GalleryStyle';
import TestComponent from './TestComponent';
import FormCompletionScreen from './FormCompletionScreen';
import { validateInput } from '../../utils/validation'; // Adjust path as needed
import InputField from './InputFields'; // adjust the path as needed
import { setAuthToken } from '../../utils/authToken';
import { API_KEY } from '../config';
import { API_BASE_URL } from '../config';
import { fetchQuestions, submitAnswers } from './services/questionsService';
import { FaCheck } from 'react-icons/fa';   // یا  MdCheck  etc.

const ProfileForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [completForm, setCompletForm] = useState(false)

    const getType = () => {
        return questions[currentStep].input;
    }

    // For creating functiion to moving to the next page when next button is not dis
    const isNextEnabled =
        !errors[questions[currentStep]?.apiname] &&
        !!answers[questions[currentStep]?.apiname];

    // Enhanced keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {

            if (e.key === 'Enter' && isNextEnabled && !(currentStep >= 4 && currentStep <= 15)) {
                handleNext();
            } else if (e.key === 'ArrowLeft' && currentStep > 0) {
                handlePrev();
            } else if (e.key === 'ArrowRight' && isNextEnabled && !(currentStep >= 4 && currentStep <= 15)) {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isNextEnabled, currentStep]);

    useEffect(() => {

        const disableTab = (e) => {

            if (e.key === 'Tab') {
                e.preventDefault();
            }

        };

        window.addEventListener('keydown', disableTab, true);

        return () => {
            window.removeEventListener('keydown', disableTab, true);
        };
    }, []);



    // Touch/Swipe navigation
    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && isNextEnabled && !(currentStep >= 4 && currentStep <= 15)) {
            handleNext();
        } else if (isRightSwipe && currentStep > 0) {
            handlePrev();
        }
    };

    const handleNext = () => {

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else if (currentStep >= questions.length - 1) {
            setCompletForm(true)
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    //Test from utils
    const getValidationType = (question) => {
        return question.validationType;
    };

    const handleChange = (e) => {
        const { value } = e.target;
        const currentQuestion = questions[currentStep];
        const validationType = getValidationType(currentQuestion);

        const error = validateInput(validationType, value);
        setDisableSubmit(error !== '');
        answers[currentQuestion.apiname] = value;
        setAnswers(answers);
        setErrors({ ...errors, [currentQuestion.apiname]: error });
    };

    const handleFinish = async () => {
        handleNext();

        try {
            const data = await submitAnswers(answers);
            //if data.token setAuth
            data.token && setAuthToken(data.token);
        } catch (error) {
            console.error('Error submitting answers:', error);
        };
    };

    const onSelectedGalleryOption = (data) => {
        setAnswers({ ...answers, [questions[currentStep].apiname]: data });
    };

    // Fetch questions from API
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                setLoading(true);
                const response = await fetchQuestions();
                if (response.status) {
                    setQuestions(response.data);
                } else {
                    setError('Failed to load questions');
                }
            } catch (err) {
                console.error('Error loading questions:', err);
                setError('Failed to load questions');
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, []);

    // Remove options API call - options will come with questions

    const handleOptionClick = (q, questions, currentStep, answers, setAnswers, setSelectedOptions) => {
        const { apiname } = questions[currentStep];
        const currentAnswers = answers[apiname] || [];

        const isAlreadySelected = currentAnswers.includes(q.id);
        const updatedAnswers = isAlreadySelected
            ? currentAnswers.filter((item) => item !== q.id)
            : [...currentAnswers, q.id];

        const newAnswers = {
            ...answers,
            [apiname]: updatedAnswers,
        };

        setAnswers(newAnswers);
        setSelectedOptions(updatedAnswers);
    };

    // Show loading state
    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center px-4 sm:px-6"
                style={{
                    background: "linear-gradient(9deg, rgba(250, 233, 239, 0.97) 0%, rgba(247, 248, 250, 1) 100%)"
                }}
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AE2456] mx-auto mb-4"></div>
                    <p className="text-[#AE2456] font-semibold">Loading questions...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="w-full h-screen flex justify-center items-center px-4 sm:px-6"
                style={{
                    background: "linear-gradient(9deg, rgba(250, 233, 239, 0.97) 0%, rgba(247, 248, 250, 1) 100%)"
                }}
            >
                <div className="text-center">
                    <p className="text-red-600 font-semibold mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#AE2456] text-white py-2 px-6 rounded-3xl"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="w-full h-screen flex justify-center items-center px-4 sm:px-6"
            style={{
                background: "linear-gradient(9deg, rgba(250, 233, 239, 0.97) 0%, rgba(247, 248, 250, 1) 100%)"
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >

            <div className="w-full max-w-full sm:max-w-[480px] md:max-w-[600px]">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentStep * 100}%)` }}
                    >
                        {questions.map((q) => (

                            <div key={q.id} className={`${q.input === 'core_value' ? 'h-[500px] overflow-auto' : ''}   w-full flex-shrink-0 px-2 sm:px-4`}
                            >
                                <p className="text-xl sm:text-2xl font-bold text-black">
                                    FamilyMatch
                                </p>

                                <label className="block text-3xl sm:text-5xl font-bold text-[#AE2456] mb-8 sm:mb-12">{(q.question) ? q.question : 'No question'}</label>
                                {(q.input === 'date' || q.input === 'email' || q.input === 'password' || q.input === 'text') ? (
                                    <InputField
                                        q={q}
                                        answers={answers}
                                        handleChange={handleChange}
                                        errors={errors}
                                        type="date"
                                    />
                                ) : q.input === 'radio' ? (
                                    q.options?.map((option, idx) => (
                                        <span key={idx}>
                                            <button
                                                className={`text-[#AE2456] border m-2 py-2 px-6 rounded-3xl w-full sm:w-auto`}
                                                onClick={() => {
                                                    setAnswers({ ...answers, [q.apiname]: option.id });
                                                    setTimeout(() => {
                                                        handleNext();
                                                    }, 1000);
                                                }}
                                            >
                                                {(typeof option === 'string') ? option : option.name}
                                            </button>
                                        </span>
                                    ))
                                ) : q.input === 'checkbox' ? (
                                    q.options?.map((option, idx) => (
                                        <span key={idx} className={currentStep === 4 ? 'flex justify-center' : ''}>
                                            <button
                                                className={`text-[#AE2456] border m-2 py-2 px-6 rounded-3xl w-full sm:w-auto 
                                                    ${Array.isArray(answers[q.apiname]) && answers[q.apiname].includes(option) ? 'bg-[#AE2456] text-white' : ''}
                                                `}
                                                onClick={() => {

                                                    const currentAnswers = Array.isArray(answers[q.apiname]) ? answers[q.apiname] : [];
                                                    const isSelected = currentAnswers.includes(option);
                                                    const updatedAnswers = isSelected
                                                        ? currentAnswers.filter((item) => item !== option)
                                                        : [...currentAnswers, option];
                                                    setAnswers({ ...answers, [q.apiname]: updatedAnswers });
                                                }}
                                            >

                                                {(typeof option === 'string') ? option : option.name}
                                            </button>
                                        </span>
                                    ))
                                ) : q.input === 'img' ? (
                                    q.options?.map((option, idx) => (

                                        <span key={idx}>
                                            <button
                                                className={`text-[#AE2456] border m-2 py-2 px-6 rounded-3xl w-full sm:w-auto 
                                                    ${answers[q.apiname] === option.name ? 'bg-[#AE2456] text-white' : ''}
                                                `}
                                                onClick={() => {
                                                    setAnswers({ ...answers, [q.apiname]: option.name });
                                                    setTimeout(() => {
                                                        handleNext();
                                                    }, 1000);
                                                }}
                                            >
                                                {option.name}
                                            </button>
                                        </span>
                                    ))
                                ) :
                                    q.input == 'image' && completForm === false ? (
                                        // File upload input field
                                        <div>

                                            <ImageUploader onButtonClick={handleNext} />

                                        </div>
                                    ) : null}


                                {

                                    currentStep === 10 && q.input == 'radio' ? (
                                        // Multiple select Answers buttons   
                                        q.options?.map((option) => (
                                            <button
                                                key={option.id}
                                                className={` text-black border m-2 py-2 px-6 rounded-3xl sm:w-auto
                                                    ${(answers[q.apiname] || []).includes(option.id)
                                                        ? 'bg-black text-white'
                                                        : ''
                                                    }
                                                    `}
                                                onClick={() => handleOptionClick(option, questions, currentStep, answers, setAnswers, setSelectedOptions)}
                                            >
                                                {option.name}
                                            </button>
                                        ))
                                    ) : q.input === 'interests' || currentStep === 11 && q.input == 'radio' ? (
                                        q.options?.map((option) => (
                                            <button
                                                key={option.id}
                                                className={`text-black border m-2 py-2 px-6 rounded-3xl sm:w-auto
                                                    ${(answers[q.apiname] || []).includes(option.id)
                                                        ? 'bg-[#AE2456] text-white'
                                                        : ''
                                                    }
                                                    `}
                                                onClick={() => handleOptionClick(option, questions, currentStep, answers, setAnswers, setSelectedOptions)}
                                            >
                                                <div className='flex items-center gap-1'>
                                                    {q.apiname !== 'ethnicity' && <img src={option.image} alt="" className='w-4 h-4 mr-2' />}
                                                    <span>  {option.name} </span>
                                                </div>
                                            </button>
                                        ))
                                    ) : q.input === 'core_value' ? (
                                        q.options?.map((option) => (
                                            <button
                                                key={option.id}
                                                className={`text-black border relative w-[22%] h-[160px] text-center m-2 px-2 py-2 px-6 rounded-3xl 
                                                    ${(answers[q.apiname] || []).includes(option.id)
                                                        ? 'bg-[#AE2456] text-white'
                                                        : ''
                                                    }
                                                    `}
                                                onClick={() => handleOptionClick(option, questions, currentStep, answers, setAnswers, setSelectedOptions)}
                                            >
                                                <div className='flex flex-col items-center justify-center gap-1'>
                                                    <div className='block'>
                                                        <img src={option.image} alt="" className='w-2xl h-2xl mr-2' />
                                                    </div>
                                                    <div className='block '>
                                                        <span>  {option.name} </span>
                                                    </div>
                                                </div>
                                                {(answers[q.apiname] || []).includes(option.id) && (
                                                    <FaCheck className="absolute bg-black rounded-full p-1 top-2 right-2 text-xl text-white" />
                                                )}
                                            </button>
                                        ))
                                    )
                                        //Text area input field
                                        : getType() === 'textarea' ? (
                                            <div className=''>
                                                <p className='text-[#AE2456] font-bold mb-2'>Example</p>
                                                <textarea
                                                    value={answers[q.apiname] || ''}
                                                    onChange={handleChange}
                                                    className="border w-full rounded-lg p-4"
                                                    rows={4}  // You can adjust number of visible lines here
                                                    placeholder="What's your vibe? Drop a topic!"
                                                />

                                                <div className='text-center mt-4'>
                                                    <button className='px-20 py-3 border-2 rounded-4xl text-white bg-[#AE2456]'
                                                        onClick={handleNext} >Continue</button>
                                                </div>
                                            </div>
                                        )
                                            // : getType() === 'checkbox' ? (
                                            //     <div className='text-center mt-4'>
                                            //         <button className='px-20 py-3 border-2 rounded-4xl text-white bg-[#AE2456]'
                                            //             onClick={handleNext} >Continue</button>
                                            //     </div>
                                            // )
                                            : currentStep === 13 && q.input == 'image' ? (
                                                // File upload input field
                                                <div>
                                                    <ImageUploader onButtonClick={handleNext} />

                                                </div>
                                            ) : completForm === true ? (
                                                <FormCompletionScreen answers={answers} />
                                            ) : null
                                }
                            </div>
                        ))}


                    </div>
                </div>




                {/* Step Progress Indicator */}
                <div className="mt-6 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            Step {currentStep + 1} of {questions.length}
                            <br />

                        </span>
                    </div>
                </div>
                {/* || (questions[currentStep].input === 'interests' || questions[currentStep].input === 'core_value')  */}
                {(!(currentStep >= 6 && currentStep <= 11) && currentStep !== questions.length - 1) && (
                    <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">

                        {currentStep !== 0 && (
                            <button
                                onClick={handlePrev}
                                className="bg-[#AE2456] text-white py-2 px-6 rounded-3xl w-full sm:w-auto hover:bg-[#8a1d44] transition-colors"
                            >
                                ← Previous
                            </button>
                        )}

                        {currentStep === 3 ? (
                            <button
                                onClick={handleFinish}
                                disabled={disableSubmit}
                                className="bg-green-600 text-white py-2 px-6 rounded-3xl w-full sm:w-auto hover:bg-green-700 transition-colors disabled:opacity-60 disabled:bg-[#00000080] disabled:cursor-not-allowed hover:bg-[#8a1d44] transition-colors"
                            >
                                That's it
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="bg-[#AE2456] text-white py-2 px-6 rounded-3xl w-full sm:w-auto 
                                    disabled:opacity-60 disabled:bg-[#00000080] disabled:cursor-not-allowed hover:bg-[#8a1d44] transition-colors"
                                disabled={
                                    !!errors[questions[currentStep].apiname] ||
                                    !answers[questions[currentStep].apiname]
                                }
                            >
                                Next →
                            </button>
                        )}

                    </div>
                )}


                {currentStep >= 12 && currentStep <= 11 ? (
                    <div>
                        <div className=' text-center'>
                            <button className='px-20 py-3 border-2 rounded-4xl text-white bg-[#AE2456]'
                                onClick={handleNext} >Continue</button>
                        </div>
                    </div>
                ) : null

                }

            </div>
        </div >
    );
};

export default ProfileForm; 