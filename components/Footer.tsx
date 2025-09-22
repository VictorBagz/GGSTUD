
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-gray text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <img className="h-12 w-auto" src="https://picsum.photos/seed/logo/200/200" alt="USRA Logo" />
              <span className="text-white font-bold text-xl">USRA</span>
            </div>
            <p className="text-sm">Developing the future of rugby in Uganda through school sports excellence.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-base text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/events" className="text-base text-gray-300 hover:text-white">Events</Link></li>
              <li><Link to="/leadership" className="text-base text-gray-300 hover:text-white">Leadership</Link></li>
              <li><Link to="/registration" className="text-base text-gray-300 hover:text-white">Registration</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Tournament Manual</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Accountability Form</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">USRA Constitution</a></li>
               <li><Link to="/medical-fund" className="text-base text-gray-300 hover:text-white">Athletes Medical Fund</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-base">
                <li className="flex items-start"><i className="fas fa-map-marker-alt mt-1 mr-2 text-primary-red"></i><span>Lugogo Tennis Club, Kampala</span></li>
                <li className="flex items-center"><i className="fas fa-phone mr-2 text-primary-red"></i><span>+256 783 562 222</span></li>
                <li className="flex items-center"><i className="fas fa-envelope mr-2 text-primary-red"></i><span>usrasecretariat@gmail.com</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Uganda Schools Rugby Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
