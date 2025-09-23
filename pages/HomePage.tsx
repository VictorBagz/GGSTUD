
import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center text-white text-center">
    <div className="absolute inset-0 bg-black opacity-60"></div>
    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
       <source src="/video/hero-rugby.mp4" type="video/mp4" />
       Your browser does not support the video tag.
    </video>
    <div className="relative z-10 p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">Nurturing Young Rugby Talents</h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl mb-8 animate-fade-in-up">
        The Uganda Schools Rugby Association (USRA) governs and promotes rugby in primary and secondary schools across Uganda, building a strong foundation for the future of the sport.
      </p>
      <div className="space-x-4 animate-fade-in-up">
        <Link to="/registration" className="bg-primary-red hover:bg-dark-red text-white font-bold py-3 px-8 rounded-full transition duration-300">Register Now</Link>
        <Link to="/about" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-black transition duration-300">Learn More</Link>
      </div>
    </div>
  </section>
);

const About = () => (
    <section id="about" className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="About USRA" subtitle="Empowering young athletes through rugby excellence" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-2xl font-bold text-dark-gray mb-4">The USRA Story</h3>
                    <p className="text-gray-600 mb-4">Founded in the late 1990s by passionate educators, USRA began as a grassroots movement to introduce rugby into schools.</p>
                    <p className="text-gray-600">What started with a handful of enthusiastic teams has grown into a nationwide organization overseeing both boys' and girls' rugby across 15s and 7s formats in primary and secondary schools throughout Uganda.</p>
                </div>
                 <div className="rounded-lg overflow-hidden shadow-2xl" data-aos="zoom-in">
                    <img src="/img/about-usra.jpg" alt="USRA Rugby Team" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </section>
);

const ChairmanMessage = () => (
    <section id="chairman" className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
            <div className="grid md:grid-cols-3 gap-8 items-center bg-white p-8 rounded-lg shadow-xl">
                 <div className="md:col-span-1 flex justify-center" data-aos="fade-right">
                     <img src="/img/leadership/okello-dickson.jpg" alt="Chairman Okello Dickson" className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-primary-red"/>
                 </div>
                 <div className="md:col-span-2" data-aos="fade-left">
                     <h2 className="text-3xl font-bold text-dark-gray mb-4">Chairman's Message</h2>
                     <p className="text-gray-600 mb-4 italic">"It is with great pride and excitement that I welcome you to the official website of the Uganda Schools Rugby Association (USRA). This platform marks a significant milestone in our journey to grow, promote, and professionalize school rugby across Uganda."</p>
                     <div>
                         <p className="font-bold text-dark-gray">Okello Dickson</p>
                         <p className="text-sm text-gray-500">Chairman, Uganda Schools Rugby Association</p>
                     </div>
                 </div>
            </div>
        </div>
    </section>
);

const Statistics = () => (
    <section id="statistics" className="py-20 bg-dark-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
            <SectionHeader title="Our Impact" subtitle="Numbers that tell our story" />
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="p-4" data-aos="zoom-in" data-aos-delay="0">
                    <i className="fas fa-school text-4xl text-secondary-yellow mb-2"></i>
                    <p className="text-4xl font-bold">150+</p>
                    <p className="text-gray-400">Member Schools</p>
                </div>
                 <div className="p-4" data-aos="zoom-in" data-aos-delay="100">
                    <i className="fas fa-user-friends text-4xl text-secondary-yellow mb-2"></i>
                    <p className="text-4xl font-bold">2500+</p>
                    <p className="text-gray-400">Registered Players</p>
                </div>
                 <div className="p-4" data-aos="zoom-in" data-aos-delay="200">
                    <i className="fas fa-trophy text-4xl text-secondary-yellow mb-2"></i>
                    <p className="text-4xl font-bold">25+</p>
                    <p className="text-gray-400">Annual Tournaments</p>
                </div>
                 <div className="p-4" data-aos="zoom-in" data-aos-delay="300">
                    <i className="fas fa-calendar-alt text-4xl text-secondary-yellow mb-2"></i>
                    <p className="text-4xl font-bold">15+</p>
                    <p className="text-gray-400">Years of Excellence</p>
                </div>
             </div>
        </div>
    </section>
);

const Gallery = () => {
    const images = Array.from({ length: 6 }, (_, i) => `/img/gallery/gallery-${i + 1}.jpg`);
    
    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
                <SectionHeader title="Photo Album" subtitle="Student rugby players in action" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((src, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300" data-aos="zoom-in" data-aos-delay={index * 50}>
                            <img src={src} alt={`Rugby action ${index+1}`} className="w-full h-full object-cover"/>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <Link to="/photos" className="bg-primary-red hover:bg-dark-red text-white font-bold py-3 px-8 rounded-full transition duration-300">View All Collections</Link>
                 </div>
            </div>
        </section>
    )
};

const Contact = () => (
    <section id="contact" className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Contact Us" subtitle="Get in touch with the USRA team" />
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg" data-aos="fade-right">
                    <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4 text-gray-600">
                        <p><i className="fas fa-map-marker-alt text-primary-red w-6"></i> Lugogo Tennis Club, Kampala</p>
                        <p><i className="fas fa-phone text-primary-red w-6"></i> +256 783 562 222 (Chairman)</p>
                        <p><i className="fas fa-phone text-primary-red w-6"></i> +256 788 378 660 (Gen. Secretary)</p>
                        <p><i className="fas fa-envelope text-primary-red w-6"></i> usrasecretariat@gmail.com</p>
                    </div>
                </div>
                 <div className="bg-white p-8 rounded-lg shadow-lg" data-aos="fade-left">
                    <h3 className="text-xl font-bold mb-4">Send a Message</h3>
                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-red focus:border-primary-red"/>
                        <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-red focus:border-primary-red"/>
                        <textarea placeholder="Your Message" rows={4} className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary-red focus:border-primary-red"></textarea>
                        <button type="submit" className="w-full bg-primary-red text-white font-bold py-3 px-6 rounded-md hover:bg-dark-red transition duration-300">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
);


const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <ChairmanMessage />
      <Statistics />
      <Gallery />
      <Contact />
    </>
  );
};

export default HomePage;