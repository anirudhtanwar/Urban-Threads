import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Check, Mail, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  
  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  const passwordStrength = 
    hasMinLength && hasLowercase && hasUppercase && hasNumber
      ? "strong"
      : hasMinLength && (hasLowercase || hasUppercase) && hasNumber
      ? "medium"
      : password.length > 0
      ? "weak"
      : "";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const { error } = await signUp(email, password, {
        full_name: fullName,
        username: email.split('@')[0], // Simple username from email
      });
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message || "Failed to create account",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now sign in.",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="first-name">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {password && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 flex gap-1">
                  <div 
                    className={`h-full flex-1 rounded-full transition-colors ${
                      passwordStrength === "weak" 
                        ? "bg-red-500"
                        : passwordStrength === "medium"
                        ? "bg-yellow-500"
                        : passwordStrength === "strong"
                        ? "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                  <div 
                    className={`h-full flex-1 rounded-full transition-colors ${
                      passwordStrength === "medium" || passwordStrength === "strong"
                        ? passwordStrength === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                  <div 
                    className={`h-full flex-1 rounded-full transition-colors ${
                      passwordStrength === "strong"
                        ? "bg-green-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                </div>
                
                <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <span className={`mr-1 ${hasMinLength ? "text-green-500" : ""}`}>
                      {hasMinLength ? <Check className="h-3 w-3" /> : "•"}
                    </span>
                    At least 8 characters
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-1 ${hasLowercase && hasUppercase ? "text-green-500" : ""}`}>
                      {hasLowercase && hasUppercase ? <Check className="h-3 w-3" /> : "•"}
                    </span>
                    Mix of uppercase & lowercase letters
                  </li>
                  <li className="flex items-center">
                    <span className={`mr-1 ${hasNumber ? "text-green-500" : ""}`}>
                      {hasNumber ? <Check className="h-3 w-3" /> : "•"}
                    </span>
                    At least one number
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {password && confirmPassword && (
              <div className="mt-1.5">
                {password === confirmPassword ? (
                  <p className="text-xs flex items-center text-green-600">
                    <Check className="h-3 w-3 mr-1" /> Passwords match
                  </p>
                ) : (
                  <p className="text-xs text-red-500">Passwords don't match</p>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="rounded border-gray-300"
              required
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          
          <Button type="submit" variant="nohover" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" disabled>
              Google
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Apple
            </Button>
          </div>
        </div>
        
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
