import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeAuthToken, getAuthToken } from '../../utils/authToken'
import Button from "./Button";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("authToken");
    const token = getAuthToken();
    console.log("Token:", token);
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    removeAuthToken();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <header className=" container inse-0 bg-white-200 m-6  px-10 flex items-center justify-between">
        <div className="text-2xl text-white font-bold">
          FamilyMatch
        </div>

        {/* <nav className="space-x-6 hidden md:flex text-white text-xl">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">About</a>
          <a href="#" className="hover:text-blue-600">Services</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </nav> */}

        <div className="justify-between py-8 hidden md:flex">
          <div className="flex gap-2">
            {isLoggedIn ? (
              <>
              {/* profile */}
                <Link to="/profilepage">
                  <Button variant="secondary">PROFILE</Button>
                </Link>
              {/* <button
                onClick={() => navigate("/profilepage")}
                className="border-2 px-8 py-1 rounded-3xl text-white hover:opacity-80"
              >
                PROFILE
              </button> */}
                {/* <button
                  onClick={handleLogout}
                  className="border-2 px-8 py-1 rounded-3xl text-white hover:opacity-80"
                >
                  LOGOUT
                </button> */}
                {/* <Link to="/profilepage"> */}
                  <Button 
                  onClick={handleLogout}
                  variant="secondary">LOG OUT</Button>
                {/* </Link> */}
              </>

            ) : (
              <>
                <Link to="/login">
                 <Button variant="secondary">MEMBER LOGIN</Button> 
                </Link>
                <Link to="/signup">
                  {/* <button className="border-[#CD185B] px-8 py-1 rounded-3xl bg-[#CD185B] text-white hover:opacity-80">
                    REGISTER
                  </button> */}
                  <Button variant="primary">
                      REGISTER
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-6 mr-12 w-50 bg-white shadow-lg rounded-lg z-50">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Services</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</a>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-1 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <div className="px-4 py-2 text-gray-700 hover:bg-gray-100">Login</div>
                  </Link>
                  <Link to="/signup">
                    <div className="px-4 py-2 text-gray-700 hover:bg-gray-100">Register</div>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
