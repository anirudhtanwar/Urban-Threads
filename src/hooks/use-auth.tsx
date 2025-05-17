
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
// import { toast } from "sonner"; - Removing toast import to prevent notifications

// Define the Auth context type
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    user: User | null;
    error: Error | null;
  }>;
  signUp: (email: string, password: string, options?: { full_name?: string; username?: string }) => Promise<{
    user: User | null;
    error: Error | null;
  }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{
    success: boolean;
    error: Error | null;
  }>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Removed toast notification here
      }
    );

    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Don't show toast notification on success
      return { user: data?.user || null, error: null };
    } catch (error) {
      console.error("Error signing in:", error);
      return { user: null, error: error as Error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, options?: { full_name?: string; username?: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options
        }
      });

      if (error) {
        throw error;
      }

      // Don't show toast notification on success
      return { user: data?.user || null, error: null };
    } catch (error) {
      console.error("Error signing up:", error);
      return { user: null, error: error as Error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // Don't show toast notification on signout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });

      if (error) {
        throw error;
      }

      return { success: true, error: null };
    } catch (error) {
      console.error("Error resetting password:", error);
      return { success: false, error: error as Error };
    }
  };

  // Show a loading state while we're initializing
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Provide the auth context value
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
