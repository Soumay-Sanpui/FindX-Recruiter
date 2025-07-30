import React, { useEffect, useState } from "react";
import {
  AiOutlineLink,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { FaGraduationCap, FaLanguage, FaMapMarkerAlt } from "react-icons/fa";
import { MdClose, MdFilterList, MdOutlineMessage } from "react-icons/md";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";
import {
  useSearchUsers,
  useSuggestedUsers,
  useUserProfile,
} from "../hooks/useEmployer";

const SearchEmployee = () => {
  const navigate = useNavigate();

  // State for search and filters
  const [keyword, setKeyword] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [workEnv, setWorkEnv] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Pagination settings state
  const [showPaginationSettings, setShowPaginationSettings] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginationStyle, setPaginationStyle] = useState("numbered"); // 'numbered' or 'simple'

  // Check if employer is logged in
  const token = localStorage.getItem("employerToken");
  const employer = JSON.parse(localStorage.getItem("employer")) || {};

  // Search parameters for React Query
  const searchParams = {
    keyword,
    skills,
    location,
    languages,
    qualifications,
    jobTypes,
    workEnv,
    page: currentPage,
    limit: itemsPerPage,
  };

  // Use React Query hooks
  const hasSearchCriteria = !!(
    keyword ||
    skills ||
    location ||
    languages.length ||
    qualifications.length ||
    jobTypes.length ||
    workEnv.length
  );

  // Always enable search - if no criteria, it will fetch all candidates
  const {
    data: searchData = {
      users: [],
      totalPages: 1,
      currentPage: 1,
      totalUsers: 0,
    },
    isLoading: searchLoading,
    error: searchError,
    isFetching: searchFetching,
  } = useSearchUsers(searchParams, !!token);

  // Keep suggested users as fallback (not actively used but available)
  const {
    data: suggestedUsers = [],
    isLoading: suggestedLoading,
    error: suggestedError,
  } = useSuggestedUsers();

  const {
    data: userProfile,
    isLoading: profileLoading,
    error: profileError,
  } = useUserProfile(selectedUserId);

  // Derived state
  const users = searchData.users;
  const totalPages = searchData.totalPages;
  const loading = searchLoading || profileLoading;
  const isPaginating = searchFetching && !searchLoading;

  // Centralized function to handle token expiry
  const handleTokenExpiry = () => {
    toast.error("Your session has expired. Please log in again.");
    localStorage.removeItem("employerToken");
    localStorage.removeItem("employer");
    navigate("/employer-login");
  };

  // Handle errors
  useEffect(() => {
    if (searchError) {
      toast.error(
        searchError.message || "Failed to search users. Please try again."
      );
    }
    if (suggestedError) {
      toast.error(suggestedError.message || "Failed to load suggested users.");
    }
    if (profileError) {
      toast.error(profileError.message || "Failed to load user profile.");
    }
  }, [searchError, suggestedError, profileError]);

  useEffect(() => {
    if (!token) {
      navigate("/employer-login");
      return;
    }
  }, [token, navigate]);

  const handleShowAllCandidates = () => {
    // Clear all search criteria to show suggested users
    setKeyword("");
    setSkills("");
    setLocation("");
    setLanguages([]);
    setQualifications([]);
    setJobTypes([]);
    setWorkEnv([]);
    setCurrentPage(1);
    setViewingProfile(false);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    setViewingProfile(false);
    // React Query will automatically refetch when searchParams change
  };

  const viewUserProfile = (userId) => {
    setSelectedUserId(userId);
    setViewingProfile(true);
  };

  const startConversation = async (userId) => {
    if (!employer.messagesAllowed) {
      toast.warning(
        "Messaging is not enabled for your account. Please enable messaging in your settings to contact candidates."
      );
      return;
    }

    // Navigate to messages page
    navigate("/messages", { state: { userId } });
  };

  const toggleFilterSelection = (filter, value) => {
    if (filter === "qualifications") {
      setQualifications((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filter === "jobTypes") {
      setJobTypes((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filter === "workEnv") {
      setWorkEnv((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (filter === "languages") {
      setLanguages((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    // React Query will automatically refetch when currentPage changes - no need to call handleSearch
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    if (paginationStyle === "simple") {
      return (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            Next
          </button>
        </div>
      );
    }

    // Numbered pagination with smart truncation
    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots.filter(
        (page, index, array) => array.indexOf(page) === index
      );
    };

    return (
      <div className="flex justify-center mt-6">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            Prev
          </button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-3 py-2 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`px-3 py-2 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-blue-600 hover:bg-blue-50 border"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    );
  };

  const renderUserCard = (user) => (
    <div
      key={user._id}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          {user.dream_job_title && (
            <p className="text-gray-600 text-sm">{user.dream_job_title}</p>
          )}
        </div>
        <button
          onClick={() => viewUserProfile(user._id)}
          className="text-blue-600 text-sm hover:underline"
        >
          View Profile
        </button>
      </div>

      {user.resident_country && (
        <div className="flex items-center mt-2 text-gray-600 text-sm">
          <FaMapMarkerAlt className="mr-2" />
          <span>{user.resident_country}</span>
        </div>
      )}

      {user.highest_qualification && (
        <div className="flex items-center mt-2 text-gray-600 text-sm">
          <FaGraduationCap className="mr-2" />
          <span>{user.highest_qualification}</span>
        </div>
      )}

      {user.known_language && user.known_language.length > 0 && (
        <div className="flex items-center mt-2 text-gray-600 text-sm">
          <FaLanguage className="mr-2" />
          <span>
            {user.known_language.slice(0, 3).join(", ")}
            {user.known_language.length > 3
              ? ` +${user.known_language.length - 3} more`
              : ""}
          </span>
        </div>
      )}

      {user.skills_and_capabilities &&
        user.skills_and_capabilities.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-1">Skills:</p>
            <div className="flex flex-wrap gap-1">
              {user.skills_and_capabilities.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
              {user.skills_and_capabilities.length > 5 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{user.skills_and_capabilities.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

      {user.preferred_job_types && user.preferred_job_types.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-1">Looking for:</p>
          <div className="flex flex-wrap gap-1">
            {user.preferred_job_types.map((type, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderPaginationSettings = () => {
    if (!showPaginationSettings) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Pagination Settings</h3>
            <button
              onClick={() => setShowPaginationSettings(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <MdClose size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Items per page
              </label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value={6}>6 per page</option>
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={36}>36 per page</option>
                <option value={48}>48 per page</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pagination style
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="numbered"
                    value="numbered"
                    checked={paginationStyle === "numbered"}
                    onChange={(e) => setPaginationStyle(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="numbered" className="text-sm">
                    Numbered (1 2 3 ... 10)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="simple"
                    value="simple"
                    checked={paginationStyle === "simple"}
                    onChange={(e) => setPaginationStyle(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="simple" className="text-sm">
                    Simple (Previous / Next)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              onClick={() => setShowPaginationSettings(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowPaginationSettings(false);
                toast.success("Pagination settings updated!");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderUserProfile = () => {
    if (!userProfile) return null;

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
            {userProfile.dream_job_title && (
              <p className="text-lg text-gray-600">
                {userProfile.dream_job_title}
              </p>
            )}
          </div>
          <button
            onClick={() => setViewingProfile(false)}
            className="text-blue-600 hover:underline"
          >
            Back to Results
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

            {userProfile.resident_country && (
              <div className="flex items-center mb-3">
                <FaMapMarkerAlt className="text-gray-500 mr-3" />
                <span>Location: {userProfile.resident_country}</span>
              </div>
            )}

            {userProfile.highest_qualification && (
              <div className="flex items-center mb-3">
                <FaGraduationCap className="text-gray-500 mr-3" />
                <span>Education: {userProfile.highest_qualification}</span>
              </div>
            )}

            {userProfile.known_language &&
              userProfile.known_language.length > 0 && (
                <div className="flex items-center mb-3">
                  <FaLanguage className="text-gray-500 mr-3" />
                  <span>
                    Languages: {userProfile.known_language.join(", ")}
                  </span>
                </div>
              )}

            {userProfile.skills_and_capabilities &&
              userProfile.skills_and_capabilities.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">
                    Skills & Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills_and_capabilities.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {userProfile.preferred_job_types &&
              userProfile.preferred_job_types.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">
                    Preferred Job Types
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.preferred_job_types.map((type, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {userProfile.work_env_preferences &&
              userProfile.work_env_preferences.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">
                    Work Environment Preferences
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.work_env_preferences.map((env, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded"
                      >
                        {env}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {userProfile.relocation &&
              userProfile.relocation.preferred_location &&
              userProfile.relocation.preferred_location.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">
                    Preferred Locations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.relocation.preferred_location.map(
                      (loc, index) => (
                        <span
                          key={index}
                          className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                        >
                          {loc}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Professional Details</h3>

            {userProfile.education && userProfile.education.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium mb-2">Education</h4>
                {userProfile.education.map((edu, index) => (
                  <div
                    key={index}
                    className="mb-3 border-l-2 border-blue-400 pl-3"
                  >
                    <p className="font-medium">{edu.course_name}</p>
                    <p className="text-sm text-gray-600">
                      {edu.institute_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {edu.year_of_graduation}
                      {edu.grade && ` • Grade: ${edu.grade}`}
                    </p>
                    {edu.currently_pursuing && (
                      <p className="text-xs text-blue-600 mt-1">
                        Currently Pursuing
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {userProfile.work_history &&
              userProfile.work_history.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">Work Experience</h4>
                  {userProfile.work_history.map((work, index) => (
                    <div
                      key={index}
                      className="mb-3 border-l-2 border-green-400 pl-3"
                    >
                      <p className="font-medium">{work.past_job_title}</p>
                      <p className="text-sm text-gray-600">
                        {work.past_company_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(
                          work.past_job_start_date
                        ).toLocaleDateString()}{" "}
                        -{new Date(work.past_job_end_date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {work.past_employment_type} • {work.past_job_location}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            {userProfile.externalLinks && (
              <div className="mb-6">
                <h4 className="text-md font-medium mb-2">External Links</h4>
                {userProfile.externalLinks.linkedin_link && (
                  <a
                    href={userProfile.externalLinks.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline mb-2"
                  >
                    <AiOutlineLink className="mr-2" /> LinkedIn
                  </a>
                )}
                {userProfile.externalLinks.github_link && (
                  <a
                    href={userProfile.externalLinks.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline mb-2"
                  >
                    <AiOutlineLink className="mr-2" /> GitHub
                  </a>
                )}
                {userProfile.externalLinks.personal_website_link && (
                  <a
                    href={userProfile.externalLinks.personal_website_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline mb-2"
                  >
                    <AiOutlineLink className="mr-2" /> Personal Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Resume section removed - resumes are not shown to employers */}

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => startConversation(userProfile._id)}
            disabled={!employer.messagesAllowed}
            className={`flex items-center px-4 py-2 rounded ${
              employer.messagesAllowed
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <MdOutlineMessage className="mr-2" />
            Contact Candidate
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Find Candidates</h1>
      {/* Clear Search Button */}
      <div className="mb-4">
        <button
          onClick={handleShowAllCandidates}
          className="bg-gray-300 px-4 py-2 hover:bg-blue-800 hover:text-white w-max"
        >
          {hasSearchCriteria
            ? "Clear Search & Show All"
            : "Show All Candidates"}
        </button>
      </div>

      {/* Search Form */}
      <div className="bg-white p-5 border border-blue-800 shadow-md mb-6">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, skills, or job title"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full border p-3 pl-10"
                />
                <AiOutlineSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-100 text-gray-700 px-4 py-2 flex items-center hover:bg-gray-200"
              >
                <MdFilterList className="mr-2" />
                Filters
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {showFilters && (
          <div className="mt-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, JavaScript, Python"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate skills with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. New York, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="space-y-2">
                  {[
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Chinese",
                    "Hindi",
                    "Arabic",
                  ].map((lang) => (
                    <div key={lang} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`lang-${lang}`}
                        checked={languages.includes(lang)}
                        onChange={() =>
                          toggleFilterSelection("languages", lang)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={`lang-${lang}`} className="text-sm">
                        {lang}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <div className="space-y-2">
                  {["High School", "Bachelors", "Masters", "PhD"].map(
                    (qual) => (
                      <div key={qual} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`qual-${qual}`}
                          checked={qualifications.includes(qual)}
                          onChange={() =>
                            toggleFilterSelection("qualifications", qual)
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`qual-${qual}`} className="text-sm">
                          {qual}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Types
                </label>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`type-${type}`}
                          checked={jobTypes.includes(type)}
                          onChange={() =>
                            toggleFilterSelection("jobTypes", type)
                          }
                          className="mr-2"
                        />
                        <label htmlFor={`type-${type}`} className="text-sm">
                          {type}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Environment
                </label>
                <div className="space-y-2">
                  {["Startup", "Corporate", "NGO", "Freelance", "Remote"].map(
                    (env) => (
                      <div key={env} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`env-${env}`}
                          checked={workEnv.includes(env)}
                          onChange={() => toggleFilterSelection("workEnv", env)}
                          className="mr-2"
                        />
                        <label htmlFor={`env-${env}`} className="text-sm">
                          {env}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center my-10">
          <Loader />
        </div>
      ) : searchError ? (
        <div className="bg-red-50 border border-red-200 p-8 text-center rounded-lg">
          <h3 className="text-lg font-medium text-red-700 mb-2">
            Search Error
          </h3>
          <p className="text-red-600 mb-4">
            {searchError.message || "Failed to search users. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      ) : viewingProfile ? (
        renderUserProfile()
      ) : (
        <>
          {users.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  {hasSearchCriteria
                    ? `Search Results (${
                        searchData.totalUsers || users.length
                      })`
                    : `All Candidates (${
                        searchData.totalUsers || users.length
                      })`}
                  {isPaginating && (
                    <span className="text-sm text-gray-500 ml-2">
                      (Loading...)
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => setShowPaginationSettings(true)}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  title="Pagination Settings"
                >
                  <AiOutlineSetting size={20} />
                </button>
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
                  isPaginating ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {users.map((user) => renderUserCard(user))}
              </div>
              {renderPagination()}
            </>
          ) : (
            <div className="bg-gray-50 p-8 text-center rounded-lg">
              <AiOutlineUser size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {hasSearchCriteria
                  ? "No candidates found"
                  : "No candidates available"}
              </h3>
              <p className="text-gray-500">
                {hasSearchCriteria
                  ? "Try adjusting your search criteria to find more candidates."
                  : "No candidates are currently registered in the system."}
              </p>
            </div>
          )}
        </>
      )}

      {/* Pagination Settings Modal */}
      {renderPaginationSettings()}
    </div>
  );
};

export default SearchEmployee;
