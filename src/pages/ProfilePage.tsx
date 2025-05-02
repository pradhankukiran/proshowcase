import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Mail, Phone, Globe, Star, Edit } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Button } from '../components/ui/Button';
import { MOCK_USERS, MOCK_PROJECTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user: currentUser } = useAuth();
  return <ProfileContent user={currentUser} isOwnProfile={true} />;
};

export const PublicProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const profile = MOCK_USERS.find(user => user.slug === slug);
  return <ProfileContent user={profile} isOwnProfile={false} />;
};

interface ProfileContentProps {
  user: User | null | undefined;
  isOwnProfile: boolean;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user: profile, isOwnProfile }) => {
  const { id } = useParams<{ id?: string }>();
  const { isAuthenticated } = useAuth();
  
  // Find the user's projects
  const userProjects = MOCK_PROJECTS.filter(project => project.userId === profile?.id && project.isPublic);
  
  if (!profile) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="mb-6">The profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/directory">
            <Button variant="primary">Browse Directory</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800 relative">
            {isOwnProfile && (
              <div className="absolute top-4 right-4">
                <Link to="/profile/edit">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    leftIcon={<Edit size={16} />}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    Edit Profile
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="px-6 md:px-8 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-end -mt-16 md:-mt-24 mb-6">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
                <img 
                  src={profile.profileImage || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:ml-6 mt-4 md:mt-0 md:mb-1 flex-grow">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{profile.name}</h1>
                {profile.companyName && (
                  <p className="text-xl text-gray-600">{profile.companyName}</p>
                )}
                {profile.industry && (
                  <div className="mt-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {profile.industry}
                    </span>
                  </div>
                )}
              </div>
              
              {!isOwnProfile && (
                <div className="mt-4 md:mt-0">
                  <Button variant="primary">Contact</Button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">About</h2>
                  <p className="text-gray-700">
                    {profile.bio || "No bio provided."}
                  </p>
                </div>
                
                {profile.specialties && profile.specialties.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Specialties</h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.serviceAreas && profile.serviceAreas.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Service Areas</h2>
                    <div className="flex items-start">
                      <MapPin size={20} className="text-gray-500 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{profile.serviceAreas.join(', ')}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail size={20} className="text-gray-500 mr-3" />
                    <a href={`mailto:${profile.contactInfo.email}`} className="text-blue-600 hover:underline">
                      {profile.contactInfo.email}
                    </a>
                  </div>
                  
                  {profile.contactInfo.phone && (
                    <div className="flex items-center">
                      <Phone size={20} className="text-gray-500 mr-3" />
                      <a href={`tel:${profile.contactInfo.phone}`} className="text-blue-600 hover:underline">
                        {profile.contactInfo.phone}
                      </a>
                    </div>
                  )}
                  
                  {profile.contactInfo.website && (
                    <div className="flex items-center">
                      <Globe size={20} className="text-gray-500 mr-3" />
                      <a href={profile.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profile.contactInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  )}
                  
                  {profile.contactInfo.address && (
                    <div className="flex items-start">
                      <MapPin size={20} className="text-gray-500 mr-3 mt-1" />
                      <div>
                        <p className="text-gray-700">{profile.contactInfo.address}</p>
                        {profile.contactInfo.city && profile.contactInfo.state && (
                          <p className="text-gray-700">
                            {profile.contactInfo.city}, {profile.contactInfo.state} {profile.contactInfo.zip}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            {isOwnProfile && (
              <Link to="/projects/new">
                <Button variant="primary" size="sm">Add New Project</Button>
              </Link>
            )}
          </div>
          
          {userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-gray-600 mb-4">
                {isOwnProfile ? 
                  "You haven't added any projects to your portfolio yet." : 
                  "This professional hasn't added any projects to their portfolio yet."}
              </p>
              
              {isOwnProfile && (
                <Link to="/projects/new">
                  <Button variant="primary">Add Your First Project</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};