import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Use Supabase v2 API for sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) throw signInError;
      if (!data.user) throw new Error("Authentication failed.");
      
      const { data: schoolResponse, error: dbError } = await supabase
        .from('schools')
        .select('id')
        .eq('user_id', data.user.id)
        .single();
        
      if (dbError) throw dbError;

      if (schoolResponse) {
        navigate(`/profile/${schoolResponse.id}`);
      } else {
        setError("Sign in successful, but no school profile found for this user.");
        await supabase.auth.signOut();
      }

    } catch (e: any) {
      setError(e.message || "Failed to sign in. Please check your credentials.");
      console.error("Sign in failed:", e);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray py-12 px-4 sm:px-6 lg:px-8" style={{backgroundImage: "url('./img/signin-background.jpg')", backgroundSize: 'cover'}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl z-10" data-aos="zoom-in">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-gray">
            Administrator Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your dashboard to manage registrations
          </p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email"
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-red focus:border-primary-red focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-red focus:border-primary-red focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-red hover:text-dark-red">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-red hover:bg-dark-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {isLoading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : 'Sign in'}
            </button>
          </div>
        </form>
         <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/registration" className="font-medium text-primary-red hover:text-dark-red">
              Register your school
            </Link>
          </p>
      </div>
    </div>
  );
};

export default SignInPage;