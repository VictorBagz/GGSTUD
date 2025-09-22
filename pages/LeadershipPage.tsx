import React, { useState } from 'react';
import { Member, Committee, RegionalCommittee } from '../types';
import { leadershipData } from '../constants';

const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-t-4 border-secondary-yellow hover:border-primary-red h-full">
    <div className="flex items-center mb-4">
      {member.photo && <img className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-secondary-yellow" src={member.photo} alt={member.name} />}
      <div>
        <h3 className="text-xl font-bold text-primary-red">{member.name}</h3>
        <p className="text-secondary-yellow font-semibold">{member.title}</p>
      </div>
    </div>
    <p className="text-text-dark font-medium italic">{member.school}</p>
    <p className="bg-dark-yellow/20 text-dark-yellow font-bold text-xs inline-block px-2 py-1 rounded-full my-2">{member.region}</p>
    <div className="text-sm text-gray-600 mt-4 border-t pt-4">
      {member.email && <p className="truncate"><i className="fas fa-envelope w-6 text-primary-red"></i> {member.email}</p>}
      {member.phone && <p><i className="fas fa-phone w-6 text-primary-red"></i> {member.phone}</p>}
    </div>
  </div>
);

const LeadershipPage: React.FC = () => {
  const tabs = leadershipData.map(c => c.name);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-light-gray">
      <section className="bg-gradient-to-r from-primary-red to-dark-red text-white text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold" data-aos="fade-down">Leadership Structure 2025</h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto" data-aos="fade-up">Uganda Schools Rugby Association - Affiliate Member, Uganda Rugby Union (URU)</p>
      </section>

      <div className="sticky top-20 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1 sm:space-x-2 md:space-x-4 overflow-x-auto py-3 px-2 sm:px-4">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm md:text-base font-semibold rounded-full transition-colors duration-300 whitespace-nowrap ${activeTab === tab ? 'bg-secondary-yellow text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen">
        {leadershipData.map(committee => {
          if (committee.name !== activeTab) return null;

          if ('members' in committee) { // Type guard for Committee
            return (
              <div key={committee.name}>
                <h2 className="text-3xl font-bold text-center text-primary-red mb-8" data-aos="fade-up">{committee.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(committee as Committee).members.map((member, index) => (
                    <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                      <MemberCard member={member} />
                    </div>
                  ))}
                </div>
              </div>
            );
          } else if ('zones' in committee) { // Type guard for RegionalCommittee
             return (
              <div key={committee.name}>
                 {(committee as RegionalCommittee).zones.map(zone => (
                     <div key={zone.name} className="mb-12">
                         <h3 className="text-2xl font-bold text-center text-secondary-yellow mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-primary-red after:rounded-full" data-aos="fade-up">{zone.name}</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {zone.members.map((member, index) => (
                                <div key={index} data-aos="fade-up" data-aos-delay={index * 50}>
                                  <MemberCard member={member} />
                                </div>
                             ))}
                         </div>
                     </div>
                 ))}
              </div>
            );
          }
          return null;
        })}
      </main>
    </div>
  );
};

export default LeadershipPage;
