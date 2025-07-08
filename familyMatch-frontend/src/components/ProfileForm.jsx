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

const ProfileForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [ApiData, setApiData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const [questions, setQuestions] = useState([]); // Now questions will be fetched from API
    const [loading, setLoading] = useState(true);
    const [formComplete, setFormComplete] = useState(false);

// For creating functiion to moving to the next page when next button is not dis
    const currentAnswer = answers[questions[currentStep]?.apiname];
    const isNextEnabled =
        !errors[questions[currentStep]?.apiname] &&
        (
          Array.isArray(currentAnswer)
            ? currentAnswer.length > 0
            : !!currentAnswer
        );

// go to the next page by pressing enter key when next button is not disabled
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && isNextEnabled && !(currentStep >= 4 && currentStep <= 15)) {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isNextEnabled, currentStep]);

    // Fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                console.log(`${API_BASE_URL}/new-question`);
                const response = await fetch(`${API_BASE_URL}/new-question`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': API_KEY,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }

                const result = await response.json();
                console.log('API Response:', result);
                
                if (result.status && result.data) {
                    // Check if result.data is directly an array (new API response format)
                    if (Array.isArray(result.data)) {
                        console.log('Using direct array response');
                        const transformedQuestions = result.data.map((question, index) => ({
                            id: question.id || index + 1,
                            apiname: question.apiname || question.id || `question_${index + 1}`,
                            question: question.question || question.text || 'Question',
                            input_type: question.type || question.input_type || 'text',
                            validation_type: question.validation_type || 'text',
                            description: question.description || '',
                            required: question.required !== false,
                            signup_param: question.signup_param || question.apiname || `question_${index + 1}`,
                            options: question.options || []
                        }));
                        console.log('Transformed Questions (direct array):', transformedQuestions);
                        setQuestions(transformedQuestions);
                    }
                    // Check for signup_questions array (previous format)
                    else if (result.data.signup_questions && Array.isArray(result.data.signup_questions)) {
                        console.log('Using signup_questions array');
                        const transformedQuestions = result.data.signup_questions.map((question, index) => ({
                            id: question.id || index + 1,
                            apiname: question.apiname || question.id || `question_${index + 1}`,
                            question: question.question || question.text || 'Question',
                            input_type: question.type || question.input_type || 'text',
                            validation_type: question.validation_type || 'text',
                            description: question.description || '',
                            required: question.required !== false,
                            signup_param: question.signup_param || question.apiname || `question_${index + 1}`,
                            options: question.options || []
                        }));
                        
                        console.log('Transformed Questions (signup_questions):', transformedQuestions);
                        setQuestions(transformedQuestions);
                    }
                    // Check for database_questions array as fallback
                    else if (result.data.database_questions && Array.isArray(result.data.database_questions)) {
                        console.log('Using database_questions array');
                        const transformedQuestions = result.data.database_questions.map((question, index) => ({
                            id: question.id || index + 1,
                            apiname: question.apiname || question.id || `question_${index + 1}`,
                            question: question.question || question.text || 'Question',
                            input_type: question.type || question.input_type || 'text',
                            validation_type: question.validation_type || 'text',
                            description: question.description || '',
                            required: question.required !== false,
                            signup_param: question.signup_param || question.apiname || `question_${index + 1}`,
                            options: question.options || []
                        }));
                        
                        console.log('Transformed Questions (database_questions):', transformedQuestions);
                        setQuestions(transformedQuestions);
                    }
                    // Check if questions array exists (original expected format)
                    else if (result.data.questions && Array.isArray(result.data.questions)) {
                        console.log('Using questions array');
                        const transformedQuestions = result.data.questions.map((question, index) => ({
                            id: question.id,
                            apiname: question.apiname || question.id,
                            question: question.question,
                            input_type: question.type || 'text',
                            validation_type: question.validation_type || 'text',
                            description: question.description || '',
                            required: question.required !== false,
                            signup_param: question.signup_param || question.apiname,
                            options: result.data.options && result.data.options[index] ? result.data.options[index] : []
                        }));
                        
                        console.log('Transformed Questions (questions):', transformedQuestions);
                        setQuestions(transformedQuestions);
                    } else {
                        console.error('No valid questions array found in API response:', result.data);
                        throw new Error('Invalid data structure in API response');
                    }
                } else {
                    console.error('Invalid API response format:', result);
                    throw new Error('API response does not contain status or data');
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
                console.error("Error details:", error.message);
                // Fallback to sample data if API fails
                setQuestions([
                    {
                        "id": 1,
                        "apiname": "dob",
                        "question": "When's your Birth date 81?",
                        "input_type": "date",
                        "validation_type": "birthday",
                        "description": "your text would be here",
                        "required": true,
                        "signup_param": "dob"
                    },
                    {
                        "id": 2,
                        "apiname": "full_name",
                        "question": "What's your name as the main contact for the family?",
                        "input_type": "text",
                        "validation_type": "name",
                        "description": "your text would be here",
                        "required": true,
                        "signup_param": "full_name"
                    },
                    {
                        "id": 3,
                        "apiname": "email",
                        "question": "What's the best email to reach you?",
                        "input_type": "email",
                        "validation_type": "email1",
                        "description": "your text would be here",
                        "required": true,
                        "signup_param": "email"
                    },
                    {
                        "id": 4,
                        "apiname": "password",
                        "question": "What password would you like for your account?",
                        "input_type": "password",
                        "validation_type": "password",
                        "description": "Select strong password",
                        "required": true,
                        "signup_param": "password"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

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

    //Test from utils
    const getValidationType = (question) => {
        return question.validation_type || '';
    };

    const handleChange = (e) => {
        const { value } = e.target;
        const currentQuestion = questions[currentStep];
        const validationType = getValidationType(currentQuestion);
        const error = validateInput(validationType, value);

        setAnswers({ ...answers, [currentQuestion.apiname]: value });
        setErrors({ ...errors, [currentQuestion.apiname]: error });
    };

    // Render input based on input_type
    const renderInput = (question) => {
        const { input_type, options, apiname } = question;
        
        switch (input_type) {
            case 'date':
            case 'text':
            case 'email':
            case 'password':
                return (
                    <InputField
                        q={question}
                        answers={answers}
                        handleChange={handleChange}
                        errors={errors}
                    />
                );
            
            case 'radio':
                return (
                    <div>
                        {options?.map((option, index) => {
                            // Support both string and object
                            const value = typeof option === 'string' ? option : option.id;
                            const label = typeof option === 'string' ? option : (option.option_text || option.name || value);
                            return (
                                <button
                                    key={index}
                                    className={`text-[#AE2456] border m-2 py-2 px-6 rounded-3xl w-full sm:w-auto 
                                        ${answers[apiname] === value ? 'bg-[#AE2456] text-white' : ''}`}
                                    onClick={() => {
                                        setAnswers({ ...answers, [apiname]: value });
                                        setTimeout(() => {
                                            handleNext();
                                        }, 1000);
                                        console.log('answers:', { ...answers, [apiname]: value });
                                    }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                );
            
            case 'checkbox':
                return (
                    <div>
                        {options?.map((option, index) => {
                            // Support both string and object
                            const value = typeof option === 'string' ? option : option.id;
                            const label = typeof option === 'string' ? option : (option.option_text || option.name || value);
                            const currentAnswers = answers[apiname] || [];
                            const isAlreadySelected = currentAnswers.includes(value);
                            return (
                                <button
                                    key={index}
                                    className={`text-black border m-2 py-2 px-6 rounded-3xl sm:w-auto
                                        ${isAlreadySelected ? 'bg-black text-white' : ''}`}
                                    onClick={() => {
                                        const updatedAnswers = isAlreadySelected
                                            ? currentAnswers.filter(item => item !== value)
                                            : [...currentAnswers, value];
                                        setAnswers({ ...answers, [apiname]: updatedAnswers });
                                        console.log('answers:', { ...answers, [apiname]: updatedAnswers });
                                    }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                        <div className='text-center mt-4'>
                            <button 
                                className='px-20 py-3 border-2 rounded-4xl text-white bg-[#AE2456]'
                                onClick={handleNext}
                                disabled={!(Array.isArray(answers[apiname]) ? answers[apiname].length > 0 : !!answers[apiname])}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                );
            
            case 'textarea':
                return (
                    <div>
                        <p className='text-[#AE2456] font-bold mb-2'>Example</p>
                        <textarea
                            value={answers[apiname] || ''}
                            onChange={handleChange}
                            className="border w-full rounded-lg p-4"
                            rows={4}
                            placeholder="What's your vibe? Drop a topic!"
                        />
                        <div className='text-center mt-4'>
                            <button 
                                className='px-20 py-3 border-2 rounded-4xl text-white bg-[#AE2456]'
                                onClick={handleNext}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                );
            
            case 'image':
                return (
                    <div>
                        <ImageUploader onButtonClick={handleNext} />
                    </div>
                );
            
            case 'dropdown-text':
                return (
                    <InputField
                        q={question}
                        answers={answers}
                        handleChange={handleChange}
                        errors={errors}
                    />
                );
            
            default:
                return (
                    <InputField
                        q={question}
                        answers={answers}
                        handleChange={handleChange}
                        errors={errors}
                    />
                );
        }
    };

    const handleFinish = async () => {
        // handleNext(); // isko hata do, ya yahan step na badhao
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': API_KEY
                },
                body: JSON.stringify(answers)
            });

            if (!response.ok) throw new Error('Network error');

            const data = await response.json();
            data.token && setAuthToken(data.token);
            setFormComplete(true); // Show completion screen
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSelectedGalleryOption = (data) => {
        setAnswers({ ...answers, [questions[currentStep].apiname]: data });
    };

    useEffect(() => {
        fetch(`${API_BASE_URL}/options`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY,
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setApiData(data);
            })
            .catch(err => {
                alert(err)
                console.error("Fetch error:", err);
            });
    }, []);

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

    // Show loading state while fetching questions
    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center px-4 sm:px-6"
                style={{
                    background: "linear-gradient(9deg, rgba(250, 233, 239, 0.97) 0%, rgba(247, 248, 250, 1) 100%)"
                }}
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AE2456] mx-auto mb-4"></div>
                    <p className="text-lg text-[#AE2456]">Loading questions...</p>
                </div>
            </div>
        );
    }

    if (formComplete) {
        return <FormCompletionScreen />; // ya koi custom message
    }

    return (
        <div className="w-full h-screen flex justify-center items-center px-4 sm:px-6"
            style={{
                background: "linear-gradient(9deg, rgba(250, 233, 239, 0.97) 0%, rgba(247, 248, 250, 1) 100%)"
            }}
        >
            <div className="w-full max-w-full sm:max-w-[480px] md:max-w-[600px]">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentStep * 100}%)` }}
                    >
                        {questions.map((q) => (
                            <div key={q.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                                <p className="text-xl sm:text-2xl font-bold text-black">FamilyMatch</p>
                                <label className="block text-3xl sm:text-5xl font-bold text-[#AE2456] mb-8 sm:mb-12">
                                    {q.question}
                                </label>
                                
                                {renderInput(q)}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation buttons - only show for simple input types */}
                {questions[currentStep]?.input_type && 
                 ['date', 'text', 'email', 'password', 'dropdown-text'].includes(questions[currentStep].input_type) && (
                    <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                        {currentStep !== 0 && (
                            <button
                                onClick={handlePrev}
                                className="bg-[#AE2456] text-white py-2 px-6 rounded-3xl w-full sm:w-auto"
                            >
                                Previous
                            </button>
                        )}

                        {currentStep === questions.length - 1 ? (
                            <button
                                onClick={handleFinish}
                                className="bg-green-600 text-white py-2 px-6 rounded-3xl w-full sm:w-auto"
                            >
                                That's it
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="bg-[#AE2456] text-white py-2 px-6 rounded-3xl w-full sm:w-auto 
                                disabled:opacity-60 disabled:bg-[#00000080] disabled:cursor-not-allowed"
                                disabled={
                                    !!errors[questions[currentStep]?.apiname] ||
                                    (Array.isArray(answers[questions[currentStep]?.apiname]) ? answers[questions[currentStep]?.apiname].length === 0 : !answers[questions[currentStep]?.apiname])
                                }
                            >
                                Next
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileForm;