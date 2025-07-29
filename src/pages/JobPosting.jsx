import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import DHeader from "../components/dashboard/DHeader";
import AdTypesSection from "../components/jobPosting/AdTypesSection";
import ClassifySection from "../components/jobPosting/ClassifySection";
import ManageSection from "../components/jobPosting/ManageSection";
import Timeline from "../components/jobPosting/Timeline";
import WriteSection from "../components/jobPosting/WriteSection";
import PaymentCheckout from "../components/PaymentCheckout";
import { jobKeys } from "../hooks/useJobs";
import { useEmployerStore } from "../store/employer.store";

const JobPosting = () => {
  const { employer } = useEmployerStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentStage, setCurrentStage] = useState("Classify");
  const [formErrors, setFormErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLocation: "",
    workspaceOption: "",
    category: "",
    subcategory: "",
    workType: "",
    payType: "",
    currency: "",
    from: "",
    to: "",
    showSalaryOnAd: true,
    // Keeping other fields for later stages
    jobSkills: [],
    jobKeywords: [],
    jobDescription: "",
    jobBanner: "",
    jobIndustry: "",
    postedBy: employer?._id || "",
    jobSummary: "",
    sellingPoints: [],
    videoLink: "",
    jobSalaryType: "Per Month",
    companyLogo: "",
    jobQuestions: [],
    internalReference: "",
    premiumListing: false,
    immediateStart: false,
    referencesRequired: false,
    notificationOption: "both",
    shortDescription: [],
    showShortDescription: false,
    mandatoryQuestions: [],
    selectedOptions: {},
    maxUsers: 500, // Default max users to notify
    notificationCount: 100, // Default notification count
  });

  // Payment data configuration
  const getPaymentData = () => {
    // Base pricing - if premium is selected, use premium price instead of standard
    const basePrice = formData.premiumListing ? 9900 : 4900; // $99.00 or $49.00
    let totalAmount = basePrice;

    // Add-on pricing
    if (formData.immediateStart) totalAmount += 4500; // $45.00 (Stripe amount)
    if (formData.referencesRequired) totalAmount += 1900; // $19.00

    // Notification pricing
    const getNotificationPricing = (option, count) => {
      if (option === "none") return 0;

      const pricing = {
        100: { app: 4900, email: 4900, both: 6900 },
        250: { app: 9900, email: 9900, both: 12900 },
        500: { app: 14900, email: 14900, both: 18900 },
        750: { app: 19900, email: 19900, both: 24900 },
        1000: { app: 24900, email: 24900, both: 29900 },
      };

      return pricing[count]?.[option] || pricing[100][option];
    };

    const notificationPrice = getNotificationPricing(
      formData.notificationOption,
      formData.notificationCount
    );
    totalAmount += notificationPrice;

    // Prepare job data with proper formatting
    const jobData = {
      // Basic job information
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      jobSummary: formData.jobSummary,
      jobLocation: formData.jobLocation,
      workspaceOption: formData.workspaceOption,
      category: formData.category,
      subcategory: formData.subcategory,
      workType: formData.workType,
      payType: formData.payType,
      currency: formData.currency,
      from: Number(formData.from),
      to: Number(formData.to),
      showSalaryOnAd: formData.showSalaryOnAd,
      jobSalaryType: formData.jobSalaryType,

      // Skills and keywords (ensure they are arrays)
      jobSkills: Array.isArray(formData.jobSkills) ? formData.jobSkills : [],
      jobKeywords: Array.isArray(formData.jobKeywords)
        ? formData.jobKeywords
        : [],
      sellingPoints: Array.isArray(formData.sellingPoints)
        ? formData.sellingPoints
        : [],

      // Media and branding
      jobBanner: formData.jobBanner,
      companyLogo: formData.companyLogo,
      videoLink: formData.videoLink,

      // Short description (ensure it's an array)
      shortDescription: Array.isArray(formData.shortDescription)
        ? formData.shortDescription
        : [],
      showShortDescription: formData.showShortDescription,

      // Premium features
      premiumListing: formData.premiumListing,
      immediateStart: formData.immediateStart,
      referencesRequired: formData.referencesRequired,
      notificationOption: formData.notificationOption,

      // Questions and references
      jobQuestions: Array.isArray(formData.jobQuestions)
        ? formData.jobQuestions
        : [],
      mandatoryQuestions: Array.isArray(formData.mandatoryQuestions)
        ? formData.mandatoryQuestions
        : [],
      selectedOptions: formData.selectedOptions || {},
      internalReference: formData.internalReference,

      // Create applicationQuestions directly from the form data
      applicationQuestions: (() => {
        const questions = Array.isArray(formData.jobQuestions)
          ? formData.jobQuestions
          : [];
        const mandatory = Array.isArray(formData.mandatoryQuestions)
          ? formData.mandatoryQuestions
          : [];
        const options = formData.selectedOptions || {};

        if (questions.length === 0) return [];

        return questions.map((question) => {
          const questionOptions = options[question] || [];
          const isRequired = mandatory.includes(question);

          // Ensure we have at least some options
          const finalOptions =
            questionOptions.length > 0 ? questionOptions : ["Yes", "No"];

          return {
            question: question,
            options: finalOptions,
            required: isRequired,
          };
        });
      })(),

      // Employer information
      postedBy: formData.postedBy,

      // Notification settings
      maxUsers: formData.maxUsers || 500,
      notificationCount: formData.notificationCount || 100,
      maxNumberForNotifications:
        formData.notificationOption === "app" ||
        formData.notificationOption === "both"
          ? formData.notificationCount
          : 0,
      maxNumberForEmails:
        formData.notificationOption === "email" ||
        formData.notificationOption === "both"
          ? formData.notificationCount
          : 0,
    };

    // console.log("📊 ===== FRONTEND NOTIFICATION CONFIG =====");
    // console.log(`🔔 Notification Option: ${formData.notificationOption}`);
    // console.log(`📋 Notification Count: ${formData.notificationCount}`);
    // console.log(`📊 Max Notifications: ${jobData.maxNumberForNotifications}`);
    // console.log(`📧 Max Emails: ${jobData.maxNumberForEmails}`);
    // console.log("✅ ===== FRONTEND CONFIG COMPLETE =====");

    return {
      planId: "Standard",
      amount: totalAmount,
      currency: "aud",
      jobData: jobData,
      addOns: [
        ...(formData.immediateStart
          ? [
              {
                id: "immediateStart",
                name: "Immediate Start Badge",
                price: 4500,
              },
            ]
          : []),
        ...(formData.referencesRequired
          ? [
              {
                id: "referenceCheck",
                name: "Reference Check Access",
                price: 1900,
              },
            ]
          : []),
        ...(formData.notificationOption !== "none"
          ? [
              {
                id: `notification_${formData.notificationOption}`,
                name: `Notification Package - ${formData.notificationOption}`,
                price: notificationPrice,
              },
            ]
          : []),
      ],
    };
  };

  useEffect(() => {
    if (!employer) navigate("/employer-login");
  }, []);

  useEffect(() => {
    if (employer && employer.companyLogo && formData.companyLogo === "") {
      setFormData((prevState) => ({
        ...prevState,
        companyLogo: employer.companyLogo,
      }));
    }
  }, [employer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle array fields that need comma-separated string to array conversion
    let processedValue = type === "checkbox" ? checked : value;

    // Convert comma-separated strings to arrays for specific fields
    if (name === "from" || name === "to") {
      // Convert to number for salary fields
      processedValue = value === "" ? "" : Number(value);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: processedValue,
    }));

    // Clear error for this field when user makes a change
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateClassifySection = () => {
    const errors = {};

    if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required";
    if (!formData.jobLocation.trim())
      errors.jobLocation = "Location is required";
    if (!formData.workspaceOption)
      errors.workspaceOption = "Workspace option is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (!formData.subcategory.trim())
      errors.subcategory = "Subcategory is required";
    if (!formData.workType) errors.workType = "Work type is required";
    if (!formData.payType) errors.payType = "Pay type is required";
    if (!formData.currency) errors.currency = "Currency is required";

    // Validate numeric fields
    if (!formData.from || formData.from === "")
      errors.from = "From amount is required";
    if (!formData.to || formData.to === "") errors.to = "To amount is required";

    // Validate that 'to' is greater than 'from'
    if (
      formData.from &&
      formData.to &&
      Number(formData.from) >= Number(formData.to)
    ) {
      errors.to = "To amount must be greater than From amount";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStageChange = (stage) => {
    if (currentStage === "Classify" && stage !== "Classify") {
      if (!validateClassifySection()) {
        alert(
          "Please complete all required fields in the Classify section before proceeding."
        );
        return;
      }
    }
    setCurrentStage(stage);
  };

  const handleClear = () => {
    setFormData({
      jobTitle: "",
      jobLocation: "",
      workspaceOption: "",
      category: "",
      subcategory: "",
      workType: "",
      payType: "",
      currency: "",
      from: "",
      to: "",
      showSalaryOnAd: true,
      jobSkills: [],
      jobKeywords: [],
      jobDescription: "",
      jobBanner: "",
      jobIndustry: "",
      postedBy: employer?._id || "",
      jobSummary: "",
      sellingPoints: [],
      videoLink: "",
      jobSalaryType: "Per Month",
      companyLogo: "",
      jobQuestions: [],
      internalReference: "",
      premiumListing: false,
      immediateStart: false,
      referencesRequired: false,
      notificationOption: "both",
      shortDescription: [],
      showShortDescription: false,
      mandatoryQuestions: [],
      selectedOptions: {},
    });
    setFormErrors({});
    setShowPayment(false);
  };

  // Handle payment success and create job
  const handlePaymentSuccess = async (paymentIntent) => {
    console.log("Payment successful:", paymentIntent);
    setShowPayment(false);
    setIsSubmittingJob(true);

    try {
      // Invalidate and refetch job queries to show the new job
      await queryClient.invalidateQueries({ queryKey: jobKeys.all });
      await queryClient.invalidateQueries({ queryKey: jobKeys.myJobs() });

      await createJobAfterPayment();
    } catch (error) {
      console.error("Error creating job after payment:", error);
      toast.error(
        "Payment successful but job creation failed. Please contact support."
      );
    } finally {
      setIsSubmittingJob(false);
    }
  };

  // Handle payment error
  const handlePaymentError = (error) => {
    console.error("Payment failed:", error);

    // Provide more specific error messages based on error type
    let errorMessage = "Payment failed. Please try again.";

    if (error?.type === "card_error") {
      errorMessage =
        "Card payment failed. Please check your card details and try again.";
    } else if (error?.type === "validation_error") {
      errorMessage = "Please check your payment information and try again.";
    } else if (error?.type === "rate_limit_error") {
      errorMessage =
        "Too many payment attempts. Please wait a moment and try again.";
    } else if (error?.code === "insufficient_funds") {
      errorMessage =
        "Insufficient funds. Please use a different payment method.";
    } else if (error?.code === "expired_card") {
      errorMessage = "Card has expired. Please use a different payment method.";
    }

    toast.error(errorMessage);
    setShowPayment(false);
  };

  // Handle payment cancellation
  const handlePaymentCancel = () => {
    setShowPayment(false);
    toast.info("Payment cancelled. You can try again when ready.");
  };

  // Job is automatically created by payment controller - no need to create again
  const createJobAfterPayment = async () => {
    try {
      toast.success("Payment successful! Job is being created...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Job posted successfully! Redirecting to My Jobs...");
      setTimeout(() => {
        navigate("/my-jobs");
      }, 1500);
    } catch (error) {
      console.error("Error in job creation flow:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    // Validate all required sections
    const errors = {};

    // Validate Classify section
    if (!validateClassifySection()) {
      setCurrentStage("Classify");
      return;
    }

    // Validate Write section (required fields)
    if (!formData.jobDescription?.trim()) {
      errors.jobDescription = "Job description is required";
    }

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Navigate to Write section if there are errors there
      if (errors.jobDescription) {
        setCurrentStage("Write");
      }
      return;
    }

    if (!employer?._id) {
      alert("You must be logged in to post a job");
      return;
    }

    setShowPayment(true);
  };

  const renderContent = () => {
    switch (currentStage) {
      case "Classify":
        return (
          <ClassifySection
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            handleClear={handleClear}
            handleStageChange={handleStageChange}
            navigate={navigate}
          />
        );
      case "Ad Types":
        return (
          <AdTypesSection
            formData={formData}
            handleChange={handleChange}
            handleStageChange={handleStageChange}
          />
        );
      case "Write":
        return (
          <WriteSection
            formData={{ ...formData, formErrors }}
            handleChange={handleChange}
            handleStageChange={handleStageChange}
          />
        );
      case "Manage":
        return (
          <ManageSection
            formData={formData}
            handleStageChange={handleStageChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmittingJob}
          />
        );
      default:
        return (
          <ClassifySection
            formData={formData}
            formErrors={formErrors}
            handleChange={handleChange}
            handleClear={handleClear}
            handleStageChange={handleStageChange}
            navigate={navigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-200 via-blue-50 to-white pb-[10vh]">
      <DHeader employer={employer} />
      <Timeline currentStage={currentStage} onStageChange={handleStageChange} />
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Post a New Job
          </h1>
          <p className="text-gray-500">
            Fill in the details below to post a new job.
          </p>
        </div>
        {renderContent()}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                Complete Payment to Post Job
              </h2>
              <p className="text-gray-600 mt-1">
                Pay to post "{formData.jobTitle}" and reach qualified candidates
              </p>
            </div>
            <div className="p-4">
              <PaymentCheckout
                paymentData={getPaymentData()}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onCancel={handlePaymentCancel}
              />
            </div>
          </div>
        </div>
      )}

      {/* Job Creation Loading Modal */}
      {isSubmittingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Creating Your Job Post
              </h3>
              <p className="text-gray-600">
                Payment successful! Setting up your job listing...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPosting;
