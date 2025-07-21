# Global Alert System

This utility provides a centralized way to show alerts throughout your app using react-hot-toast.

## Usage

### Import the functions
```javascript
import { showAlert, showSuccessAlert, showErrorAlert, showInfoAlert } from '../utils/alertUtils';
```

### Basic Usage

#### Method 1: Using the main showAlert function
```javascript
// Success alert
showAlert('success', 'Operation completed successfully!');

// Error alert
showAlert('error', 'Something went wrong!');

// Info alert (default)
showAlert('info', 'This is an information message');
```

#### Method 2: Using specific helper functions
```javascript
// Success alerts
showSuccessAlert('Profile updated successfully!');

// Error alerts
showErrorAlert('Failed to save changes');

// Info alerts
showInfoAlert('Please wait while we process your request');
```

### Examples in Components

#### API Calls
```javascript
const handleSubmit = async () => {
  try {
    const response = await axios.post('/api/endpoint', data);
    showSuccessAlert('Data saved successfully!');
  } catch (error) {
    showErrorAlert('Failed to save: ' + error.message);
  }
};
```

#### Form Validation
```javascript
const validateForm = () => {
  if (!email) {
    showErrorAlert('Email is required');
    return false;
  }
  if (!password) {
    showErrorAlert('Password is required');
    return false;
  }
  return true;
};
```

#### User Actions
```javascript
const handleLike = () => {
  showSuccessAlert('You liked this profile! ❤️');
};

const handleWink = () => {
  showSuccessAlert('You winked at this user! 😉');
};
```

## Benefits

1. **Consistent styling** - All alerts use the same toast configuration
2. **Easy to maintain** - Change alert behavior in one place
3. **Type safety** - Clear function names for different alert types
4. **Reusable** - Import and use anywhere in your app
5. **Flexible** - Multiple ways to show alerts based on your needs 