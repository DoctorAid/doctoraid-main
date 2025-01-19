import { SignIn } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignInPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      useNavigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}

export default SignInPage;
