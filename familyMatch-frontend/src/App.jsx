import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ProfileForm from './components/ProfileForm'
// import SignupForm from './components/SignupForm';
import ApiTesting from './components/ApiTesting';
import ImageUploader from './components/ImageUploader';
import ProfilePage from './pages/ProfilePage';
import PublicProfilePage from './pages/PublicProfilePage';
import LoginForm from './components/LoginForm';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SearchListingPage from './pages/SearchListingPage';
import { Toaster, toast } from 'react-hot-toast';

// Global toaster function
const toaster = (status, message) => {
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

// Make toaster globally available
window.toaster = toaster;

function App() {

  return (

    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage/>} />
        {/* <Route path="/signup" element={<ProfileForm/>} /> */}
        <Route path="/publicview" element={<PublicProfilePage/>} />
        <Route path="/publicview/:id" element={<PublicProfilePage />} />

        {/* <Route path="/login" element={<LoginForm/>} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/Profilepage" element={<ProfilePage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/testing" element={<ApiTesting/>} />
        <Route path="/search" element={<SearchListingPage/>} />


      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  )
}

export default App
