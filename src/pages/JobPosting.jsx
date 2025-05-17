import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import { jobAPI } from '../services/api';
import DHeader from '../components/dashboard/DHeader';
import { Eraser, X, Plus, Upload } from 'lucide-react';
import Timeline from '../components/jobPosting/Timeline';

const JobPosting = () => {
    const { employer } = useEmployerStore();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobLocation: '',
        jobType: '',
        jobSalary: '',
        jobSalaryType: 'Per Month',
        jobBanner: '',
        jobIndustry: '',
        jobExperience: '',
        jobSkills: '',
        jobKeywords: '',
        jobDescription: '',
        postedBy: employer?._id || ''
    });


    useEffect(() => {
        if(!employer) navigate("/employer-login");
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleBannerChange = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            jobBanner: value
        }));
    };

    const handleClear = () => {
        setFormData({
            jobTitle: '',
            jobLocation: '',
            jobType: '',
            jobSalary: '',
            jobSalaryType: 'Per Month',
            jobBanner: '',
            jobIndustry: '',
            jobExperience: '',
            jobSkills: '',
            jobKeywords: '',
            jobDescription: '',
            postedBy: employer?._id || ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!employer?._id) {
            toast.error('You must be logged in to post a job');
            return;
        }

        try {
            setIsSubmitting(true);

            const jobData = {
                ...formData,
                jobSalary: Number(formData.jobSalary),
                jobSkills: formData.jobSkills.split(',').map(skill => skill.trim()),
                jobKeywords: formData.jobKeywords.split(',').map(keyword => keyword.trim()),
                postedBy: employer._id
            };

            const response = await jobAPI.createJob(jobData);
            navigate('/my-jobs');
        } catch (error) {
            console.error('Error posting job:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white pb-[10vh]">
            <DHeader employer={employer} />
            <Timeline currentStage={'Classify'} />
            <div className="container mx-auto px-8 py-8">
                <div className="flex flex-col justify-between items-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a New Job</h1>
                    <p className='text-gray-500'>Fill in the details below to post a new job.</p>
                </div>
                <div className="bg-white p-8 shadow-lg border-2 border-blue-800">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                <input
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
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
                                    value={formData.jobLocation}
                                    onChange={handleChange}
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
                                    value={formData.jobType}
                                    onChange={handleChange}
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
                                    value={formData.jobSalary}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Salary"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jobSalaryType" className="block text-sm font-medium text-gray-700 mb-2">Salary Type</label>
                                <select
                                    id="jobSalaryType"
                                    name="jobSalaryType"
                                    value={formData.jobSalaryType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="Per Month">Per Month</option>
                                    <option value="Per Annum">Per Annum</option>
                                    <option value="Per Week">Per Week</option>
                                    <option value="Per Hour">Per Hour</option>
                                    <option value="Per Contract">Per Contract</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="jobIndustry" className="block text-sm font-medium text-gray-700 mb-2">Job Industry</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onChange={handleChange} id={'jobIndustry'} value={formData.jobIndustry} name={'jobIndustry'}>

                                </select>
                            </div>
                            <div>
                                <label htmlFor="jobExperience" className="block text-sm font-medium text-gray-700 mb-2">Job Experience</label>
                                <select
                                    id="jobExperience"
                                    name="jobExperience"
                                    value={formData.jobExperience}
                                    onChange={handleChange}
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
                                    value={formData.jobSkills}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Skills (comma separated)"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="jobKeywords" className="block text-sm font-medium text-gray-700 mb-2">Job Keywords</label>
                                <input
                                    type="text"
                                    id="jobKeywords"
                                    name="jobKeywords"
                                    value={formData.jobKeywords}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter Job Keywords (comma separated)"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="jobBanner" className="block text-sm font-medium text-gray-700 mb-2">Job Banner URL (Optional)</label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="jobBanner"
                                        name="jobBanner"
                                        value={formData.jobBanner}
                                        onChange={handleBannerChange}
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter banner image URL"
                                    />
                                    <div className="ml-2 flex items-center justify-center bg-gray-100 p-2 text-gray-500">
                                        <Upload size={20} />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Add an image URL for your job banner (recommended size: 1200x630px)</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                            <textarea
                                id="jobDescription"
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleChange}
                                rows="6"
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter detailed job description"
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                <Plus className="mr-2" /> {isSubmitting ? 'Posting...' : 'Post Job'}
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                <Eraser className="mr-2" /> Clear
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/my-jobs')}
                                className="w-full flex items-center justify-center bg-gray-100 hover:bg-red-700 hover:text-white text-gray-700 font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-red-500"
                            >
                                <X className="mr-2" /> Cancel
                            </button>
                        </div>
                    </form>
                    <p className='text-secondary underline font-semibold mt-4'>*(Please note that after posting a job, you will not be able to edit it's details.)</p>
                </div>
            </div>
        </div>
    )
}

export default JobPosting;
