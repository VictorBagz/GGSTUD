
import React from 'react';
import { Link } from 'react-router-dom';

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray py-12 px-4 sm:px-6 lg:px-8" style={{backgroundImage: "url('https://picsum.photos/seed/signin/1200/800')", backgroundSize: 'cover'}}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-gray">
            Administrator Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your dashboard to manage registrations
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-red focus:border-primary-red focus:z-10 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-red focus:border-primary-red focus:z-10 sm:text-sm" placeholder="Password" />
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
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-red hover:bg-dark-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
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
