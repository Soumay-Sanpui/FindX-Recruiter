import React, { useState } from 'react';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../components/JobCard';
import { Search, Filter, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router';

const JobListings = () => {
    const { data: jobs = [], isLoading, error } = useJobs();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const navigate = useNavigate();

    // Filter jobs based on search criteria
    const filteredJobs = jobs.filter(job => {
        const matchesSearch = !searchTerm || 
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.postedBy?.companyName && job.postedBy.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = !selectedCategory || job.category === selectedCategory;
        const matchesLocation = !selectedLocation || job.jobLocation.toLowerCase().includes(selectedLocation.toLowerCase());
        
        return matchesSearch && matchesCategory && matchesLocation;
    });

    // Get unique categories and locations for filters
    const categories = [...new Set(jobs.map(job => job.category))].sort();
    const locations = [...new Set(jobs.map(job => job.jobLocation))].sort();

    const handleSaveJob = (jobId) => {
        // TODO: Implement save job functionality
        console.log('Save job:', jobId);
    };

    const handleNotInterested = (jobId) => {
        // TODO: Implement not interested functionality
        console.log('Not interested in job:', jobId);
    };

    const handleChat = (jobId) => {
        // Navigate to messages page for this specific job
        navigate(`/chat/${jobId}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Jobs</h2>
                    <p className="text-gray-600">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Next Job</h1>
                    <p className="text-gray-600">Browse and apply to jobs that match your skills and interests</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search jobs, companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location Filter */}
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                            >
                                <option value="">All Locations</option>
                                {locations.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Filters */}
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('');
                                setSelectedLocation('');
                            }}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredJobs.length} of {jobs.length} jobs
                    </p>
                </div>

                {/* Job Cards Grid */}
                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map(job => (
                            <JobCard
                                key={job._id}
                                job={job}
                                onSave={handleSaveJob}
                                onNotInterested={handleNotInterested}
                                onChat={handleChat}
                                isSaved={false} // TODO: Get from user's saved jobs
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-white rounded-lg shadow-sm border p-8">
                            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                            <p className="text-gray-600 mb-4">
                                Try adjusting your search criteria or check back later for new opportunities.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('');
                                    setSelectedLocation('');
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobListings; 