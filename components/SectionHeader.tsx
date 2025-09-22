
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-primary-red mb-2">{title}</h2>
      <p className="text-lg text-gray-600">{subtitle}</p>
      <div className="mt-4 w-24 h-1 bg-gradient-to-r from-primary-red to-secondary-yellow mx-auto rounded"></div>
    </div>
  );
};

export default SectionHeader;