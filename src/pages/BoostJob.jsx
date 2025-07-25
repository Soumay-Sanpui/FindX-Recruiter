import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Zap, TrendingUp, Users, Eye, Clock, Check, Star, Target, BarChart3 } from 'lucide-react';
import { useEmployerStore } from '../store/employer.store';
import { useJobs } from '../hooks/useJobs';

const BoostJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { employer } = useEmployerStore();
  const { data: jobs } = useJobs();
  
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [selectedDuration, setSelectedDuration] = useState('7');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Find the specific job
  const job = jobs?.find(j => j._id === jobId);

  useEffect(() => {
    if (!employer) {
      navigate('/employer-login');
    }
  }, [employer, navigate]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <Link to="/my-jobs" className="text-blue-600 hover:text-blue-700">
            Back to My Jobs
          </Link>
        </div>
      </div>
    );
  }

  const boostPlans = [
    {
      id: 'standard',
      name: 'Standard Boost',
      price: 29,
      duration: '7 days',
      features: [
        'Enhanced visibility in search results',
        'Priority placement in job feed',
        'Email notifications to matching candidates',
        'Basic analytics dashboard'
      ],
      icon: TrendingUp,
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium Boost',
      price: 49,
      duration: '14 days',
      features: [
        'All Standard features',
        'Featured job badge',
        'Social media promotion',
        'Advanced candidate targeting',
        'Detailed performance analytics',
        'Priority customer support'
      ],
      icon: Star,
      color: 'purple'
    },
    {
      id: 'ultimate',
      name: 'Ultimate Boost',
      price: 79,
      duration: '30 days',
      features: [
        'All Premium features',
        'Top of search results',
        'Sponsored content placement',
        'Multi-channel promotion',
        'Custom targeting options',
        'Dedicated account manager'
      ],
      icon: Target,
      color: 'orange'
    }
  ];

  const additionalFeatures = [
    {
      id: 'urgent',
      name: 'Urgent Hiring Badge',
      price: 15,
      description: 'Highlight your job as urgent to attract immediate attention'
    },
    {
      id: 'social',
      name: 'Social Media Promotion',
      price: 25,
      description: 'Promote your job across social media platforms'
    },
    {
      id: 'targeting',
      name: 'Advanced Targeting',
      price: 20,
      description: 'Target specific candidate demographics and skills'
    }
  ];

  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculateTotalPrice = () => {
    const basePlan = boostPlans.find(plan => plan.id === selectedPlan);
    const basePrice = basePlan ? basePlan.price : 0;
    const durationMultiplier = selectedDuration === '14' ? 1.5 : selectedDuration === '30' ? 2.5 : 1;
    const featuresPrice = selectedFeatures.reduce((total, featureId) => {
      const feature = additionalFeatures.find(f => f.id === featureId);
      return total + (feature ? feature.price : 0);
    }, 0);
    
    return Math.round((basePrice * durationMultiplier) + featuresPrice);
  };

  const handleBoostJob = () => {
    // This would integrate with payment system
    alert('Boost job functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/my-jobs"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to My Jobs</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Boost Job</h1>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-4">
            {job.companyLogo && (
              <img 
                src={job.companyLogo} 
                alt="Company Logo"
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.jobTitle}</h2>
              <p className="text-gray-600 mb-3">{employer?.companyName}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{job.applicants?.length || 0} applicants</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{Math.floor(Math.random() * 100) + 50} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Boost Plans */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Your Boost Plan</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {boostPlans.map((plan) => {
                  const IconComponent = plan.icon;
                  return (
                    <div
                      key={plan.id}
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? `border-${plan.color}-500 bg-${plan.color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id && (
                        <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${plan.color}-500 rounded-full flex items-center justify-center`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-${plan.color}-100 rounded-lg mb-4`}>
                        <IconComponent className={`w-6 h-6 text-${plan.color}-600`} />
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h4>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        ${plan.price}
                        <span className="text-sm font-normal text-gray-500">/week</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{plan.duration}</p>
                      
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-700">
                            <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Duration Selection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Boost Duration</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '7', label: '1 Week', price: '1x' },
                    { value: '14', label: '2 Weeks', price: '1.5x' },
                    { value: '30', label: '1 Month', price: '2.5x' }
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${
                        selectedDuration === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedDuration(option.value)}
                    >
                      <div className="font-semibold text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.price} price</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Features */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Features</h4>
                <div className="space-y-3">
                  {additionalFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedFeatures.includes(feature.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleFeatureToggle(feature.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedFeatures.includes(feature.id)}
                              onChange={() => handleFeatureToggle(feature.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 font-medium text-gray-900">{feature.name}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1 ml-7">{feature.description}</p>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">${feature.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary and Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Boost Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Selected Plan:</span>
                  <span className="font-medium text-gray-900">
                    {boostPlans.find(p => p.id === selectedPlan)?.name}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-900">
                    {selectedDuration === '7' ? '1 Week' : selectedDuration === '14' ? '2 Weeks' : '1 Month'}
                  </span>
                </div>
                
                {selectedFeatures.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="text-gray-600 mb-2">Additional Features:</div>
                    {selectedFeatures.map(featureId => {
                      const feature = additionalFeatures.find(f => f.id === featureId);
                      return (
                        <div key={featureId} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{feature?.name}</span>
                          <span className="font-medium text-gray-900">${feature?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBoostJob}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Boost Job Now
              </button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                By clicking "Boost Job Now", you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Why Boost Your Job?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Increased Visibility</h4>
              <p className="text-sm text-gray-600">Get up to 5x more views and applications from qualified candidates</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Better Targeting</h4>
              <p className="text-sm text-gray-600">Reach candidates with the exact skills and experience you need</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Performance Analytics</h4>
              <p className="text-sm text-gray-600">Track your job's performance and optimize your hiring strategy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostJob; 