import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react"; // Import Lucide icons
import logo from "/src/assets/images/Asset 1.svg";

function SignInPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const images = [
    new URL("/src/assets/images/Login UI Post 01.jpg", import.meta.url).href,
    new URL("/src/assets/images/Login UI Post 02.jpg", import.meta.url).href,
    new URL("/src/assets/images/Login UI Post 03.jpg", import.meta.url).href,
  ];

  const [currentImage, setCurrentImage] = useState(0);

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

      <div className="flex flex-col w-screen flex-grow">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center w-full pt-5 px-[120px] py-4">
          <div>
            <img src={logo} alt="DoctorAid Logo" className="h-5 w-auto" />
          </div>
          <div className="flex space-x-8 text-[20px] font-light text-gray-700">
            <a href="https://doctoraid.site/" className="hover:text-blue-600">Sign-Up</a>
            <a href="/about" className="hover:text-blue-600">About Us</a>
            <a href="/contact" className="hover:text-blue-600">Contact</a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row flex-grow">
          <div className="md:w-[50%] ml-[125px] w-full flex flex-col justify-center items-center">
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
                },
              }}
              style={{
                "--clerk-footer-text-color": "#1e40af",
                "--clerk-footer-background-color": "#e0e7ff",
              }}
            />
          </div>

          {/* Right side: Click-to-Change Image with Auto Animation */}
          <div
            className="w-full flex justify-center items-center overflow-hidden cursor-pointer relative"
            onClick={handleNextImage}
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
        <footer className="w-full bg-blue-900 mt-[100px] text-white py-8">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between">
            {/* Brand Info */}
            <div className="mb-6 md:mb-0">
              <img src={logo} alt="DoctorAid Logo" className="h-8 w-auto mb-2" />
              <p className="text-gray-300 text-sm max-w-[300px]">
                Your trusted partner in seamless healthcare management.
              </p>
            </div>

            {/* Quick Links */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li><a href="/services" className="hover:text-blue-300">Services</a></li>
                <li><a href="/pricing" className="hover:text-blue-300">Pricing</a></li>
                <li><a href="/faq" className="hover:text-blue-300">FAQs</a></li>
                <li><a href="/contact" className="hover:text-blue-300">Contact</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-300 text-sm flex items-center">
                <Phone className="mr-2 text-blue-300" size={18} /> +1 234 567 890
              </p>
              <p className="text-gray-300 text-sm flex items-center">
                <Mail className="mr-2 text-blue-300" size={18} /> support@doctoraid.com
              </p>

              {/* Social Media Links */}
              <div className="flex space-x-4 mt-3">
                <a href="https://facebook.com" className="text-gray-300 hover:text-blue-300">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com" className="text-gray-300 hover:text-blue-300">
                  <Twitter size={20} />
                </a>
                <a href="https://linkedin.com" className="text-gray-300 hover:text-blue-300">
                  <Linkedin size={20} />
                </a>
              </div>
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
