import React from 'react';
import { Link } from 'react-router';

const Pricing = () => {
    return (
        <div className="pt-20 pb-16 px-4">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-dark mb-4">Simple, Transparent Pricing</h1>
                <p className="text-xl text-gray">Hire smarter without overpaying. Start with FindX today.</p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Standard Listing */}
                <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-dark mb-4">Standard Job Listing</h2>
                    <p className="text-4xl font-bold text-dark mb-2">$49</p>
                    <p className="text-gray-400 line-through mb-2">$199</p>
                    <p className="text-sm text-gray mb-4">Early Bird Offer (Limited Time)</p>
                    <p className="text-gray mb-6">List a job and attract top candidates with our platform's reach.</p>
                    <Link to="/signup" className="block w-full px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-secondary text-center">
                        Post a Job
                    </Link>
                </div>

                {/* Boosted Notifications */}
                <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-primary">
                    <h2 className="text-2xl font-bold text-dark mb-4">Boosted Notifications</h2>
                    <p className="text-gray mb-6">Notify candidates via in-app and email alerts for faster hiring.</p>
                    <div className="space-y-4 text-gray text-sm">
                        <div>
                            <strong>100 Candidates:</strong><br />
                            App: $49 | Email: $49 | Both: $69 <span className="text-green-600">(save $29)</span>
                        </div>
                        <div>
                            <strong>250 Candidates:</strong><br />
                            App: $99 | Email: $99 | Both: $129 <span className="text-green-600">(save $69)</span>
                        </div>
                        <div>
                            <strong>500 Candidates:</strong><br />
                            App: $149 | Email: $149 | Both: $189 <span className="text-green-600">(save $109)</span>
                        </div>
                        <div>
                            <strong>750 Candidates:</strong><br />
                            App: $199 | Email: $199 | Both: $249 <span className="text-green-600">(save $149)</span>
                        </div>
                        <div>
                            <strong>1000 Candidates:</strong><br />
                            App: $249 | Email: $249 | Both: $299 <span className="text-green-600">(save $199)</span>
                        </div>
                    </div>
                    <Link to="/signup" className="mt-6 block w-full px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-secondary text-center">
                        Boost My Job
                    </Link>
                </div>
            </div>

            {/* Compare to Seek */}
            <div className="max-w-7xl mx-auto text-center mt-12">
                <p className="text-gray italic">Compared to Seek: $300+ per job listing</p>
            </div>
        </div>
    );
};

export default Pricing;
