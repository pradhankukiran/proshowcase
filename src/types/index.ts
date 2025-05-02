export interface Profile {
  id: string;
  username: string;
  slug: string;
  full_name: string;
  profileImage?: string;
  companyName?: string;
  bio?: string;
  serviceAreas?: string[];
  contactInfo: ContactInfo;
  industry?: string;
  specialties?: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ContactInfo {
  phone?: string;
  email: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  location?: string;
  clientName?: string;
  isPublic: boolean;
  photos: Photo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Photo {
  id: string;
  projectId: string;
  url: string;
  thumbnailUrl: string;
  notes?: string;
  caption?: string;
  tags?: string[];
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  industry?: string;
  location?: string;
  rating?: number;
  sortBy?: 'recent' | 'rating' | 'alphabetical';
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
}

export interface DirectoryFilters {
  industry?: string;
  location?: string;
  specialty?: string;
  sortBy: 'recent' | 'alphabetical' | 'rating';
}