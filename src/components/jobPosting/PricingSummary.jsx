import React from 'react';

const PricingSummary = ({
  premiumSelected = false,
  immediateStartSelected = false,
  // referencesSelected = false,
  notificationOption = "both",
  notificationCount = 100,
}) => {
  // Calculate individual costs (in dollars, matching Stripe amounts)
  const premiumCost = premiumSelected ? 99 : 0;
  const immediateCost = immediateStartSelected ? 45 : 0; // Show $45 in UI

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
  const calculatedTotalCost = premiumSelected
    ? premiumCost + immediateCost + notificationCost // Premium replaces standard
    : standardCost + immediateCost + notificationCost; // Standard package

  return (
    <div className="hidden lg:block lg:w-1/4 bg-gray-50 border-l border-gray-300">
      <div className="sticky top-0 p-0">
        <div className="bg-blue-600 text-white py-3 px-4 font-bold">
          Your Job Ad Summary
        </div>
        <div className="p-4">
          {premiumSelected ? (
            <>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Premium Job Ad Package:</span>
                <span className="font-bold text-xl">$99</span>
              </div>
              <div className="text-sm space-y-1 mb-4">
                <p className="font-medium">Includes:</p>
                <ul className="list-disc ml-4 text-gray-600 space-y-1">
                  {[
                    "Premium listing Badge on Job Ad",
                    "Your ad featured on top",
                    "Email invite to high-fit candidates to apply",
                    "Other ads don't appear on yours",
                    "Your company's logo, cover image and key selling points"
                  ].map((feature, index) => (
                      <div key={index} className="flex items-start text-gray-700">
                        <span>{feature}</span>
                      </div>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Standard Job Ad Package:</span>
                <span className="font-bold text-xl">${standardCost}</span>
              </div>
              <div className="text-sm space-y-1 mb-4">
                <p className="font-medium">Includes:</p>
                <ul className="list-disc ml-4 text-gray-600 space-y-1">
                  {
                    ["Normal Job Ad",
                      "Domain Matching",
                      "Candidate Profile Access",
                      "Messaging System",
                      "Job Promotion",
                      "Add your logo, cover photo, embedded video to stand out",
                      "LinkedIn, Career profile access (if provided by candidate)"
                    ].map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
              </div>
            </>
          )}

          {immediateStartSelected && (
            <div className="flex justify-between mt-4 mb-2">
              <span>Immediate Start Badge:</span>
              <span className="font-semibold">$45</span>
            </div>
          )}

          {immediateStartSelected && (
            <p className="text-xs text-gray-600 mb-4">
              Let candidates know you're hiring urgently
            </p>
          )}

          {notificationOption !== "none" && (
            <>
              <div className="flex justify-between mt-4 mb-2">
                <span>
                  Notification Package ({notificationCount}+ candidates):
                </span>
                <span className="font-semibold">${notificationCost}</span>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                {notificationOption === "both"
                  ? `Email and app notifications to ${notificationCount} candidates`
                  : notificationOption === "email"
                  ? `Email notifications to ${notificationCount} candidates`
                  : `App notifications to ${notificationCount} candidates`}
              </p>
            </>
          )}

          <div className="flex justify-between mt-6 text-xl font-bold border-t pt-4">
            <span>Total Cost:</span>
            <span>${calculatedTotalCost}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSummary;
