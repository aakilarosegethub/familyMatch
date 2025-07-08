import React from 'react'
// import photo from '/images/picture.jpg'
import family1 from '/images/family1.jpg'
import family2 from '/images/family2.jpg'


// import photo3 from '/images/picture2.jpg';
import photo3 from '/images/familycombine.jpg';

import whiteCircle from '/whiteCircle.png';
import downarrow from '/downarrow.png';
import topImg from '/topImg.png';
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: custom, duration: 0.6, ease: 'easeOut' },
    }),
};

function familySection() {
  return (
      <div className='container relative min-h-[1050px] overflow-hidden px-4'>

          {/* Heading & Subtitle */}
          <motion.div
              className='flex flex-col items-center text-center space-y-4 mt-32'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              custom={0.1}
          >
              <h1 className='text-2xl sm:text-3xl font-bold text-[#4E94B6]'>
                  Bringing Compatible Families Together
              </h1>
              <p className='font-bold text-sm sm:text-base'>
                  Let us match your family with others like yours,<br />
                  or different than yours!
              </p>
          </motion.div>

          {/* How it Works */}
          <motion.div
              className='flex justify-center mt-10'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              custom={0.3}
          >
              <h1 className='text-xl sm:text-2xl font-bold text-[#4E94B6]'>HOW IT WORKS</h1>
          </motion.div>

          <div className="relative w-full flex justify-center">

              {/* Background Layer with Circles */}
              <div className="w-full absolute top-4">
                  <div className="relative flex justify-center items-center h-[500px] sm:h-[600px]">

                      {/* Left Circle */}
                      <motion.div
                          className="absolute left-4 sm:left-[320px]  sm:top-60 -translate-y-1/2"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }}
                          variants={fadeInUp}
                          custom={0.4}
                      >
                          <img
                              src={family2}
                              className="w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full object-cover border-4 border-[#3095C8]"
                              alt="Left Circle"
                          />
                      </motion.div>

                      {/* Center Circle */}
                      <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.1 }}
                          variants={fadeInUp}
                          custom={0}
                      >
                          <img
                              src={whiteCircle}
                              className="w-[250px] sm:w-[420px] h-[250px] sm:h-[420px]"
                              alt="Center Circle"
                          />
                      </motion.div>

                      {/* Right Circle */}
                      <motion.div
                          className="absolute right-4    sm:right-[320px] sm:top-60 -translate-y-1/2"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.3 }}
                          variants={fadeInUp}
                          custom={0.8}
                      >
                          <img
                              src={family1}
                              className="w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full object-cover border-4 border-[#3095C8]"
                              alt="Right Circle"
                          />
                      </motion.div>
                  </div>
              </div>

              {/* Top icons (arrows and image) */}
              <motion.div
                  className="absolute top-[0px] left-1/2 -translate-x-1/2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  custom={1}
              >
                  <div className='flex gap-8 sm:gap-32 justify-center items-center'>
                      <div className='w-6 pt-8 sm:pt-12'>
                          <img src={downarrow} alt="" />
                      </div>
                      <div className='w-24 sm:w-40'>
                          <img src={topImg} alt="" />
                      </div>
                      <div className='w-6 pt-8 sm:pt-12'>
                          <img src={downarrow} alt="" />
                      </div>
                  </div>
              </motion.div>

              {/* Bottom Image */}
              <motion.img
                  src={photo3}
                  alt="Custom Shaped"
                  className="absolute top-[420px] sm:top-[450px] w-[90%] sm:w-[700px] h-[150px] sm:h-[220px] border-4 border-[#3095C8] object-cover"
                  style={{ borderRadius: '30% 30% 30% 30% / 30% 30% 30% 30%' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeInUp}
                  custom={1.2}
              />
          </div>
      </div>
  );
}

export default familySection;
