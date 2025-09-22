
import React from 'react';

const PlayerRegistrationPage: React.FC = () => {
    return (
    <>
        <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-24">
            <h1 className="text-5xl font-extrabold" data-aos="fade-down"><i className="fas fa-user-plus mr-4"></i>Player Registration</h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto" data-aos="fade-up">Register a new player for your school's rugby team.</p>
        </section>

        <div className="py-20 max-w-4xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-2xl" data-aos="fade-up">
                <div className="text-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto flex items-center justify-center mb-4">
                        <i className="fas fa-user text-5xl text-gray-400"></i>
                    </div>
                     <button className="bg-dark-gray text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
                        <i className="fas fa-upload mr-2"></i>Upload Photo
                     </button>
                </div>
                <form className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Player Name *" className="w-full p-3 border border-gray-300 rounded-md"/>
                        <input type="date" placeholder="Date of Birth *" className="w-full p-3 border border-gray-300 rounded-md"/>
                        <input type="number" placeholder="Age *" className="w-full p-3 border border-gray-300 rounded-md"/>
                        <input type="tel" placeholder="Next of Kin Contact *" className="w-full p-3 border border-gray-300 rounded-md"/>
                        <input type="text" placeholder="Learner ID Number (LIN) *" className="w-full p-3 border border-gray-300 rounded-md"/>
                        <select className="w-full p-3 border border-gray-300 rounded-md">
                            <option>Select Class *</option>
                            <option>S1</option>
                            <option>S2</option>
                        </select>
                     </div>
                    <div className="text-center">
                         <button type="submit" className="bg-primary-red text-white font-bold py-3 px-8 rounded-full hover:bg-dark-red transition duration-300">
                             Register Player
                         </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
};

export default PlayerRegistrationPage;