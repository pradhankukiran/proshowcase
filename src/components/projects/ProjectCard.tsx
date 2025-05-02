import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, User } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };
  
  return (
    <Link to={`/projects/${project.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative">
          {/* If project has photos, use the first one as the cover */}
          {project.photos && project.photos.length > 0 ? (
            <img
              src={project.photos[0].thumbnailUrl}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
              {project.category}
            </span>
          </div>
          
          {/* Photo count badge */}
          {project.photos && project.photos.length > 0 && (
            <div className="absolute bottom-3 right-3">
              <span className="bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded flex items-center">
                {project.photos.length} photos
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
            {project.title}
          </h3>
          
          <p className="mt-2 text-gray-600 text-sm line-clamp-2">
            {project.description}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-y-2">
            {project.location && (
              <div className="flex items-center text-gray-500 text-sm mr-4">
                <MapPin size={14} className="mr-1" />
                {project.location}
              </div>
            )}
            
            <div className="flex items-center text-gray-500 text-sm mr-4">
              <Calendar size={14} className="mr-1" />
              {formatDate(project.date)}
            </div>
            
            {project.clientName && (
              <div className="flex items-center text-gray-500 text-sm">
                <User size={14} className="mr-1" />
                {project.clientName}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};