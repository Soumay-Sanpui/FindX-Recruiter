import { useEmployerStore } from '../store/employer.store';
import DHeader from '../components/dashboard/DHeader';
import { StickyNote, Eraser, X, Plus } from 'lucide-react';

const JobPosting = () => {
    const { employer } = useEmployerStore();
    return (
        <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white pb-[10vh]">
            <DHeader employer={employer} />
            <div className="container mx-auto px-8 py-8">
                <div className="flex flex-col justify-between items-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a New Job</h1>
                    <p className='text-gray-500'>Fill in the details below to post a new job.</p>
                </div>
                <div className="bg-white p-8 shadow-lg border-2 border-blue-800">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                <input
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Title"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-2">Job Location</label>
                                <input
                                    type="text"
                                    id="jobLocation"
                                    name="jobLocation"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Location"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                                <select
                                    id="jobType"
                                    name="jobType"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Job Type</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="jobSalary" className="block text-sm font-medium text-gray-700 mb-2">Job Salary</label>
                                <input
                                    type="number"
                                    id="jobSalary"
                                    name="jobSalary"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Salary"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jobIndustry" className="block text-sm font-medium text-gray-700 mb-2">Job Industry</label>
                                <input
                                    type="text"
                                    id="jobIndustry"
                                    name="jobIndustry"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Industry"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jobExperience" className="block text-sm font-medium text-gray-700 mb-2">Job Experience</label>
                                <select
                                    id="jobExperience"
                                    name="jobExperience"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Job Experience</option>
                                    <option value="Entry">Entry</option>
                                    <option value="Mid">Mid</option>
                                    <option value="Senior">Senior</option>
                                    <option value="Lead">Lead</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="jobSkills" className="block text-sm font-medium text-gray-700 mb-2">Job Skills</label>
                                <input
                                    type="text"
                                    id="jobSkills"
                                    name="jobSkills"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Skills (comma separated)"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jobKeywords" className="block text-sm font-medium text-gray-700 mb-2">Job Keywords</label>
                                <input
                                    type="text"
                                    id="jobKeywords"
                                    name="jobKeywords"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Keywords (comma separated)"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                            <textarea
                                id="jobDescription"
                                name="jobDescription"
                                rows="6"
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter detailed job description"
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Plus className="mr-2" /> Post Job
                            </button>
                            <button
                                type="button"
                                className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                <StickyNote className="mr-2" /> Save Draft
                            </button>
                            <button
                                type="button"
                                className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                <Eraser className="mr-2" /> Clear
                            </button>
                            <button
                                type="button"
                                className="w-full flex items-center justify-center bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-red-500"
                            >
                                <X className="mr-2" /> Clear
                            </button>
                        </div>
                    </form>
                    <p className='text-gray-500 text-secondary underline font-semibold mt-4'>*(Please note that after posting a job, you will not be able to edit it's details.)</p>
                </div>
            </div>
        </div>
    )
}

export default JobPosting;
