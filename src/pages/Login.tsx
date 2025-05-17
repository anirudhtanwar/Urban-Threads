
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { SocialLogin } from "@/components/auth/social-login";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, redirect to home page or the saved redirect path
  useEffect(() => {
    if (user) {
      const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin"); // Clear the saved redirect
      navigate(redirectPath);
    }
  }, [user, navigate]);

  const registerLink = (
    <div>
      Don't have an account?{" "}
      <Link
        to="/register"
        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        Create an account
      </Link>
    </div>
  );
  
  return (
    <AuthLayout title="Sign In" footer={registerLink}>
      <div className="mb-4 text-sm text-center text-gray-600 dark:text-gray-400">
        Sign in to continue shopping and complete your checkout
      </div>
      <LoginForm />
      <SocialLogin />
    </AuthLayout>
  );
};

export default Login;
