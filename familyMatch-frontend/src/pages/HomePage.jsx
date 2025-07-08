import React from 'react'
import HeroSection from '../components/HeroSection';
import AboutUsSection from '../components/AboutUsSection';
import FamilySection from '../components/familySection';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Link } from 'react-router-dom';


function HomePage() {

  return (
    <div className='bg-[#EDFEFF]'>
    <HeroSection/>
      {/* <AboutUsSection/> */}
    <FamilySection/>
          <div className="container flex flex-col items-center text-center space-y-4 mb-20">
              <p className='font-bold'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat iure doloribus deserunt ipsam at nisi dignissimos<br />
                  dicta voluptates quibusdam, pariatur, rem debitis laboriosam assumenda <br />
                  ducimus odio magni vero doloremque eligendi.
              </p>
        <Link to="/search">
          <Button variant='primary' className='px-14'>
            Click here to find your Family's Match! &rarr;
          </Button>
        </Link>
          </div>
    <Footer/>
    </div>
  )
}

export default HomePage;