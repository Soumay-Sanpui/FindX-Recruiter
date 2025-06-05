import React, { useState, useEffect } from 'react';
import { Eraser, X } from 'lucide-react';
import CONFIG from '../../../config/config.js';

const ClassifySection = ({ formData, formErrors, handleChange, handleClear, handleStageChange, navigate }) => {
    const [subcategories, setSubcategories] = useState([]);

    // Work type options
    const workTypeOptions = [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Casual', label: 'Casual' }
    ];

    // Pay type options
    const payTypeOptions = [
        { value: 'Hourly rate', label: 'Hourly rate' },
        { value: 'Monthly salary', label: 'Monthly salary' },
        { value: 'Annual salary', label: 'Annual salary' },
        { value: 'Annual plus commission', label: 'Annual plus commission' }
    ];

    // Get categories from config
    const categories = Object.keys(CONFIG.jobAdIndustries);

    // Update subcategories when main category changes
    useEffect(() => {
        if (formData.category) {
            const selectedSubcategories = CONFIG.jobAdIndustries[formData.category] || [];
            setSubcategories(selectedSubcategories);
            
            // Reset subcategory if current selection is not in the new list
            if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(formData.subcategory)) {
                handleChange({
                    target: {
                        name: 'subcategory',
                        value: ''
                    }
                });
            }
        } else {
            setSubcategories([]);
        }
    }, [formData.category]);

    return (
        <div className="bg-white p-8 shadow-lg border-2 border-blue-800">
            <form className="space-y-6">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="jobTitle" className="block text-lg font-semibold text-gray-700 mb-2">Job Title</label>
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
                        <label htmlFor="jobLocation" className="block text-lg font-semibold text-gray-700 mb-2">Location</label>
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
                        <label htmlFor="workspaceOption" className="block text-lg font-semibold text-gray-700 mb-2">Workspace Option</label>
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
                        <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">Main Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                        >
                            <option value="">Select Main Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="subcategory" className="block text-lg font-semibold text-gray-700 mb-2">Subcategory</label>
                        <select
                            id="subcategory"
                            name="subcategory"
                            value={formData.subcategory}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${formErrors.subcategory ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            required
                            disabled={!formData.category}
                        >
                            <option value="">Select Subcategory</option>
                            {subcategories.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                    {subcategory}
                                </option>
                            ))}
                        </select>
                        {formErrors.subcategory && <p className="text-red-500 text-xs mt-1">{formErrors.subcategory}</p>}
                        {!formData.category && <p className="text-gray-500 text-xs mt-1">Please select a main category first</p>}
                    </div>
                    
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Work Type</label>
                        <div className={`grid grid-cols-2 gap-2 ${formErrors.workType ? 'border border-red-500 p-2 rounded' : ''}`}>
                            {workTypeOptions.map((option) => (
                                <div key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={option.value}
                                        name="workType"
                                        value={option.value}
                                        checked={formData.workType === option.value}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor={option.value} className="ml-2 block text-sm text-gray-700">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formErrors.workType && <p className="text-red-500 text-xs mt-1">{formErrors.workType}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Pay Type</label>
                        <div className={`grid grid-cols-2 gap-2 ${formErrors.payType ? 'border border-red-500 p-2 rounded' : ''}`}>
                            {payTypeOptions.map((option) => (
                                <div key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={option.value}
                                        name="payType"
                                        value={option.value}
                                        checked={formData.payType === option.value}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor={option.value} className="ml-2 block text-sm text-gray-700">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formErrors.payType && <p className="text-red-500 text-xs mt-1">{formErrors.payType}</p>}
                    </div>
                    
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Pay Range</label>
                        <div className="grid grid-cols-3 gap-2">
                            <select
                                id="currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${formErrors.currency ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                required
                            >
                                <option value="">Select Currency</option>
                                <option value="AED">AED - United Arab Emirates Dirham</option>
                                <option value="AFN">AFN - Afghan Afghani</option>
                                <option value="ALL">ALL - Albanian Lek</option>
                                <option value="AMD">AMD - Armenian Dram</option>
                                <option value="ANG">ANG - Netherlands Antillean Guilder</option>
                                <option value="AOA">AOA - Angolan Kwanza</option>
                                <option value="ARS">ARS - Argentine Peso</option>
                                <option value="AUD">AUD - Australian Dollar</option>
                                <option value="AWG">AWG - Aruban Florin</option>
                                <option value="AZN">AZN - Azerbaijani Manat</option>
                                <option value="BAM">BAM - Bosnia and Herzegovina Convertible Mark</option>
                                <option value="BBD">BBD - Barbadian Dollar</option>
                                <option value="BDT">BDT - Bangladeshi Taka</option>
                                <option value="BGN">BGN - Bulgarian Lev</option>
                                <option value="BHD">BHD - Bahraini Dinar</option>
                                <option value="BIF">BIF - Burundian Franc</option>
                                <option value="BMD">BMD - Bermudian Dollar</option>
                                <option value="BND">BND - Brunei Dollar</option>
                                <option value="BOB">BOB - Bolivian Boliviano</option>
                                <option value="BRL">BRL - Brazilian Real</option>
                                <option value="BSD">BSD - Bahamian Dollar</option>
                                <option value="BTN">BTN - Bhutanese Ngultrum</option>
                                <option value="BWP">BWP - Botswanan Pula</option>
                                <option value="BYN">BYN - Belarusian Ruble</option>
                                <option value="BZD">BZD - Belize Dollar</option>
                                <option value="CAD">CAD - Canadian Dollar</option>
                                <option value="CDF">CDF - Congolese Franc</option>
                                <option value="CHF">CHF - Swiss Franc</option>
                                <option value="CLP">CLP - Chilean Peso</option>
                                <option value="CNY">CNY - Chinese Yuan</option>
                                <option value="COP">COP - Colombian Peso</option>
                                <option value="CRC">CRC - Costa Rican Colón</option>
                                <option value="CUP">CUP - Cuban Peso</option>
                                <option value="CVE">CVE - Cape Verdean Escudo</option>
                                <option value="CZK">CZK - Czech Koruna</option>
                                <option value="DJF">DJF - Djiboutian Franc</option>
                                <option value="DKK">DKK - Danish Krone</option>
                                <option value="DOP">DOP - Dominican Peso</option>
                                <option value="DZD">DZD - Algerian Dinar</option>
                                <option value="EGP">EGP - Egyptian Pound</option>
                                <option value="ERN">ERN - Eritrean Nakfa</option>
                                <option value="ETB">ETB - Ethiopian Birr</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="FJD">FJD - Fijian Dollar</option>
                                <option value="FKP">FKP - Falkland Islands Pound</option>
                                <option value="FOK">FOK - Faroese Króna</option>
                                <option value="GBP">GBP - British Pound Sterling</option>
                                <option value="GEL">GEL - Georgian Lari</option>
                                <option value="GGP">GGP - Guernsey Pound</option>
                                <option value="GHS">GHS - Ghanaian Cedi</option>
                                <option value="GIP">GIP - Gibraltar Pound</option>
                                <option value="GMD">GMD - Gambian Dalasi</option>
                                <option value="GNF">GNF - Guinean Franc</option>
                                <option value="GTQ">GTQ - Guatemalan Quetzal</option>
                                <option value="GYD">GYD - Guyanaese Dollar</option>
                                <option value="HKD">HKD - Hong Kong Dollar</option>
                                <option value="HNL">HNL - Honduran Lempira</option>
                                <option value="HRK">HRK - Croatian Kuna</option>
                                <option value="HTG">HTG - Haitian Gourde</option>
                                <option value="HUF">HUF - Hungarian Forint</option>
                                <option value="IDR">IDR - Indonesian Rupiah</option>
                                <option value="ILS">ILS - Israeli New Shekel</option>
                                <option value="IMP">IMP - Isle of Man Pound</option>
                                <option value="INR">INR - Indian Rupee</option>
                                <option value="IQD">IQD - Iraqi Dinar</option>
                                <option value="IRR">IRR - Iranian Rial</option>
                                <option value="ISK">ISK - Icelandic Króna</option>
                                <option value="JEP">JEP - Jersey Pound</option>
                                <option value="JMD">JMD - Jamaican Dollar</option>
                                <option value="JOD">JOD - Jordanian Dinar</option>
                                <option value="JPY">JPY - Japanese Yen</option>
                                <option value="KES">KES - Kenyan Shilling</option>
                                <option value="KGS">KGS - Kyrgyzstani Som</option>
                                <option value="KHR">KHR - Cambodian Riel</option>
                                <option value="KID">KID - Kiribati Dollar</option>
                                <option value="KMF">KMF - Comorian Franc</option>
                                <option value="KRW">KRW - South Korean Won</option>
                                <option value="KWD">KWD - Kuwaiti Dinar</option>
                                <option value="KYD">KYD - Cayman Islands Dollar</option>
                                <option value="KZT">KZT - Kazakhstani Tenge</option>
                                <option value="LAK">LAK - Lao Kip</option>
                                <option value="LBP">LBP - Lebanese Pound</option>
                                <option value="LKR">LKR - Sri Lankan Rupee</option>
                                <option value="LRD">LRD - Liberian Dollar</option>
                                <option value="LSL">LSL - Lesotho Loti</option>
                                <option value="LYD">LYD - Libyan Dinar</option>
                                <option value="MAD">MAD - Moroccan Dirham</option>
                                <option value="MDL">MDL - Moldovan Leu</option>
                                <option value="MGA">MGA - Malagasy Ariary</option>
                                <option value="MKD">MKD - Macedonian Denar</option>
                                <option value="MMK">MMK - Myanmar Kyat</option>
                                <option value="MNT">MNT - Mongolian Tögrög</option>
                                <option value="MOP">MOP - Macanese Pataca</option>
                                <option value="MRU">MRU - Mauritanian Ouguiya</option>
                                <option value="MUR">MUR - Mauritian Rupee</option>
                                <option value="MVR">MVR - Maldivian Rufiyaa</option>
                                <option value="MWK">MWK - Malawian Kwacha</option>
                                <option value="MXN">MXN - Mexican Peso</option>
                                <option value="MYR">MYR - Malaysian Ringgit</option>
                                <option value="MZN">MZN - Mozambican Metical</option>
                                <option value="NAD">NAD - Namibian Dollar</option>
                                <option value="NGN">NGN - Nigerian Naira</option>
                                <option value="NIO">NIO - Nicaraguan Córdoba</option>
                                <option value="NOK">NOK - Norwegian Krone</option>
                                <option value="NPR">NPR - Nepalese Rupee</option>
                                <option value="NZD">NZD - New Zealand Dollar</option>
                                <option value="OMR">OMR - Omani Rial</option>
                                <option value="PAB">PAB - Panamanian Balboa</option>
                                <option value="PEN">PEN - Peruvian Sol</option>
                                <option value="PGK">PGK - Papua New Guinean Kina</option>
                                <option value="PHP">PHP - Philippine Peso</option>
                                <option value="PKR">PKR - Pakistani Rupee</option>
                                <option value="PLN">PLN - Polish Złoty</option>
                                <option value="PYG">PYG - Paraguayan Guaraní</option>
                                <option value="QAR">QAR - Qatari Riyal</option>
                                <option value="RON">RON - Romanian Leu</option>
                                <option value="RSD">RSD - Serbian Dinar</option>
                                <option value="RUB">RUB - Russian Ruble</option>
                                <option value="RWF">RWF - Rwandan Franc</option>
                                <option value="SAR">SAR - Saudi Riyal</option>
                                <option value="SBD">SBD - Solomon Islands Dollar</option>
                                <option value="SCR">SCR - Seychellois Rupee</option>
                                <option value="SDG">SDG - Sudanese Pound</option>
                                <option value="SEK">SEK - Swedish Krona</option>
                                <option value="SGD">SGD - Singapore Dollar</option>
                                <option value="SHP">SHP - Saint Helena Pound</option>
                                <option value="SLL">SLL - Sierra Leonean Leone</option>
                                <option value="SOS">SOS - Somali Shilling</option>
                                <option value="SRD">SRD - Surinamese Dollar</option>
                                <option value="SSP">SSP - South Sudanese Pound</option>
                                <option value="STN">STN - São Tomé and Príncipe Dobra</option>
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
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Pay Show on Ad</label>
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