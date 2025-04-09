import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import logo from "/src/assets/images/Asset 1.svg";

function SignInPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const images = [
    new URL("/src/assets/images/webdoc.svg", import.meta.url).href,
    new URL("/src/assets/images/webqueue.svg", import.meta.url).href,
    new URL("/src/assets/images/webdash.svg", import.meta.url).href,
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationRef = useRef(null);
  const circlesRef = useRef([]);
  const scrollTimerRef = useRef(null);

  // Check for authentication and redirect if signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  // Auto-change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  // Initialize the floating circles for background animation
  useEffect(() => {
    const initializeCircles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      circlesRef.current = Array(5).fill().map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.min(width, height) * (0.1 + Math.random() * 0.2), // Responsive sizes
        baseSpeedX: (Math.random() - 0.5) * 4,
        baseSpeedY: (Math.random() - 0.5) * 4,
        speedX: 0,
        speedY: 0,
        opacity: 0.1 + Math.random() * 0.15
      }));
    };

    initializeCircles();
    window.addEventListener('resize', initializeCircles);
    return () => window.removeEventListener('resize', initializeCircles);
  }, []);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
    setIsScrolling(true);
    
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    
    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [handleScroll]);

  // Background animation effect
  useEffect(() => {
    const animate = () => {
      const canvas = document.getElementById('background-animation');
      if (!canvas) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circlesRef.current.forEach(circle => {
        const speedMultiplier = isScrolling ? 0.15 : 0.8;
        
        circle.speedX = circle.baseSpeedX * speedMultiplier;
        circle.speedY = circle.baseSpeedY * speedMultiplier;
        
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        // Improved edge handling
        if (circle.x < -circle.size) circle.x = canvas.width + circle.size;
        if (circle.x > canvas.width + circle.size) circle.x = -circle.size;
        if (circle.y < -circle.size) circle.y = canvas.height + circle.size;
        if (circle.y > canvas.height + circle.size) circle.y = -circle.size;

        const gradient = ctx.createRadialGradient(
          circle.x, circle.y, 0,
          circle.x, circle.y, circle.size
        );
        
        gradient.addColorStop(0, `rgba(68, 200, 252, ${circle.opacity})`);
        gradient.addColorStop(0.6, `rgba(68, 200, 252, ${circle.opacity * 2})`);
        gradient.addColorStop(1, 'rgba(68, 163, 252, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isScrolling]);

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <>
      {/* Add global styles inside a <style> tag */}
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}
      </style>

      <div className="flex flex-col w-screen flex-grow relative overflow-hidden bg-light min-h-[100vh]">
        {/* Background Animation Canvas */}
        <canvas 
          id="background-animation" 
          className="fixed top-0 left-0 w-full h-full z-0 opacity-70"
        />

        {/* Navigation Bar */}
        <nav className="flex justify-between items-center w-full pt-5 px-[120px] py-4 relative z-10">
          <div>
            <img src={logo} alt="DoctorAid Logo" className="h-5 w-auto" />
          </div>
          <div className="flex space-x-8 text-[20px] font-light text-gray-700">
            <a href="https://doctoraid.site/" className="hover:text-blue-600">Sign-Up</a>
            <a href="https://doctoraid.site/" className="hover:text-blue-600">About Us</a>
            <a href="https://doctoraid.site/" className="hover:text-blue-600">Contact</a>
          </div>
        </nav>

        {/* Main Content */}
        <div 
          className="flex flex-col md:flex-row flex-grow relative z-10"
          style={{
            transform: `translateY(${Math.min(scrollY * 0.1, 100)}px)`
          }}
        >
          <div className={`md:w-[50%] ml-[125px] w-full flex flex-col justify-center items-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <h1 className="text-3xl mb-10 mt-[65px] font-light text-center">
              Seamless Healthcare Management, Connect with DoctorAid Now!
            </h1>

            <SignIn
                appearance={{
                  variables: {
                    colorPrimary: "#1e40af",
                    colorBackground: "#ffffff",
                    colorInputText: "#333",
                    colorText: "#1e293b",
                    borderRadius: "15px",
                    colorAccent: "#1e40af",
                  }
                }}
                style={{
                  "--clerk-footer-text-color": "#1e40af",
                  "--clerk-footer-background-color": "#e0e7ff",
                }}
                
                // Specify a custom redirect URL for the sign-up link
                signUpUrl="https://doctoraid.site/early-access"
                // Alternatively, for more control use afterSignUpUrl
           
              />
          </div>

          {/* Right side: Click-to-Change Image with Auto Animation */}
          <div
            className={`w-full flex justify-center items-center overflow-hidden cursor-pointer relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            onClick={handleNextImage}
            style={{
              transform: `translateY(${Math.min(scrollY * -0.15, 50)}px)`
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage} 
                src={images[currentImage]}
                alt={`Slide ${currentImage + 1}`}
                className="rounded-[40px] mt-[40px] w-[750px] h-auto object-cover absolute"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 1.05 }} 
                transition={{ duration: 2, ease: "easeInOut" }} 
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Posh Footer Section */}
        <footer className="w-full bg-blue-900 mt-[100px] text-white py-8 relative z-10">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between">
            {/* Brand Info */}
            <div className="mb-6 md:mb-0">
              <img src={logo} alt="DoctorAid Logo" className="h-8 w-auto mb-2" />
              <p className="text-gray-300 text-sm max-w-[300px]">
                Your trusted partner in seamless healthcare management.
              </p>
            </div>

            \

            {/* Contact Information */}
            <div>
              
              <p className="text-gray-300 text-sm flex items-center">
                <Mail className="mr-2 text-blue-300" size={18} /> doctoraid.health@gmail.com
              </p>
              
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm mt-6">
            © {new Date().getFullYear()} DoctorAid. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

export default SignInPage;