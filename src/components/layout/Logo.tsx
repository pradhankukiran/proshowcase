import React from 'react';
import { Briefcase } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Briefcase size={24} className="text-blue-600 mr-2" />
      <span className="font-bold text-xl text-blue-800">ProShowcase</span>
    </div>
  );
};