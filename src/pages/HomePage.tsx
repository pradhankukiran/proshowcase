import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Camera, UserCircle, PenTool, Building, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';
import { INDUSTRIES, MOCK_USERS, MOCK_PROJECTS } from '../data/mockData';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3914752/pexels-photo-3914752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Showcase Your Work, Grow Your Business</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              The professional platform for service providers to display their portfolio, connect with clients, and expand their reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="primary" className="bg-blue-700 text-white border-2 border-white hover:bg-blue-800">
                  Create Your Portfolio 
                </Button>
              </Link>
              <Link to="/directory">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700">
                  Find Professionals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Bar */}
      <section className="bg-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for professionals..."
                className="w-full pl-10 py-3 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Link to="/directory">
              <Button variant="primary" className="w-full md:w-auto py-3">
                Find Pros
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Service Categories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover skilled professionals across various industries
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {INDUSTRIES.map((industry) => (
              <Link 
                key={industry.id} 
                to={`/directory?industry=${industry.name}`}
                className="bg-white rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-700 mb-4">
                  {industry.icon === 'construction' && <Building size={24} />}
                  {industry.icon === 'tree' && <PenTool size={24} />}
                  {industry.icon === 'spray-can' && <Briefcase size={24} />}
                  {industry.icon === 'wrench' && <Briefcase size={24} />}
                  {industry.icon === 'zap' && <Briefcase size={24} />}
                  {industry.icon === 'lamp' && <Briefcase size={24} />}
                  {industry.icon === 'paintbrush' && <Briefcase size={24} />}
                  {industry.icon === 'grid' && <Briefcase size={24} />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-sm text-gray-500">Explore professionals</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/directory">
              <Button 
                variant="outline" 
                rightIcon={<ArrowRight size={16} />}
              >
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Work */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Work</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Recent projects from our top professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_PROJECTS.slice(0, 3).map((project) => (
              <div key={project.id} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={project.photos[0].url} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 transition-opacity">
                    <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-white/90 line-clamp-2 mb-2">{project.description}</p>
                    <Link to={`/projects/${project.id}`} className="text-blue-300 hover:text-blue-200 font-medium flex items-center">
                      View Project <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/projects">
              <Button 
                variant="primary" 
                rightIcon={<ArrowRight size={16} />}
              >
                Browse All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get started in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-blue-100 h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <UserCircle size={32} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build your professional profile with your business details, service areas, and specialties.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-blue-100 h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Camera size={32} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Showcase Your Work</h3>
              <p className="text-gray-600">
                Upload photos of your projects with details to build an impressive portfolio that highlights your skills.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="rounded-full bg-blue-100 h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Building size={32} className="text-blue-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Grow Your Business</h3>
              <p className="text-gray-600">
                Get discovered by potential clients through our professional directory and start receiving inquiries.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/register">
              <Button 
                variant="primary" 
                size="lg"
              >
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Showcase Your Professional Work?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who are growing their business through their online portfolio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="primary" className="bg-blue-700 text-white hover:bg-blue-800">
                Create Your Profile
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700">
                See Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};