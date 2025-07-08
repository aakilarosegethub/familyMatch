import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import image from '/images/picture.jpg'

function AboutUsSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5, // Animation triggers when 50% of the section is visible
    });

    return (
        <section className=" relative mt-14 py-20 px-6 bg-gradient-to-r from-[#5BCD18] to-[#CD185B] text-white overflow-hidden m-4 rounded-4xl ">
            <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 ">
                {/* Text Content */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="space-y-6"
                >
                    <h2 className="text-5xl font-bold leading-tight text-white">
                        Who <span className="text-purple-100">We Are</span>
                    </h2>
                    <p className="text-xl text-white opacity-90">
                        We are a forward-thinking team of innovators, building digital experiences that make a difference.
                    </p>
                    <p className="text-lg text-white opacity-80">
                        With design, technology, and strategy, we empower brands to connect with their audiences in new, meaningful ways.
                    </p>

                    <button className="mt-8 py-3 px-8 bg-white text-purple-600 rounded-full shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl focus:outline-none">
                        Discover More
                    </button>
                </motion.div>

                {/* Image or Illustration */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="relative w-full"
                >
                    
                        <img style={{
                            borderRadius: "87% 13% 70% 26% / 65% 46% 25% 25%",
                        }} src={image} alt="" />
                </motion.div>
            </div>
        </section>
    );
}

export default AboutUsSection;
