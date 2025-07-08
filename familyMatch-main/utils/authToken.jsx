// src/utils/authToken.js

const TOKEN_KEY = 'authToken';

export const setAuthToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};
