import React, { useEffect, useState,  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../utils/authToken';
import { API_BASE_URL } from '../config';
import { API_KEY } from '../config'


function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    // const apiKey = import.meta.env.VITE_X_API_KEY;

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Login successful!' });
                setFormData({ email: '', password: '' });
                result.data.token && setAuthToken(result.data.token)
                console.log("Token set in localStorage", result.data.token);
                navigate('/profilepage'); // Redirect to profile page
            } else {
                setMessage({ type: 'error', text: result.message || 'Login failed.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }

    };


    return (
        // <div className='border'>
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <Link to="/" className=" hover:text-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        <span className='text-bold text-4xl'>Family</span>Match
                    </h2>
                </Link>


                {message && (
                    <div
                        className={`mb-4 text-sm px-4 py-2 rounded ${message.type === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <div className="mb-4">
                    <div className='gap-4'>
                        <p className='text-4xl font-bold'>Sign in</p>
                        <div className='flex gap-3 my-6'>
                            <p className='font-bold'>Not a Member?</p>
                            <Link to="/signup" className='text-blue-500'>Join</Link>
                        </div>
                    </div>

                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#CD185B] text-white font-semibold py-2 px-4 rounded-4xl hover:bg-[#E32069] transition duration-200"
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </>
           
        // </div>
    );
}

export default LoginForm;
