
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  schoolId: string | null;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChange is called immediately with the current session,
    // so we don't need a separate getSession() call. This avoids race conditions.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          try {
            const { data, error } = await supabase
              .from('schools')
              .select('id')
              .eq('user_id', currentUser.id)
              .single();
            
            if (error && error.code !== 'PGRST116') { // Ignore if profile not found yet
              console.error("Could not fetch school for user", error.message);
            }
            setSchoolId(data?.id || null);
          } catch (e) {
            console.error("Error fetching schoolId on auth change", e);
            setSchoolId(null);
          }
        } else {
          setSchoolId(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    schoolId,
    logout,
    signUp,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};