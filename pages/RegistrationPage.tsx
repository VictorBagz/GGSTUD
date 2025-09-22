
// This component is a placeholder for the complex multi-step form.
// A full implementation would require extensive state management for form fields, validation, and step transitions.
import React from 'react';

const RegistrationPage: React.FC = () => {
  return (
    <>
        <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-24">
            <h1 className="text-5xl font-extrabold">School Registration</h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto">Join the Uganda Schools Rugby Association and become part of the growing rugby community.</p>
        </section>

        <div className="py-20 max-w-4xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-primary-red mb-8">Registration Form</h2>
                <form className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold border-b pb-2 mb-4">School Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="School Name *" className="w-full p-3 border border-gray-300 rounded-md"/>
                            <input type="text" placeholder="School Centre Number *" className="w-full p-3 border border-gray-300 rounded-md"/>
                            <input type="email" placeholder="School Email *" className="w-full p-3 border border-gray-300 rounded-md"/>
                            <input type="tel" placeholder="Primary Contact *" className="w-full p-3 border border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div>
                         <h3 className="text-lg font-semibold border-b pb-2 mb-4">School Representative Information</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name *" className="w-full p-3 border border-gray-300 rounded-md"/>
                            <input type="text" placeholder="National ID (NIN) *" className="w-full p-3 border border-gray-300 rounded-md"/>
                            <input type="text" placeholder="Role/Position *" className="w-full p-3 border border-gray-300 rounded-md"/>
                            <input type="password" placeholder="Create a Password *" className="w-full p-3 border border-gray-300 rounded-md"/>
                         </div>
                    </div>
                    <div className="text-center">
                         <button type="submit" className="bg-primary-red text-white font-bold py-3 px-8 rounded-full hover:bg-dark-red transition duration-300">
                             Submit Registration
                         </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  );
};

export default RegistrationPage;
