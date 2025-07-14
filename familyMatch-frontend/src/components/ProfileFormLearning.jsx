// Jee, yahan pe component ki imports hain. Ye React component ka start hai, jismein kai dusre components aur utilities import kiye gaye hain. 
// Ye sahi tarah se likha gaya hai aur component ka structure theek hai. 
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import GalleryStyle from './GalleryStyle';
import TestComponent from './TestComponent';
import FormCompletionScreen from './FormCompletionScreen';
import { validateInput } from '../../utils/validation'; // Adjust path as needed
import InputField from './InputFields'; // adjust the path as needed
import { setAuthToken } from '../../utils/authToken';
import { API_KEY } from '../config';
import { API_BASE_URL } from '../config';
import ProfileHeader from '../components/ProfilePage/ProfileHeader';

const questions = [
  { param: 'name', txt: 'What is your name?', field_name: 'full_name', field_type: 'text', placeholder: 'Type your answer here...' },
  { param: 'age', txt: 'How old are you?', field_name: 'age', field_type: 'number', placeholder: 'Type your age...' },
  { param: 'email', txt: 'What is your email address?', field_name: 'email', field_type: 'email', placeholder: 'Type your email...' },
  { param: 'city', txt: 'Which city do you live in?', field_name: 'city', field_type: 'text', placeholder: 'Type your city...' },
  // { param: 'hobby', txt: 'What is your favorite hobby?', field_name: 'hobby', field_type: 'text' }
];

function ProfileFormLearning() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      if (!window.answeredFieldsObj) {
        window.answeredFieldsObj = {};
      }
      const fieldName = questions[currentIndex].field_name;
      window.answeredFieldsObj[fieldName] = inputValue;
      setInputValue('');
      setTouched(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      if (!window.answeredFieldsObj) {
        window.answeredFieldsObj = {};
      }
      const fieldName = questions[currentIndex].field_name;
      window.answeredFieldsObj[fieldName] = inputValue;
      setInputValue('');
      setTouched(false);
      console.log(window.answeredFieldsObj);
      alert('All questions completed!');
    }
  };

  const currentQuestion = questions[currentIndex];
  const isInputEmpty = inputValue.trim() === '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white flex items-center justify-center">
      <div className="w-full max-w-xl px-4 py-12 flex flex-col items-center justify-center">
        {/* Brand */}
        <div className="mb-2 w-full text-center">
          <span className="text-3xl md:text-4xl font-bold text-black">FamilyMatch</span>
        </div>
        {/* Question */}
        <div className="mb-10 w-full text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-[#AE2456] leading-tight mb-4">
            {currentQuestion.txt}
          </h1>
        </div>
        {/* Input Field */}
        <div className="mb-2 max-w-lg w-full mx-auto">
          <div className="relative">
            <input
              type={currentQuestion.field_type}
              placeholder={currentQuestion.placeholder || ''}
              value={inputValue}
              onChange={e => { setInputValue(e.target.value); setTouched(true); }}
              onBlur={() => setTouched(true)}
              className="block w-full bg-transparent border-0 border-b-2 border-[#AE2456] text-2xl md:text-3xl font-semibold text-black placeholder-gray-400 focus:outline-none focus:border-[#AE2456] transition-all py-2 pr-12 text-center"
            />
            {/* Calendar icon for date type */}
            {currentQuestion.field_type === 'date' && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
            )}
          </div>
          <div className="text-[#AE2456] text-base mt-1 text-center">
            You can type your answer here
          </div>
        </div>
        {/* Button */}
        <div className="mt-8 w-full text-center">
          <button
            onClick={handleNext}
            disabled={isInputEmpty}
            className={`rounded-full px-10 py-3 text-lg font-semibold text-white transition-all duration-200 ${isInputEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#AE2456] hover:bg-[#8e1d45]'} shadow-md`}
            style={{ minWidth: 120 }}
          >
            {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileFormLearning; 