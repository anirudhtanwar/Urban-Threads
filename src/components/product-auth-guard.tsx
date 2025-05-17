
import { PropsWithChildren, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface ProductAuthGuardProps {
  onConfirm: () => void;
}

export function ProductAuthGuard({ children, onConfirm }: PropsWithChildren<ProductAuthGuardProps>) {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = () => {
    if (!user) {
      setDialogOpen(true);
      return;
    }
    
    // User is authenticated, proceed with action
    onConfirm();
  };

  const handleLogin = () => {
    // Save current URL to redirect back after login
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    navigate("/login");
  };

  return (
    <>
      <div onClick={(e) => {
        e.preventDefault();
        handleAction();
      }}>
        {children}
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign in required</AlertDialogTitle>
            <AlertDialogDescription>
              You need to be signed in to purchase items. Would you like to sign in now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogin}>Sign In</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
