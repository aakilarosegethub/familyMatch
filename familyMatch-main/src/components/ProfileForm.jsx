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






// const questions = [
//     //signup data
//     { id: 1, apiname: "dob", question: "When's your Birth date?", input: 'date', validationType: 'birthday', description: "your text would be here" },
//     { id: 2, apiname: "full_name", question: "What’s your name as the main contact for the family?", input: 'text', validationType: 'name', description: "your text would be here" },
//     { id: 3, apiname: "email", question: "What’s the best email to reach you?", input: 'email', validationType: 'email1', description: "your text would be here" },
//     { id: 4, apiname: "password", question: "What password would you like for your account?", input: 'password', validationType: 'password', description: "your text would be here" },
//     //yhn tk signup ho k token aa jae ga
//     { id: 5, apiname: "reffer_id", question: "How did you hear about FamilyMatch?", input: 'text' },
//     { id: 6, apiname: "religion_id", question: "What's your religion?", input: 'text' },
//     { id: 7, apiname: "body_type", question: "How would you describe your body type?", input: 'text' },
//     //suervy started
//     { id: 8, apiname: "survey_11", question: "Have you ever been married?", input: 'text' },
//     { id: 9, apiname: "survey_16", question: "Do you have kids?", input: 'text' },
//     { id: 10, apiname: "survey_17", question: 'Do you want kids?', input: 'text' },
//     //yhn survey khtm ab blue screeb nthen get profile detail
//     { id: 11, apiname: "ethnic", question: "Which ethnicity best describe you?", input: 'text' },
//     { id: 12, apiname: "interests", question: "What interests you?", input: 'text' },
//     { id: 13, apiname: "bio", question: "One topic. Infinite vibes. What’s yours?", input: 'text' },
//     { id: 14, apiname: "profile_pic", question: "Ready to catch someone’s eye? 👀", input: 'text' },
//     { id: 15, apiname: "cvalues", question: "What are your core values?", input: 'text' },
//     { id: 16, apiname: "number15", question: "", input: 'text'},
// ];

const questions = [
    {
        "id": 1,
        "apiname": "dob",
        "question": "When's your Birth date?",
        "input": "date",
        "validationType": "birthday",
        "description": "your text would be here"
    },
    {
        "id": 2,
        "apiname": "full_name",
        "question": "What’s your name as the main contact for the family?",
        "input": "text",
        "validationType": "name",
        "description": "your text would be here"
    },
    {
        "id": 3,
        "apiname": "email",
        "question": "What’s the best email to reach you?",
        "input": "email",
        "validationType": "email1",
        "description": "your text would be here"
    },
    {
        "id": 4,
        "apiname": "password",
        "question": "What password would you like for your account?",
        "input": "password",
        "validationType": "password",
        "description": "Select strong password"
    },
    {
        "id": 5,
        "apiname": "family_nickname",
        "question": "What’s a special name or nickname for your family?",
        "input": "text",
        "description": "Something that represents your family vibe."
    },
    {
        "id": 6,
        "apiname": "home_location",
        "question": "Where does your family call home?",
        "input": "dropdown-text",
        "description": "Type or select your location"
    },
    {
        "id": 7,
        "apiname": "interest_reason",
        "question": "Why are you interested in Family Match?",
        "input": "radio",
        "options": [
            "New to the area?",
            "Expand family options?",
            "Change in family situation (e.g. divorce, remarriage, new blended family)?",
            "Change in family interests?",
            "Other (specify)"
        ],
        "description": "Help us understand your reason"
    },
    {
        "id": 8,
        "apiname": "family_size",
        "question": "How many family members make up your family?",
        "input": "radio",
        "options": ["1", "2", "3", "4", "5+"],
        "description": "Include yourself too"
    },
    {
        "id": 9,
        "apiname": "life_stage",
        "question": "Which of the following best describes your family's current life stage?",
        "input": "radio",
        "options": [
            "Expecting a child",
            "Raising young kids",
            "Parenting teens",
            "Empty nesters",
            "Multigenerational",
            "Newly married"
        ]
    },
    {
        "id": 10,
        "apiname": "family_status",
        "question": "What’s your family status?",
        "input": "radio",
        "options": [
            "Married",
            "Single parent",
            "Blended family",
            "Multigenerational",
            "Other"
        ]
    },
    {
        "id": 11,
        "apiname": "family_values",
        "question": "What values are at the heart of your family?",
        "input": "checkbox",
        "options": [
            "Kindness",
            "Honesty",
            "Faith",
            "Adventure",
            "Respect",
            "Creativity",
            "Others"
        ]
    },
    {
        "id": 12,
        "apiname": "ethnicity",
        "question": "What is your family’s ethnicity?",
        "input": "checkbox",
        "options": [
            "Asian",
            "Black / African descent",
            "Hispanic / Latino",
            "Middle Eastern",
            "White / Caucasian",
            "Mixed",
            "Prefer not to say",
            "Other"
        ]
    },
    {
        "id": 13,
        "apiname": "languages_spoken",
        "question": "What languages do you speak at home or with friends?",
        "input": "checkbox",
        "options": [
            "English",
            "Urdu",
            "Arabic",
            "Punjabi",
            "Spanish",
            "French",
            "Others"
        ]
    },
    {
        "id": 14,
        "apiname": "family_activities",
        "question": "What activities does your family love doing together?",
        "input": "checkbox",
        "options": [
            "Cooking",
            "Sports",
            "Board games",
            "Traveling",
            "Watching movies",
            "Outdoor adventures",
            "Other"
        ]
    },
    {
        "id": 15,
        "apiname": "activities_with_others",
        "question": "What activities would your family enjoy doing with other families?",
        "input": "checkbox",
        "options": [
            "Picnics",
            "Cultural events",
            "Playdates",
            "Volunteering",
            "Game nights",
            "Group travel",
            "Other"
        ]
    },
    {
        "id": 16,
        "apiname": "family_tradition",
        "question": "What’s a favorite family tradition or celebration you cherish?",
        "input": "text"
    },
    {
        "id": 17,
        "apiname": "family_story",
        "question": "What’s a little something about your family's story or traditions?",
        "input": "textarea"
    },
    {
        "id": 18,
        "apiname": "family_photo",
        "question": "Would you like to share a photo or fun avatar?",
        "input": "image"
    }
]






const ProfileForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [ApiData, setApiData] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [errors, setErrors] = useState({});
// For creating functiion to moving to the next page when next button is not dis
    const isNextEnabled =
        !errors[questions[currentStep]?.apiname] &&
        !!answers[questions[currentStep]?.apiname];

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
        switch (question.id) {
            case 1: return 'birthday';
            case 2: return 'name';
            case 3: return 'email';
            case 4: return 'password';
            default: return '';
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        const currentQuestion = questions[currentStep];
        const validationType = getValidationType(currentQuestion);
        const error = validateInput(validationType, value);

        setAnswers({ ...answers, [currentQuestion.apiname]: value });
        setErrors({ ...errors, [currentQuestion.apiname]: error });
    };

   
    const handleFinish = async () => {
        handleNext();

        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': API_KEY // Change header key & value as needed
                },
                body: JSON.stringify(answers)
            });

            if (!response.ok) throw new Error('Network error');

            const data = await response.json();
            //if data.token setAuth
            data.token && setAuthToken(data.token);
        } catch (error) {
            console.error('Error fetching data:', error);
        };
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
                            <div key={q.id} className=" w-full flex-shrink-0 px-2 sm:px-4"
                                >
                                <p className="text-xl sm:text-2xl font-bold text-black">FamilyMatch</p>

                                <label className="block text-3xl sm:text-5xl font-bold text-[#AE2456] mb-8 sm:mb-12">{q.question}</label>
                               
                                {currentStep >= 9 && currentStep <= 9 ? (
                                    <h1 className='text-[#AE2456] font-bold text-2xl mb-2'>Food and Drinks</h1>
                                ) : ( null)
                                }

                                {
                                    //Single Select OPtions
                                    currentStep >= 5 && currentStep <= 9 ? (
                                        ApiData.data[currentStep - 4]?.map((q) => (
                                            <span key={q.id} className={currentStep === 4 ? 'flex justify-center' : ''}>
                                                <button
                                                    className={`text-[#AE2456] border m-2 py-2 px-6 rounded-3xl w-full sm:w-auto 
                                             ${answers[questions[currentStep].apiname] === q.id ? 'bg-[#AE2456] text-white' : ''}
                                             `}
                                                    onClick={() => {
                                                        setAnswers({ ...answers, [questions[currentStep].apiname]: q.id });
                                                        setTimeout(() => {
                                                            handleNext();
                                                        }, 1000); // delay in milliseconds (2000 ms = 2 seconds)

                                                    }}
                                                >
                                                    {q.name}
                                                </button>
                                            </span>
                                        ))
                                    )
                                        :    
                                        currentStep === 10 ? (
                                       // Multiple select Answers buttons   
                                            ApiData?.data?.[6].map((q) => (
                                                    <button
                                                        key={q.id}
                                                        className={` text-black border m-2 py-2 px-6 rounded-3xl sm:w-auto
                                                    ${(answers[questions[currentStep].apiname] || []).includes(q.id)
                                                                ? 'bg-black text-white'
                                                                : ''
                                                            }
                                                    `}
                                                        onClick={() => handleOptionClick(q, questions, currentStep, answers, setAnswers, setSelectedOptions)}   
                                                    >
                                                        {q.name}
                                                    </button>
                                            ))
                                        ) : currentStep === 11 ? (
                                                ApiData?.data?.[7].map((q) => (
                                                    <button
                                                        key={q.id}
                                                        className={`text-black border m-2 py-2 px-6 rounded-3xl sm:w-auto
                                                    ${(answers[questions[currentStep].apiname] || []).includes(q.id)
                                                                ? 'bg-black text-white'
                                                                : ''
                                                            }
                                                    `}
                                                        onClick={() => handleOptionClick(q, questions, currentStep, answers, setAnswers, setSelectedOptions)}
                                                    >
                                                        <div className='flex items-center gap-1'>
                                                            <img src={q.image} alt="" className='w-3 h-3 mr-2' />
                                                            <span>  {q.name} </span>
                                                        </div>
                                                    </button>
                                                ))
                                        ) 
                                        //Tesxt area input field
                                        : currentStep === 12 ? (
                                            <div className=''>
                                                <p className='text-[#AE2456] font-bold mb-2'>Example</p>
                                                <textarea
                                                    value={answers[q.apiname] || ''}
                                                    onChange={handleChange}
                                                    className="border w-full rounded-lg p-4"
                                                    rows={4}  // You can adjust number of visible lines here
                                                    placeholder="What's your vibe? Drop a topic!"
                                                />

                                                    <div className=' text-center mt-4'>
                                                        <button className='px-20 py-3 border-2 rounded-4xl text-white bg-[#AE2456]'
                                                            onClick={handleNext} >Continue</button>
                                                    </div>
                                                </div>
                                            ) : currentStep === 13 ? (
                                            // File upload input field
                                                <div>

                                                        <ImageUploader onButtonClick={handleNext} />

                                                    </div>   
                                                ) : currentStep === 14 ? (
                                                    <GalleryStyle 
                                                    handleSelectedValues={onSelectedGalleryOption} 
                                                    handleNextFucntion={handleNext}
                                                    apiData={ApiData}
                                                     />
                                                ) : currentStep === 15 ? (
                                                    <FormCompletionScreen answers={answers} />
                                                ) : (
                                            // Text input field
                                                    <InputField
                                                    q={q}
                                                    answers={answers}
                                                    handleChange={handleChange}
                                                    errors={errors}
                                                    />
                                                      )
                                }
                            </div>
                        ))}
                        

                    </div>
                </div>


                {!(currentStep >= 5 && currentStep <= 15) && (
                    <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">

                        {currentStep !== 0 && (
                            <button
                                onClick={handlePrev}
                                className="bg-[#AE2456] text-white py-2 px-6 rounded-3xl w-full sm:w-auto"
                            >
                                Previous
                            </button>
                        )}

                        {currentStep === 3 ? (
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
                                        !!errors[questions[currentStep].apiname] ||
                                        !answers[questions[currentStep].apiname]
                                    }
                                >
                                    Next
                                </button>
                        )}

                    </div>
                )}


                {currentStep >= 10 && currentStep <= 11 ? ( 
                    <div>
                        <div className=' text-center'>
                            <button className='px-20 py-3 border-2 rounded-4xl text-white bg-[#AE2456]'
                            onClick={handleNext} >Continue</button>
                        </div>
                    </div>
                ) : null
                    
                 }

            </div>
        </div>




    );
};

export default ProfileForm;