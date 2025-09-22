
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/events', text: 'Events' },
    { to: '/about', text: 'About' },
    {
      text: 'More',
      dropdown: [
        { to: '/leadership', text: 'Leadership' },
        { to: '/workplan', text: 'Workplan 2025' },
        { to: '/medical-fund', text: 'Medical Fund' },
        { to: '/photos', text: 'Photos' },
      ],
    },
    { to: '/contact', text: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-dark-gray shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img className="h-12 w-auto" src="https://picsum.photos/seed/logo/200/200" alt="USRA Logo" />
              <span className="text-white font-bold text-xl hidden md:block">USRA</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.text} className="relative group">
                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                      {link.text} <i className="fas fa-chevron-down ml-1"></i>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                      {link.dropdown.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`
                          }
                        >
                          {item.text}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary-red text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                    }
                  >
                    {link.text}
                  </NavLink>
                )
              )}
               <Link to="/registration" className="bg-primary-red text-white hover:bg-dark-red px-4 py-2 rounded-full text-sm font-bold transition duration-300">
                Register School
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-dark-gray">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.text}>
                    <p className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">{link.text}</p>
                    {link.dropdown.map(item => (
                         <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                            `block pl-6 pr-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary-red text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                            }
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary-red text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                  }
                >
                  {link.text}
                </NavLink>
              )
            )}
            <Link to="/registration" className="block w-full text-center bg-primary-red text-white hover:bg-dark-red px-4 py-3 rounded-md text-base font-bold transition duration-300 mt-2">
                Register School
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
