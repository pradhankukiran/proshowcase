import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, PenTool as Tool } from 'lucide-react';
import { Profile } from '../../types';
import { Button } from '../ui/Button';

interface ProfileCardProps {
  user: Profile;
  variant?: 'compact' | 'full';
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, variant = 'compact' }) => {
  const isCompact = variant === 'compact';
  
  // Apply flex only for compact variant
  const containerClasses = isCompact 
    ? 'bg-white rounded-lg shadow-md overflow-hidden flex flex-row' 
    : 'bg-white rounded-lg shadow-md overflow-hidden lg:flex';

  // Define order and width for compact variant
  const imageContainerClasses = isCompact
    ? 'relative w-1/4 order-2 h-48' // Image on right, takes 1/4 width, FIXED HEIGHT
    : 'relative lg:w-1/3';

  const contentContainerClasses = isCompact
    ? 'p-6 flex-grow order-1' // Content on left, takes remaining space
    : 'p-6 lg:w-2/3';
  
  // Adjust image height for compact portrait look
  const imageClasses = isCompact
    ? 'w-full h-full object-cover' // Full height of container, portrait style
    : `w-full ${isCompact ? 'h-48' : 'lg:h-full'} object-cover`; // Original logic for non-compact

  return (
    <div className={containerClasses}>
      {/* Image container - now uses dynamic classes */}
      <div className={imageContainerClasses}>
        <img 
          src={user.profileImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"} 
          alt={user.full_name}
          className={imageClasses}
        />
        {user.industry && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
            {user.industry}
          </div>
        )}
      </div>
      
      {/* Content container - now uses dynamic classes */}
      <div className={contentContainerClasses}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.full_name}</h2>
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
                {user.specialties?.map((specialty: string, index: number) => (
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
        
        {/* Contact Info Section */}
        <div className={`mt-6 ${isCompact ? 'flex flex-row flex-wrap gap-x-4 gap-y-1' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
          {user.contactInfo.phone && (
            <div className="flex items-center">
              <Phone size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <a href={`tel:${user.contactInfo.phone}`} className="text-blue-600 hover:underline text-sm truncate">
                {user.contactInfo.phone}
              </a>
            </div>
          )}
          
          <div className="flex items-center">
            <Mail size={16} className="text-gray-500 mr-2 flex-shrink-0" />
            <a href={`mailto:${user.contactInfo.email}`} className="text-blue-600 hover:underline text-sm truncate">
              {user.contactInfo.email}
            </a>
          </div>
          
          {user.contactInfo.website && (
            <div className="flex items-center">
              <Globe size={16} className="text-gray-500 mr-2 flex-shrink-0" />
              <a href={user.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm truncate">
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