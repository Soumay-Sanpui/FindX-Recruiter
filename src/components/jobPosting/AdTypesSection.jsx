import React, { useState } from 'react';
import { BsCheckCircleFill, BsInfoCircle } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import PricingSummary from './PricingSummary';

const AdTypesSection = ({ formData, handleChange, handleStageChange }) => {
  const [premiumSelected, setPremiumSelected] = useState(
    formData?.premiumListing ?? false
  );
  const [immediateStartSelected, setImmediateStartSelected] = useState(
    formData?.immediateStart ?? false
  );
  // const [referencesSelected, setReferencesSelected] = useState(formData?.referencesRequired ?? false);
  const [notificationOption, setNotificationOption] = useState(
    formData?.notificationOption ?? "none"
  );
  const [notificationCount, setNotificationCount] = useState(
    formData?.notificationCount ?? 100
  );

  // Calculate total cost
  const premiumCost = premiumSelected ? 99 : 0;
  const immediateCost = immediateStartSelected ? 45 : 0;

  // Dynamic notification pricing based on count
  const getNotificationCost = (option, count) => {
    if (option === "none") return 0;

    const pricing = {
      100: { app: 49, email: 49, both: 69 },
      250: { app: 99, email: 99, both: 129 },
      500: { app: 149, email: 149, both: 189 },
      750: { app: 199, email: 199, both: 249 },
      1000: { app: 249, email: 249, both: 299 },
    };

    return pricing[count]?.[option] || pricing[100][option];
  };

  const notificationCost = getNotificationCost(
    notificationOption,
    notificationCount
  );
  const standardCost = 49;
  // Calculate total cost - if premium is selected, replace standard cost
  const totalCost = premiumSelected
    ? premiumCost + immediateCost + notificationCost // Premium replaces standard
    : standardCost + immediateCost + notificationCost; // Standard package

  // Handle premium selection
  const handlePremiumToggle = () => {
    const newValue = !premiumSelected;
    setPremiumSelected(newValue);
    if (handleChange) {
      handleChange({
        target: {
          name: "premiumListing",
          value: newValue,
          type: "checkbox",
          checked: newValue,
        },
      });
    }
  };

  // Handle immediate start selection
  const handleImmediateStartToggle = () => {
    const newValue = !immediateStartSelected;
    setImmediateStartSelected(newValue);
    if (handleChange) {
      handleChange({
        target: {
          name: "immediateStart",
          value: newValue,
          type: "checkbox",
          checked: newValue,
        },
      });
    }
  };

  // Handle references selection
  /*const handleReferencesToggle = () => {
        const newValue = !referencesSelected;
        setReferencesSelected(newValue);
        if (handleChange) {
            handleChange({
                target: {
                    name: 'referencesRequired',
                    value: newValue,
                    type: 'checkbox',
                    checked: newValue
                }
            });
        }
    };*/

  // Handle notification option change
  const handleNotificationChange = (option) => {
    setNotificationOption(option);
    if (handleChange) {
      handleChange({
        target: {
          name: "notificationOption",
          value: option,
        },
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white shadow-lg border-2 border-blue-800">
      {/* Main Content */}
      <div className="lg:w-3/4 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Select Job Ad Type
          </h2>
          <p className="text-gray-600">
            Choose the best option for your job posting needs
          </p>
        </div>

        <div className="text-lg font-semibold mb-3">
          Included in Your 30 day advertisement
        </div>

        {/* Premium Option */}
        <div className="mb-8">
          <div
            className={`border-2 ${
              premiumSelected ? "border-blue-600" : "border-gray-200"
            } rounded-lg overflow-hidden transition-all shadow-md`}
          >
            <div className="flex justify-between items-start p-5 bg-blue-900 text-white">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-2">
                  Recommended
                </span>
                <h3 className="text-xl font-bold">Premium</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$99</p>
                <p className="text-sm">+GST</p>
              </div>
            </div>

            <div className="p-5">
              <p className="text-gray-700 mb-4">
                Top performing ad, for critical & hard-to-fill roles
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <BsCheckCircleFill className="text-blue-600 mr-2 flex-shrink-0" />
                    <span>598 total applications</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <BsCheckCircleFill className="text-blue-600 mr-2 flex-shrink-0" />
                    <span>273 high-fit applications</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <BsCheckCircleFill className="text-blue-600 mr-2 flex-shrink-0" />
                    <span>2.5k views</span>
                  </div>
                </div>
              </div>

              <div className="mb-5 flex justify-center">
                <button
                  onClick={handlePremiumToggle}
                  className={`w-full py-2 rounded font-medium ${
                    premiumSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {premiumSelected ? "Selected" : "Select Premium"}
                </button>
              </div>

              <div className="border-t pt-4">
                <p className="font-medium mb-3">Included in your 30 day ad</p>
                <div className="space-y-3">
                  <div className="flex items-start text-gray-700">
                    <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Priority AI-driven visibility in search and candidate
                      recommendations
                    </span>
                    <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                  <div className="flex items-start text-gray-700">
                    <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Personally invite 80 high-fit candidates to apply
                    </span>
                    <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                  <div className="flex items-start text-gray-700">
                    <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>Your ad featured on similar ads</span>
                    <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                  <div className="flex items-start text-gray-700">
                    <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>Other ads don't appear on yours</span>
                    <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                  <div className="flex items-start text-gray-700">
                    <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      FindX exclusively sends your ad to high-fit candidates
                    </span>
                    <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                  <div className="flex items-start text-gray-700">
                    <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span>
                      Your company's logo, cover image and key selling points
                    </span>
                    <BsInfoCircle className="text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Immediate Start Option */}
        <div className="mb-8">
          <div
            className={`border-2 ${
              immediateStartSelected ? "border-blue-600" : "border-gray-200"
            } rounded-lg overflow-hidden transition-all shadow-md`}
          >
            <div className="p-5 flex">
              <div className="flex-1">
                <div className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mb-2">
                  New
                </div>
                <h3 className="text-xl font-bold mb-1">
                  Need to hire someone quickly?
                </h3>
                <p className="text-gray-600 mb-3">
                  Include an 'Immediate start' badge on your job ad to attract
                  job seekers who are ready to start.
                </p>
                <p className="font-bold text-xl">
                  $45{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    +GST
                  </span>
                </p>
              </div>
              <div className="w-1/3 flex items-center justify-center">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="border border-blue-200 rounded p-2 mb-2 inline-block">
                    <span className="text-blue-600 text-sm font-medium">
                      Immediate start
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Example ad with immediate start badge
                  </p>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button
                onClick={handleImmediateStartToggle}
                className={`py-2 px-6 rounded font-medium ${
                  immediateStartSelected
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                {immediateStartSelected ? "— Remove" : "+ Add"}
              </button>
            </div>
          </div>
        </div>

        {/* References Option */}
        {/*                <div classname="mb-8">
                    <div classname={`border-2 ${referencesselected ? 'border-blue-600' : 'border-gray-200'} rounded-lg overflow-hidden transition-all shadow-md`}>
                        <div classname="p-5 flex">
                            <div classname="flex-1">
                                <div classname="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded mb-2">new</div>
                                <h3 classname="text-xl font-bold mb-1">get references quickly and confidently</h3>
                                <p classname="text-gray-600 mb-3">request references in a few clicks for up to 3 applicants. our automated system will contact 2 referees per applicant using our standard questions.</p>
                                <p classname="font-bold text-xl">$75 <span classname="text-sm text-gray-500 font-normal">+gst</span></p>
                            </div>
                            <div classname="w-1/3 flex items-center justify-center">
                                <div classname="bg-blue-50 p-4 rounded-lg text-center">
                                    <div classname="border border-blue-200 rounded p-2 mb-2">
                                        <button classname="bg-blue-600 text-white text-xs rounded px-3 py-1 flex items-center">
                                            <facheck classname="mr-1" /> check references
                                        </button>
                                    </div>
                                    <p classname="text-xs text-gray-500">example of checking references</p>
                                </div>
                            </div>
                        </div>
                        <div classname="px-5 pb-5">
                            <button
                                onclick={handlereferencestoggle}
                                classname={`py-2 px-6 rounded font-medium ${referencesselected ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                                {referencesselected ? "— remove" : "+ add"}
                            </button>
                        </div>
                    </div>
               </div>  */}

        {/* Notification Options */}
        <div className="mb-8">
          {/* Notification Count Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Select Number of Candidates to Notify:</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[100, 250, 500, 750, 1000].map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    setNotificationCount(count);
                    if (handleChange) {
                      handleChange({
                        target: {
                          name: "notificationCount",
                          value: count,
                        },
                      });
                    }
                  }}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    notificationCount === count
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {count} Candidates
                </button>
              ))}
            </div>
          </div>

          {/* Notification Channel Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`border rounded-lg p-4 ${
                notificationOption === "app"
                  ? "border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <h3 className="font-semibold mb-1">App Only</h3>
              <p className="text-gray-600 text-sm mb-2">
                Notify {notificationCount} candidates via app notifications.
              </p>
              <p className="font-bold mb-3">${getNotificationCost("app", notificationCount)}</p>
              <button
                onClick={() => handleNotificationChange("app")}
                className={`w-full py-2 rounded text-sm font-medium ${
                  notificationOption === "app"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Select Plan
              </button>
            </div>

            <div
              className={`border rounded-lg p-4 ${
                notificationOption === "email"
                  ? "border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <h3 className="font-semibold mb-1">Email Only</h3>
              <p className="text-gray-600 text-sm mb-2">
                Notify {notificationCount} candidates via email.
              </p>
              <p className="font-bold mb-3">${getNotificationCost("email", notificationCount)}</p>
              <button
                onClick={() => handleNotificationChange("email")}
                className={`w-full py-2 rounded text-sm font-medium ${
                  notificationOption === "email"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Select Plan
              </button>
            </div>

            <div
              className={`border rounded-lg p-4 ${
                notificationOption === "both"
                  ? "border-blue-600"
                  : "border-gray-200"
              }`}
            >
              <h3 className="font-semibold mb-1">Both Channels</h3>
              <p className="text-gray-600 text-sm mb-2">
                Notify {notificationCount} candidates via both app and email.
              </p>
              <div className="flex justify-between mb-3">
                <p className="font-bold">${getNotificationCost("both", notificationCount)}</p>
                <p className="text-green-600 text-sm">
                  Save ${getNotificationCost("app", notificationCount) + getNotificationCost("email", notificationCount) - getNotificationCost("both", notificationCount)}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange("both")}
                className={`w-full py-2 rounded text-sm font-medium ${
                  notificationOption === "both"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                Best Value
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-10">
          <button
            onClick={() => handleStageChange("Classify")}
            className="flex items-center justify-center border border-gray-300 text-gray-700 font-medium py-3 px-8 transition hover:bg-gray-50"
          >
            &lt; BACK
          </button>

          <button
            onClick={() => handleStageChange("Write")}
            className="flex items-center justify-center border border-blue-600 bg-white text-blue-600 font-medium py-3 px-8 transition hover:bg-blue-50"
          >
            PROCEED &gt;
          </button>
        </div>

        {/* Mobile Job Ad Summary - Only visible on mobile devices */}
        <div className="block lg:hidden mt-10 border border-gray-300 shadow-md rounded-md bg-white">
          <div className="bg-blue-600 text-white py-3 px-4 font-bold">
            Your Job Ad Summary
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Standard Job Ad Package:</span>
              <span className="font-bold text-xl">${standardCost}</span>
            </div>

            <div className="text-sm space-y-1 mb-4">
              <p className="font-medium">Includes:</p>
              <ul className="list-disc ml-4 text-gray-600 space-y-1">
                <li>30-day job listing</li>
                <li>Unlimited applicants</li>
                <li>Dashboard & management tools</li>
                <li>Free access to candidates profiles</li>
                <li>Send & Receive messages with candidates</li>
                <li>Complete branding</li>
              </ul>
              <p className="mt-2 text-gray-600">
                Add your logo, cover photo, embedded video to stand out
              </p>
              <p className="text-gray-600">
                LinkedIn, Career profile access (if provided by candidate)
              </p>
            </div>

            {immediateStartSelected && (
              <div className="flex justify-between mt-4 mb-2">
                <span>Immediate Start Badge:</span>
                <span className="font-semibold">$19</span>
              </div>
            )}

            {immediateStartSelected && (
              <p className="text-xs text-gray-600 mb-4">
                Let candidates know you're hiring urgently
              </p>
            )}
            {/*
                        {referencesSelected && (
                            <div className="flex justify-between mt-4 mb-2">
                                <span>Reference Check Access:</span>
                                <span className="font-semibold">$19</span>
                            </div>
                        )}
                        
                        {referencesSelected && (
                            <p className="text-xs text-gray-600 mb-4">Request references from candidates instantly</p>
                        )}*/}

            <div className="font-medium mt-6">
              Just like this email and app package as well
            </div>

            <div className="flex justify-between mt-6 text-xl font-bold border-t pt-4">
              <span>Total Cost:</span>
              <span>${totalCost}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Ad Summary - Right Side */}
      <PricingSummary
        premiumSelected={premiumSelected}
        immediateStartSelected={immediateStartSelected}
        notificationOption={notificationOption}
        notificationCount={notificationCount}
      />
    </div>
  );
};

export default AdTypesSection; 
