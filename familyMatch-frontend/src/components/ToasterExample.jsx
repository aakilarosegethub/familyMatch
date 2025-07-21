import React from 'react';
import { toaster } from '../utils/alertUtils';

const ToasterExample = () => {
  const handleSuccess = () => {
    toaster('success', 'Operation completed successfully!');
  };

  const handleError = () => {
    toaster('error', 'Something went wrong. Please try again.');
  };

  const handleWarning = () => {
    toaster('warning', 'Please check your input before proceeding.');
  };

  const handleInfo = () => {
    toaster('info', 'This is an informational message.');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Toaster Function Examples</h2>
      <div className="space-y-2">
        <button
          onClick={handleSuccess}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Show Success Toast
        </button>
        <button
          onClick={handleError}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Show Error Toast
        </button>
        <button
          onClick={handleWarning}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Show Warning Toast
        </button>
        <button
          onClick={handleInfo}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Show Info Toast
        </button>
      </div>
    </div>
  );
};

export default ToasterExample; 