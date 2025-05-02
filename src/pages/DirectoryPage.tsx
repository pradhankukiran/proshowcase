import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { DirectoryFilters } from '../components/directory/DirectoryFilters';
import { ProfileCard } from '../components/profile/ProfileCard';
import { DirectoryFilters as DirectoryFiltersType, User } from '../types';
import { MOCK_USERS } from '../data/mockData';

export const DirectoryPage: React.FC = () => {
  const [filters, setFilters] = useState<DirectoryFiltersType>({
    sortBy: 'recent'
  });
  const [filteredUsers, setFilteredUsers] = useState<User[]>(MOCK_USERS);
  
  useEffect(() => {
    // Filter users based on selected filters
    let result = [...MOCK_USERS];
    
    if (filters.industry) {
      result = result.filter(user => user.industry === filters.industry);
    }
    
    if (filters.location) {
      result = result.filter(user => 
        user.serviceAreas?.some(area => area.includes(filters.location || ''))
      );
    }
    
    if (filters.specialty) {
      result = result.filter(user => 
        user.specialties?.some(specialty => specialty.includes(filters.specialty || ''))
      );
    }
    
    // Sort users
    switch (filters.sortBy) {
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        // In a real app, this would sort by rating
        break;
      case 'recent':
      default:
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }
    
    setFilteredUsers(result);
  }, [filters]);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Professional Directory</h1>
          <p className="mt-2 text-gray-600">
            Find skilled professionals for your next project
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Section */}
          <div className="lg:col-span-1">
            <DirectoryFilters onFilterChange={setFilters} />
          </div>
          
          {/* Results Section */}
          <div className="lg:col-span-3">
            {filteredUsers.length > 0 ? (
              <div className="space-y-6">
                {filteredUsers.map(user => (
                  <ProfileCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No professionals found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to find professionals that match your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};