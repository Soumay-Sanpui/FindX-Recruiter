import React from 'react';
import { Eraser, X } from 'lucide-react';

const ClassifySection = ({ formData, formErrors, handleChange, handleClear, handleStageChange, navigate }) => {
    return (
        <div className="bg-white p-8 shadow-lg border-2 border-blue-800">
            <form className="space-y-6">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.jobTitle ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Enter Job Title"
                            required
                        />
                        {formErrors.jobTitle && <p className="text-red-500 text-xs mt-1">{formErrors.jobTitle}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            id="jobLocation"
                            name="jobLocation"
                            value={formData.jobLocation}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.jobLocation ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Enter Job Location"
                            required
                        />
                        {formErrors.jobLocation && <p className="text-red-500 text-xs mt-1">{formErrors.jobLocation}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="workspaceOption" className="block text-sm font-medium text-gray-700 mb-2">Workspace Option</label>
                        <select
                            id="workspaceOption"
                            name="workspaceOption"
                            value={formData.workspaceOption}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.workspaceOption ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                        >
                            <option value="">Select Workspace Option</option>
                            <option value="On-site">On-site</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Remote">Remote</option>
                        </select>
                        {formErrors.workspaceOption && <p className="text-red-500 text-xs mt-1">{formErrors.workspaceOption}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Main Category</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Enter Main Category"
                            required
                        />
                        {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
                        <input
                            type="text"
                            id="subcategory"
                            name="subcategory"
                            value={formData.subcategory}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.subcategory ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            placeholder="Enter Subcategory"
                            required
                        />
                        {formErrors.subcategory && <p className="text-red-500 text-xs mt-1">{formErrors.subcategory}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
                        <select
                            id="workType"
                            name="workType"
                            value={formData.workType}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.workType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                        >
                            <option value="">Select Work Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Casual">Casual</option>
                        </select>
                        {formErrors.workType && <p className="text-red-500 text-xs mt-1">{formErrors.workType}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="payType" className="block text-sm font-medium text-gray-700 mb-2">Pay Type</label>
                        <select
                            id="payType"
                            name="payType"
                            value={formData.payType}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.payType ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                        >
                            <option value="">Select Pay Type</option>
                            <option value="Hourly rate">Hourly rate</option>
                            <option value="Monthly salary">Monthly salary</option>
                            <option value="Annual salary">Annual salary</option>
                            <option value="Annual plus commission">Annual plus commission</option>
                        </select>
                        {formErrors.payType && <p className="text-red-500 text-xs mt-1">{formErrors.payType}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pay Range</label>
                        <div className="grid grid-cols-3 gap-2">
                            <select
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${formErrors.currency ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                required
                            >
                                <option value="">Currency</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="INR">INR</option>
                                <option value="AUD">AUD</option>
                                <option value="CAD">CAD</option>
                            </select>
                            
                            <input
                                type="number"
                                id="from"
                                name="from"
                                value={formData.from}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${formErrors.from ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="From"
                                required
                            />
                            
                            <input
                                type="number"
                                id="to"
                                name="to"
                                value={formData.to}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${formErrors.to ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="To"
                                required
                            />
                        </div>
                        <div className="flex gap-2 mt-1">
                            <div className="w-1/3">
                                {formErrors.currency && <p className="text-red-500 text-xs">{formErrors.currency}</p>}
                            </div>
                            <div className="w-1/3">
                                {formErrors.from && <p className="text-red-500 text-xs">{formErrors.from}</p>}
                            </div>
                            <div className="w-1/3">
                                {formErrors.to && <p className="text-red-500 text-xs">{formErrors.to}</p>}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pay Show on Ad</label>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="showSalary"
                                    name="showSalaryOnAd"
                                    checked={formData.showSalaryOnAd}
                                    onChange={() => handleChange({
                                        target: {
                                            name: 'showSalaryOnAd',
                                            type: 'checkbox',
                                            checked: true
                                        }
                                    })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="showSalary" className="ml-2 block text-sm text-gray-700">
                                    Show salary on ad
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="hideSalary"
                                    name="showSalaryOnAd"
                                    checked={!formData.showSalaryOnAd}
                                    onChange={() => handleChange({
                                        target: {
                                            name: 'showSalaryOnAd',
                                            type: 'checkbox',
                                            checked: false
                                        }
                                    })}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="hideSalary" className="ml-2 block text-sm text-gray-700">
                                    Hide salary on ad
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => handleStageChange('Ad Types')}
                        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Continue to Ad Types
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
    );
};

export default ClassifySection; 