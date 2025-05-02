import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, PenTool as Tool } from 'lucide-react';
import { User } from '../../types';
import { Button } from '../ui/Button';

interface ProfileCardProps {
  user: User;
  variant?: 'compact' | 'full';
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, variant = 'compact' }) => {
  const isCompact = variant === 'compact';
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isCompact ? '' : 'lg:flex'}`}>
      <div className={`${isCompact ? '' : 'lg:w-1/3'} relative`}>
        <img 
          src={user.profileImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"} 
          alt={user.name} 
          className={`w-full ${isCompact ? 'h-48' : 'lg:h-full'} object-cover`}
        />
        {user.industry && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {user.industry}
          </div>
        )}
      </div>
      
      <div className={`p-6 ${isCompact ? '' : 'lg:w-2/3'}`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            {user.companyName && (
              <p className="text-gray-600 font-medium">{user.companyName}</p>
            )}
          </div>
          {isCompact && (
            <Link to={`/profile/${user.id}`}>
              <Button variant="outline" size="sm">View Profile</Button>
            </Link>
          )}
        </div>
        
        {user.serviceAreas && user.serviceAreas.length > 0 && (
          <div className="flex items-center mt-3">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <p className="text-gray-600">{user.serviceAreas.join(', ')}</p>
          </div>
        )}
        
        {user.specialties && user.specialties.length > 0 && (
          <div className="flex items-start mt-3">
            <Tool size={16} className="text-gray-500 mr-2 mt-1" />
            <div>
              <p className="text-gray-600 font-medium">Specialties</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.specialties.map((specialty, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {!isCompact && user.bio && (
          <div className="mt-4">
            <p className="text-gray-700">{user.bio}</p>
          </div>
        )}
        
        <div className={`mt-6 ${isCompact ? '' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
          {user.contactInfo.phone && (
            <div className="flex items-center mt-2">
              <Phone size={16} className="text-gray-500 mr-2" />
              <a href={`tel:${user.contactInfo.phone}`} className="text-blue-600 hover:underline">
                {user.contactInfo.phone}
              </a>
            </div>
          )}
          
          <div className="flex items-center mt-2">
            <Mail size={16} className="text-gray-500 mr-2" />
            <a href={`mailto:${user.contactInfo.email}`} className="text-blue-600 hover:underline">
              {user.contactInfo.email}
            </a>
          </div>
          
          {user.contactInfo.website && (
            <div className="flex items-center mt-2">
              <Globe size={16} className="text-gray-500 mr-2" />
              <a href={user.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {user.contactInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </div>
          )}
        </div>
        
        {!isCompact && (
          <div className="mt-6 flex gap-3">
            <Button variant="primary">Contact</Button>
            <Button variant="outline">View Projects</Button>
          </div>
        )}
      </div>
    </div>
  );
};