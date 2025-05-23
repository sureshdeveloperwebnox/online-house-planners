import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedText = () => {
  const headingRef = useRef(null);
  const serviceRefs = useRef([]);

  useEffect(() => {
    // Animation for the main heading
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animation for each service item
    gsap.from(serviceRefs.current, {
      y: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.5,
      ease: "back.out(1.7)"
    });
  }, []);

  // Add service items to ref array
  const addToRefs = (el) => {
    if (el && !serviceRefs.current.includes(el)) {
      serviceRefs.current.push(el);
    }
  };

  const services = [
    {
      title: "Custom Home Design",
      description: "Tailored floor plans designed to your exact specifications and lifestyle needs."
    },
    {
      title: "3D Visualization",
      description: "Interactive 3D models that bring your future home to life before construction begins."
    },
    {
      title: "Space Planning",
      description: "Optimized room layouts for maximum functionality and flow in your living spaces."
    },
    {
      title: "Renovation Planning",
      description: "Transform existing spaces with creative redesigns that respect your home's structure."
    },
    {
      title: "Permit-Ready Plans",
      description: "Professional blueprints that meet all local building codes and regulations."
    },
    {
      title: "Virtual Consultations",
      description: "Remote planning sessions with our expert architects from the comfort of your home."
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <div className="text-center mb-16">
        <div className="group relative inline-block p-4 md:p-6 hover:shadow-lg transition-all duration-300 rounded-lg">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-gray-800 relative font-poppins"
          >
            <span className="relative z-10">Our Services</span>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </h2>
        </div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Transforming your vision into buildable reality with innovative digital solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {services.map((service, index) => (
          <div 
            key={index}
            ref={addToRefs}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3 font-poppins">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <div className="mt-4 h-1 w-20 bg-blue-500 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedText;