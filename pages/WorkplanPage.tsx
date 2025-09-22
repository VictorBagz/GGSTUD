import React from 'react';

const workplanData = [
    { month: 'Jan', date: '15', title: 'EXCOM Annual Planning Meeting', body: 'Responsible Body: EXCOM' },
    { month: 'Feb-Apr', date: '23-06', title: 'Ball Game One Qualifiers', body: 'Covers multiple leagues including Central, Eastern, Western, and Northern regions for both boys and girls.' },
    { month: 'Apr', date: '6-13', title: 'Regional Evaluation Meetings', body: 'Evaluation of Ball Game One Qualifiers. Responsible: Regional Representatives.' },
    { month: 'Apr', date: '19', title: 'Ball Games One & Two Planning', body: 'Evaluation and planning meeting. Responsible Body: EXCOM' },
    { month: 'May', date: '4-14', title: 'USSSA National Ball Game One', body: 'National championship for qualified schools.' },
    { month: 'Jun', date: '8-29', title: 'Ball Game Two Qualifiers', body: '7s tournaments including Kabaka Coronation, Kyabazinga, Won Nyaci, and Rwot Adwong cups.' },
    { month: 'Jul', date: '5', title: 'Ball Game Two & AGM Planning', body: 'Evaluation of qualifiers and AGM planning. Responsible Body: EXCOM.' },
    { month: 'Jul', date: '9-18', title: 'USSSA National Ball Game Two', body: 'National 7s championship.' },
    { month: 'Aug', date: '19-27', title: 'FEASSA Games', body: 'Federation of East African Secondary Schools Sports Association games.' },
    { month: 'Sep', date: '6', title: 'Annual General Meeting', body: 'Responsible Body: EXCOM' },
    { month: 'Oct', date: '9', title: 'Independence Cup', body: 'Tournament celebrating Uganda\'s independence.' },
    { month: 'Dec', date: '14-20', title: 'Abu Dhabi World Schools Festival', body: 'International exposure for the U20 select team.' },
];

const WorkplanPage: React.FC = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-24">
        <h1 className="text-5xl font-extrabold" data-aos="fade-down">USRA Workplan 2025</h1>
        <p className="mt-4 text-xl max-w-3xl mx-auto" data-aos="fade-up">Comprehensive Activity Calendar for 2025</p>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-primary-red mb-12" data-aos="fade-up">2025 at a Glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
                <div className="p-4 bg-white shadow-lg rounded-lg" data-aos="zoom-in" data-aos-delay="0"><div className="text-4xl font-bold text-secondary-yellow">12</div><div className="text-gray-600">Major Activities</div></div>
                <div className="p-4 bg-white shadow-lg rounded-lg" data-aos="zoom-in" data-aos-delay="100"><div className="text-4xl font-bold text-secondary-yellow">8</div><div className="text-gray-600">Regional Leagues</div></div>
                <div className="p-4 bg-white shadow-lg rounded-lg" data-aos="zoom-in" data-aos-delay="200"><div className="text-4xl font-bold text-secondary-yellow">5</div><div className="text-gray-600">National Events</div></div>
                <div className="p-4 bg-white shadow-lg rounded-lg" data-aos="zoom-in" data-aos-delay="300"><div className="text-4xl font-bold text-secondary-yellow">4</div><div className="text-gray-600">Regions Covered</div></div>
            </div>

            <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{left: '50%'}}></div>
                {workplanData.map((item, index) => (
                    <div key={index} className={`mb-8 flex justify-between ${index % 2 === 0 ? 'flex-row-reverse' : ''} items-center w-full`}>
                        <div className="order-1 w-5/12"></div>
                        <div className="z-20 flex items-center order-1 bg-primary-red shadow-xl w-16 h-16 rounded-full">
                            <h1 className="mx-auto text-white font-semibold text-lg text-center">{item.month}<br/>{item.date}</h1>
                        </div>
                        <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4" data-aos={index % 2 !== 0 ? 'fade-left' : 'fade-right'}>
                            <h3 className={`mb-3 font-bold ${index % 2 === 0 ? 'text-primary-red' : 'text-secondary-yellow'} text-xl`}>{item.title}</h3>
                            <p className="text-sm leading-snug tracking-wide text-gray-600">{item.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default WorkplanPage;