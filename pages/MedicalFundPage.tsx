
import React from 'react';
import { Link } from 'react-router-dom';

const MedicalFundPage: React.FC = () => {
  return (
    <>
      <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/img/medical-fund-banner.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-5xl font-extrabold" data-aos="fade-down">Athletes Medical Fund</h1>
          <p className="mt-4 text-xl" data-aos="fade-up">Protecting and supporting our student-athletes</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-primary-red">About the Fund</h2>
            <p className="mt-4 text-lg text-gray-600">Ensuring timely care and recovery for injured student rugby athletes.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg" data-aos="fade-right">
              <h3 className="text-2xl font-bold text-dark-gray mb-4">What the Fund Covers</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Immediate medical attention during sanctioned matches or training</li>
                <li>Subsidized treatment and rehabilitation for approved cases</li>
                <li>Collaboration with partner facilities for specialized care</li>
              </ul>
              <h3 className="text-2xl font-bold text-dark-gray mt-8 mb-4">Eligibility</h3>
              <p className="text-gray-700">Players registered with USRA and participating in sanctioned activities are eligible under the terms and conditions of the fund.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg" data-aos="fade-left">
              <h3 className="text-2xl font-bold text-dark-gray mb-4">How to Apply</h3>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li>Notify USRA immediately after an incident via your school representative.</li>
                <li>Submit medical assessment and incident report to USRA.</li>
                <li>USRA verifies the claim and communicates the next steps.</li>
              </ol>
              <div className="mt-8">
                <Link to="/contact" className="w-full text-center bg-primary-red text-white font-bold py-3 px-6 rounded-lg hover:bg-dark-red transition duration-300">Contact USRA</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MedicalFundPage;