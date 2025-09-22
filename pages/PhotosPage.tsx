import React from 'react';

const collections = [
    { title: 'Tournament 2024', description: 'Inter-school championship matches, finals, and trophy ceremonies.', count: '150+', date: 'December 2024', icon: 'fa-trophy' },
    { title: 'Training Sessions', description: 'Behind-the-scenes training sessions and skill development.', count: '80+', date: 'November 2024', icon: 'fa-running' },
    { title: 'Award Ceremonies', description: 'Prize giving ceremonies and recognition events.', count: '60+', date: 'December 2024', icon: 'fa-medal' },
    { title: 'Team Events', description: 'Social events, team building, and community outreach.', count: '120+', date: 'October 2024', icon: 'fa-users' },
    { title: 'School Visits', description: 'USRA officials visiting member schools and coaching clinics.', count: '90+', date: 'September 2024', icon: 'fa-school' }
];

const PhotoCollectionCard: React.FC<typeof collections[0] & { 'data-aos-delay'?: string }> = ({ title, description, count, date, icon, ...props }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 border-primary-red" data-aos="fade-up" {...props}>
        <div className="text-4xl text-primary-red mb-4">
            <i className={`fas ${icon}`}></i>
        </div>
        <h3 className="text-xl font-bold text-dark-gray mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="w-full flex justify-between text-sm text-gray-500 mb-4">
            <span><i className="fas fa-images mr-1"></i> {count} Photos</span>
            <span><i className="fas fa-calendar mr-1"></i> {date}</span>
        </div>
        <a href="#" className="w-full text-center bg-dark-gray text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
            <i className="fab fa-google mr-2"></i> View on Google Photos
        </a>
    </div>
);


const PhotosPage: React.FC = () => {
    return (
        <>
            <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-24">
                <h1 className="text-5xl font-extrabold" data-aos="fade-down">Photo Collections</h1>
                <p className="mt-4 text-xl max-w-3xl mx-auto" data-aos="fade-up">Explore our complete collection of USRA rugby photos from tournaments, training sessions, ceremonies, and team events.</p>
            </section>

            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {collections.map((collection, index) => (
                            <PhotoCollectionCard key={collection.title} {...collection} data-aos-delay={`${index * 100}`} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhotosPage;