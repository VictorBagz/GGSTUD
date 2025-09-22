
import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
    return (
        <>
            <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-24">
                <div className="text-5xl mb-4" data-aos="zoom-in"><i className="fas fa-check-circle"></i></div>
                <h1 className="text-4xl font-extrabold" data-aos="fade-down">Registration Successful!</h1>
                <p className="mt-4 text-xl" data-aos="fade-up">Your school registration is under review.</p>
            </section>
            <div className="py-12 bg-light-gray">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg space-y-8" data-aos="fade-right">
                        <div>
                            <h3 className="text-xl font-bold text-primary-red border-b pb-2 mb-4">School Information</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                                <p><strong>School Name:</strong> Example High School</p>
                                <p><strong>Centre Number:</strong> U001</p>
                                <p><strong>Email:</strong> school@example.com</p>
                                <p><strong>Contact:</strong> +256 700 000 000</p>
                                <p><strong>Region:</strong> Central</p>
                                <p><strong>District:</strong> Kampala</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-primary-red border-b pb-2 mb-4">Representative Information</h3>
                             <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                                <p><strong>Full Name:</strong> John Doe</p>
                                <p><strong>Role:</strong> Sports Coordinator</p>
                             </div>
                        </div>
                         <div>
                            <h3 className="text-xl font-bold text-primary-red border-b pb-2 mb-4">Registered Players</h3>
                            <p className="text-gray-500 italic">No players registered yet.</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-left" data-aos-delay="100">
                            <h3 className="font-bold mb-2">Registration Status</h3>
                            <p className="text-yellow-500 font-semibold"><i className="fas fa-clock mr-2"></i>Under Review</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-left" data-aos-delay="200">
                            <h3 className="font-bold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link to="/player-registration" className="block w-full text-center bg-primary-red text-white font-bold py-2 px-4 rounded-lg hover:bg-dark-red transition duration-300">
                                    <i className="fas fa-user-plus mr-2"></i>Register Player
                                </Link>
                                 <Link to="/registration" className="block w-full text-center bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
                                    Register Another School
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;