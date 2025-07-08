// utils/validation.js

export const validateInput = (type, value) => {
    if (!value.trim()) return 'This field is required.';

    switch (type) {
        case 'birthday': {
            const date = new Date(value);
            if (isNaN(date)) return 'Invalid date.';
            if (date > new Date()) return 'Birthday cannot be in the future.';
            const age = new Date().getFullYear() - date.getFullYear();
            if (age < 13) return 'You must be at least 13 years old.';
            break;
        }

        case 'name': {
            if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed.';
            if (value.length < 2 || value.length > 50) return 'Name must be 2-50 characters.';
            break;
        }

        case 'email': {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format.';
            break;
        }

        case 'password': {
            if (value.length < 8) return 'Minimum 8 characters.';
            if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter.';
            if (!/[a-z]/.test(value)) return 'Include at least one lowercase letter.';
            if (!/[0-9]/.test(value)) return 'Include at least one number.';
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Include at least one special character.';
            break;
        }
    }

    return ''; // Valid
};
