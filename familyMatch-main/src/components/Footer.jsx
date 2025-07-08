import React from 'react'
import footerIMG from '/footerIMG.png'

function Footer() {
  return (
      <div className='border'>
          <div className='container pb-4'>
              <h1 className='font-bold text-2xl'>Quick Links</h1>
              <div className='md:flex gap-44 leading-8'>
                  <div>
                      <p>Number 1</p>
                      <p>Number 2</p>
                      <p>Number 3</p>
                      <p>Number 4</p>
                  </div>
                  <div>
                      <p>Number 1</p>
                      <p>Number 2</p>
                      <p>Number 3</p>
                      <p>Number 4</p>
                  </div>
                  <div>
                      <p>Number 1</p>
                  </div>
                  <div>
                      <p>Number 1</p>
                      <p>Number 2</p>
                      <div className='flex gap-2'>
                      </div>

                  </div>
              </div>


          </div>
          <img src={footerIMG} alt="" />
          <div className='w-full h-10 bg-[#98E405] flex justify-center items-center text-white'>
              <p>
                  All Rights are Reserved</p>
          </div>
          
      </div>    
  )
}

export default Footer;