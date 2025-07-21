import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { getAuthToken } from '../../utils/authToken';
import pic from '/images/coupleImage.jpg';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      navigate('/profilepage');
    }
    console.log('token in login.jsx', token);
  }, [navigate]);

  return (

    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
              style={{ backgroundImage: "url('/images/coupleImage.jpg')" }}
    >
      {/* Your content here */}
      <LoginForm />

    </div>

  );
}

export default Login;
