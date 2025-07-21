import React from 'react'

function TextSection() {
  return (
    <div className='p-6'>
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
            <h3 className="text-lg font-semibold text-pink-700 mb-4 flex items-center justify-center gap-2">
                <span className="text-2xl">💌</span>
                A Message from FamilyMatch
            </h3>
            <div className="text-center">
                <p className="text-gray-700 leading-relaxed text-lg">
                    We believe that meaningful connections start with understanding and shared values. 
                    Take the time to explore this profile and discover what makes them unique. 
                    Remember, every great relationship begins with a simple hello. 
                    Don't hesitate to reach out and start a conversation that could change your life forever.
                </p>
                <div className="mt-6 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
                        <span>💝</span>
                        <span>Ready to connect?</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TextSection;