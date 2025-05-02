import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, User, ArrowLeft, Share2, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { MOCK_PROJECTS, MOCK_USERS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // Find the project
  const project = MOCK_PROJECTS.find(project => project.id === id);
  
  // Find the project owner
  const projectOwner = project ? MOCK_USERS.find(user => user.id === project.userId) : null;
  
  // Check if this is the current user's project
  const isOwnProject = currentUser && project && currentUser.id === project.userId;
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };
  
  const handlePrevPhoto = () => {
    if (!project) return;
    setCurrentPhotoIndex(prev => 
      prev === 0 ? project.photos.length - 1 : prev - 1
    );
  };
  
  const handleNextPhoto = () => {
    if (!project) return;
    setCurrentPhotoIndex(prev => 
      prev === project.photos.length - 1 ? 0 : prev + 1
    );
  };
  
  const goToPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
  };
  
  if (!project || !projectOwner) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects">
            <Button variant="primary">Browse Projects</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <Link to={`/profile/${projectOwner.id}`} className="flex items-center text-gray-600 hover:text-gray-900 mb-2 sm:mb-0">
              <ArrowLeft size={16} className="mr-1" />
              Back to {projectOwner.name}'s Profile
            </Link>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              leftIcon={<Share2 size={16} />}
            >
              Share
            </Button>
            
            {isOwnProject && (
              <Link to={`/projects/${project.id}/edit`}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  leftIcon={<Edit size={16} />}
                >
                  Edit Project
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        {/* Project Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
          
          <div className="flex flex-wrap gap-y-2">
            {project.location && (
              <div className="flex items-center text-gray-500 mr-4">
                <MapPin size={18} className="mr-1" />
                {project.location}
              </div>
            )}
            
            <div className="flex items-center text-gray-500 mr-4">
              <Calendar size={18} className="mr-1" />
              {formatDate(project.date)}
            </div>
            
            {project.clientName && (
              <div className="flex items-center text-gray-500">
                <User size={18} className="mr-1" />
                Client: {project.clientName}
              </div>
            )}
          </div>
        </div>
        
        {/* Photo Gallery */}
        {project.photos.length > 0 && (
          <div className="mb-8">
            <div className="relative rounded-lg overflow-hidden bg-gray-900 h-[400px] md:h-[500px]">
              <img 
                src={project.photos[currentPhotoIndex].url} 
                alt={project.photos[currentPhotoIndex].caption || project.title}
                className="w-full h-full object-contain"
              />
              
              {/* Caption */}
              {project.photos[currentPhotoIndex].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
                  <p className="text-white">{project.photos[currentPhotoIndex].caption}</p>
                </div>
              )}
              
              {/* Navigation Arrows */}
              {project.photos.length > 1 && (
                <>
                  <button 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 focus:outline-none"
                    onClick={handlePrevPhoto}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 focus:outline-none"
                    onClick={handleNextPhoto}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {project.photos.length > 1 && (
              <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
                {project.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => goToPhoto(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden focus:outline-none ${
                      index === currentPhotoIndex ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={photo.thumbnailUrl} 
                      alt={photo.caption || `Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Project Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Project Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {project.description}
          </p>
        </div>
        
        {/* Project Owner */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">About the Professional</h2>
          <div className="flex items-center">
            <img 
              src={projectOwner.profileImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"} 
              alt={projectOwner.name} 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">{projectOwner.name}</h3>
              {projectOwner.companyName && (
                <p className="text-gray-600">{projectOwner.companyName}</p>
              )}
              {projectOwner.industry && (
                <p className="text-gray-600">{projectOwner.industry}</p>
              )}
            </div>
          </div>
          
          <div className="mt-4">
            <Link to={`/profile/${projectOwner.id}`}>
              <Button variant="outline">View Full Profile</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};