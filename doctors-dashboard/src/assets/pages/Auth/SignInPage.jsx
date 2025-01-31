import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    
    <div className="flex flex-col md:flex-row h-100vh w-screen ">
      
      {/* Left side: Clerk Login */}
      
      <div className="md:w-[30%] ml-[125px]  w-full flex justify-center items-center">
         
      <SignIn
          appearance={{
            variables: {
              colorPrimary: "#1e40af", // Primary button color (blue)
              colorBackground: "#ffffff",
              colorInputText: "#333", // Input text color
              colorText: "#1e293b", // General text color
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

      {/* Right side: Click-to-Change Image */}
      <div
        className="md:w-[70%] w-full flex justify-center items-center overflow-hidden cursor-pointer"
        onClick={handleNextImage}
      >
        <img
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
          className=" rounded-[30px] mt-[40px] w-[800px] h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default SignInPage;
