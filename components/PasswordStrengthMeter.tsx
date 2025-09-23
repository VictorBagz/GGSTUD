import React from 'react';

interface PasswordStrengthMeterProps {
  password?: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const calculateStrength = () => {
    let score = 0;
    if (!password) return 0;

    // Award points for different criteria
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return Math.min(score, 4); // Cap score at 4 for 4 bars
  };

  const strength = calculateStrength();

  const strengthLabels = ['Too Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];

  const getLabel = () => {
    if (password.length > 0 && password.length < 8) return 'Too short';
    if (strength === 0 && password.length > 0) return strengthLabels[0];
    if (strength === 1) return strengthLabels[1];
    if (strength === 2) return strengthLabels[2];
    if (strength >= 3) return strengthLabels[3];
    return '';
  };
  
  const label = getLabel();

  return (
    <div className="mt-2 col-span-2">
      <div className="flex gap-2 h-2 rounded-full overflow-hidden">
        <div className={`transition-all duration-300 w-1/4 ${strength > 0 ? strengthColors[Math.min(strength, 4)] : 'bg-gray-200'}`}></div>
        <div className={`transition-all duration-300 w-1/4 ${strength > 1 ? strengthColors[Math.min(strength, 4)] : 'bg-gray-200'}`}></div>
        <div className={`transition-all duration-300 w-1/4 ${strength > 2 ? strengthColors[Math.min(strength, 4)] : 'bg-gray-200'}`}></div>
        <div className={`transition-all duration-300 w-1/4 ${strength > 3 ? strengthColors[Math.min(strength, 4)] : 'bg-gray-200'}`}></div>
      </div>
      {label && <p className="text-xs text-right mt-1 font-medium" style={{color: strengthColors[Math.min(strength, 4)]?.replace('bg-', '').replace('-500', '')}}>{label}</p>}
    </div>
  );
};

export default PasswordStrengthMeter;