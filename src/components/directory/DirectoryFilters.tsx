import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { DirectoryFilters as DirectoryFiltersType } from '../../types';
import { INDUSTRIES } from '../../data/mockData';

interface DirectoryFiltersProps {
  onFilterChange: (filters: DirectoryFiltersType) => void;
}

export const DirectoryFilters: React.FC<DirectoryFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<DirectoryFiltersType>({
    sortBy: 'recent',
    searchTerm: '',
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const handleFilterChange = (key: keyof DirectoryFiltersType, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('searchTerm', e.target.value);
  };
  
  const clearFilters = () => {
    const newFilters = {
      sortBy: 'recent',
      searchTerm: '',
      industry: undefined,
      location: undefined,
      specialty: undefined,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const locations = [
    'San Francisco, CA',
    'Portland, OR',
    'Austin, TX',
    'New York, NY',
    'Seattle, WA',
    'Chicago, IL',
  ];

  const specialties = [
    'Kitchen Remodels', 'Bathroom Renovations', 'Home Additions',
    'Garden Design', 'Outdoor Living Spaces', 'Water Features',
    'Residential Cleaning', 'Commercial Cleaning', 'Move-in/Move-out Cleaning',
    'Emergency Repairs', 'Pipe Installation', 'Water Heater Services',
    'Smart Home Setup', 'LED Lighting', 'Panel Upgrades',
    'Residential Design', 'Space Planning', 'Furniture Selection'
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Mobile Filter Button */}
      <div className="flex md:hidden justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="outline" 
          size="sm" 
          leftIcon={<Filter size={16} />}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search professionals..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filters.searchTerm || ''}
          onChange={handleInputChange}
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {/* Filters - Desktop always visible, mobile toggleable */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block space-y-4`}>
        {/* Industry Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Industry</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry.id}
                onClick={() => handleFilterChange('industry', industry.name)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  filters.industry === industry.name ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {industry.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Location Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
          <select
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Specialty Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Specialty</h3>
          <select
            value={filters.specialty || ''}
            onChange={(e) => handleFilterChange('specialty', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
        
        {/* Sort By */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange('sortBy', 'recent')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                filters.sortBy === 'recent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Most Recent
            </button>
            <button
              onClick={() => handleFilterChange('sortBy', 'alphabetical')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                filters.sortBy === 'alphabetical' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alphabetical
            </button>
            <button
              onClick={() => handleFilterChange('sortBy', 'rating')}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                filters.sortBy === 'rating' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Top Rated
            </button>
          </div>
        </div>
        
        {/* Clear Filters button - only show if filters are applied */}
        {(filters.industry || filters.location || filters.specialty || filters.sortBy !== 'recent' || filters.searchTerm) && (
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              leftIcon={<X size={16} />}
              onClick={clearFilters}
              className="text-gray-600"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};