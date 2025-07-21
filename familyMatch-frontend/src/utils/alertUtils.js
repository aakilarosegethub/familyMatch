import toast from 'react-hot-toast';

/**
 * Simple toaster function that can be called from anywhere in the app
 * @param {string} status - 'success', 'error', 'info', or 'warning'
 * @param {string} message - The message to display
 */
export const toaster = (status, message) => {
  switch (status.toLowerCase()) {
    case 'success':
      toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
      break;
    case 'error':
      toast.error(message, {
        duration: 5000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
      break;
    case 'warning':
      toast(message, {
        duration: 4000,
        position: 'top-right',
        icon: '⚠️',
        style: {
          background: '#F59E0B',
          color: '#fff',
        },
      });
      break;
    case 'info':
    default:
      toast(message, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#3B82F6',
          color: '#fff',
        },
      });
      break;
  }
};

/**
 * Global alert function that can be used throughout the app
 * @param {string} status - 'success' or 'error'
 * @param {string} message - The message to display
 */
export const showAlert = (status, message) => {
  if (status === 'success') {
    toast.success(message);
  } else if (status === 'error') {
    toast.error(message);
  } else {
    // Default to info toast for other statuses
    toast(message);
  }
};

/**
 * Success alert helper
 * @param {string} message - The success message to display
 */
export const showSuccessAlert = (message) => {
  toast.success(message);
};

/**
 * Error alert helper
 * @param {string} message - The error message to display
 */
export const showErrorAlert = (message) => {
  toast.error(message);
};

/**
 * Info alert helper
 * @param {string} message - The info message to display
 */
export const showInfoAlert = (message) => {
  toast(message);
}; 