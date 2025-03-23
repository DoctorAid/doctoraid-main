import React, { useState, useRef, useEffect } from "react";
import { Edit } from 'lucide-react';
import { createDoctorProfile } from "../api/settingsPageAPI"; // Import the API function

function SettingsPage() {
  const [userInfo, setUserInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris arcu et leo.",
    contactNumber: "0712345678",
    email: "john.doe@example.com",
    ppLocation: "", // Practice location
    specialization: "", // Added specialization
    hospital: "", // Added hospital
    certification: "", // Added certification
    address: {
      line1: "",
      line2: "",
      city: ""
    },
    schedule: {
      weekdays: "",
      weekends: ""
    }
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  const [isEditing, setIsEditing] = useState({
    userInfo: false,
    contact: false,
    businessHours: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fileInputRef = useRef(null);

  // Handle regular input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects like address and schedule
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserInfo({
        ...userInfo,
        [parent]: {
          ...userInfo[parent],
          [child]: value
        }
      });
    } else {
      setUserInfo({
        ...userInfo,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleEditing = (section) => {
    setIsEditing({
      ...isEditing,
      [section]: !isEditing[section],
    });
  };

  // Create a function to format time values for display
  const formatTimeDisplay = (openTime, closeTime) => {
    return `${openTime} - ${closeTime}`;
  };

  // Function to prepare data for the API
  const prepareDataForAPI = () => {
    // Update schedule format from weekday/weekend time inputs
    const scheduleData = {
      weekdays: userInfo.schedule.weekdays || `${userInfo.weekdayOpenTime} - ${userInfo.weekdayCloseTime}`,
      weekends: userInfo.schedule.weekends || `${userInfo.weekendOpenTime} - ${userInfo.weekendCloseTime}`
    };
    
    // Prepare complete doctor data
    return {
      doctorId: `DR-${Math.floor(10000 + Math.random() * 90000)}`, // Generate a random doctor ID
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      contactNumber: userInfo.contactNumber,
      ppLocation: userInfo.ppLocation || "Colombo", // Default to Colombo if not specified
      description: userInfo.description,
      schedule: scheduleData,
      specialization: userInfo.specialization || "General Medicine", // Default value
      hospital: userInfo.hospital || "Not specified",
      address: {
        line1: userInfo.address.line1 || "",
        line2: userInfo.address.line2 || "",
        city: userInfo.address.city || "Colombo" // Default city
      },
      certification: userInfo.certification || "SLMC Registration" // Default certification
    };
  };

  // Handle save to API
  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSaveSuccess(false);
      
      // Prepare data for the API
      const doctorData = prepareDataForAPI();
      
      console.log("Saving doctor data:", doctorData);
      
      // Call the API function
      const result = await createDoctorProfile(doctorData);
      
      console.log("API Response:", result);
      
      // Set success message
      setSaveSuccess(true);
      
      // Reset editing states
      setIsEditing({
        userInfo: false,
        contact: false,
        businessHours: false,
      });
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.message || "An error occurred while saving your profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-100 w-full h-full text-gray-800 font-['Raleway',sans-serif] animate-pageTransition overflow-auto">
      <div className="w-full max-w-6xl p-6 mx-auto">
        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 shadow-sm">
            {error}
          </div>
        )}
        
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-6 shadow-sm">
            Doctor profile created successfully!
          </div>
        )}
        
        {/* User Information Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-[#295567]/5 to-white">
            <h2 className="text-xl font-bold text-gray-800">User Information</h2>
            <button
              type="button"
              onClick={() => toggleEditing("userInfo")}
              className="text-[#295567] hover:bg-[#295567]/10 p-2 rounded-full transition-all duration-300"
            >
              <Edit size={18} />
            </button>
          </div>

          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-full border-4 border-[#295567]/10">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="User profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/160x160"
                      alt="Default profile"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex items-center text-[#295567] font-medium hover:bg-[#295567]/10 px-3 py-1 rounded-full transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Change Photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              {/* User Information Fields */}
              <div className="md:w-2/3">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-600 mb-2 text-sm">
                      First Name
                    </label>
                    <div className={`relative ${isEditing.userInfo ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing.userInfo}
                        className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.userInfo ? 'border-[#295567]/50' : ''}`}
                      />
                      {isEditing.userInfo && (
                        <div className="absolute top-0 right-0 bg-[#295567] text-white text-xs px-2 py-1 rounded-bl-xl rounded-tr-xl">
                          Editing
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-600 mb-2 text-sm">
                      Last Name
                    </label>
                    <div className={`relative ${isEditing.userInfo ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing.userInfo}
                        className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.userInfo ? 'border-[#295567]/50' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="specialization" className="block text-gray-600 mb-2 text-sm">
                    Specialization
                  </label>
                  <div className={`relative ${isEditing.userInfo ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                    <input
                      type="text"
                      id="specialization"
                      name="specialization"
                      value={userInfo.specialization}
                      onChange={handleInputChange}
                      disabled={!isEditing.userInfo}
                      placeholder="E.g. Cardiology, General Medicine, Pediatrics"
                      className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.userInfo ? 'border-[#295567]/50' : ''}`}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="hospital" className="block text-gray-600 mb-2 text-sm">
                    Hospital
                  </label>
                  <div className={`relative ${isEditing.userInfo ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                    <input
                      type="text"
                      id="hospital"
                      name="hospital"
                      value={userInfo.hospital}
                      onChange={handleInputChange}
                      disabled={!isEditing.userInfo}
                      placeholder="E.g. National Hospital of Sri Lanka"
                      className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.userInfo ? 'border-[#295567]/50' : ''}`}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="certification" className="block text-gray-600 mb-2 text-sm">
                    Certification
                  </label>
                  <div className={`relative ${isEditing.userInfo ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                    <input
                      type="text"
                      id="certification"
                      name="certification"
                      value={userInfo.certification}
                      onChange={handleInputChange}
                      disabled={!isEditing.userInfo}
                      placeholder="E.g. Sri Lanka Medical Council Registration"
                      className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.userInfo ? 'border-[#295567]/50' : ''}`}
                    />
                  </div>
                </div>
                
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-600 mb-2 text-sm"
                  >
                    Description
                  </label>
                  <div className={`relative ${isEditing.userInfo ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                    <textarea
                      id="description"
                      name="description"
                      value={userInfo.description}
                      onChange={handleInputChange}
                      disabled={!isEditing.userInfo}
                      rows="4"
                      className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.userInfo ? 'border-[#295567]/50' : ''}`}
                    />
                    {isEditing.userInfo && (
                      <div className="absolute top-0 right-0 bg-[#295567] text-white text-xs px-2 py-1 rounded-bl-xl rounded-tr-xl">
                        Editing
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Contact Section */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 h-full overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-[#295567]/5 to-white">
                <h2 className="text-xl font-bold text-gray-800">Contact</h2>
                <button
                  type="button"
                  onClick={() => toggleEditing("contact")}
                  className="text-[#295567] hover:bg-[#295567]/10 p-2 rounded-full transition-all duration-300"
                >
                  <Edit size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 mb-2 text-sm"
                  >
                    Email
                  </label>
                  <div className={`relative ${isEditing.contact ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      disabled={!isEditing.contact}
                      className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.contact ? 'border-[#295567]/50' : ''}`}
                    />
                    {isEditing.contact && (
                      <div className="absolute top-0 right-0 bg-[#295567] text-white text-xs px-2 py-1 rounded-bl-xl rounded-tr-xl">
                        Editing
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-gray-600 mb-2 text-sm"
                  >
                    Telephone
                  </label>
                  <div className={`relative ${isEditing.contact ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={userInfo.contactNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing.contact}
                      className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.contact ? 'border-[#295567]/50' : ''}`}
                    />
                  </div>
                </div>
                
                <div>
                  <label
                    htmlFor="ppLocation"
                    className="block text-gray-600 mb-2 text-sm"
                  >
                    Practice Location
                  </label>
                  <div className={`relative ${isEditing.contact ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                    <input
                      type="text"
                      id="ppLocation"
                      name="ppLocation"
                      value={userInfo.ppLocation}
                      onChange={handleInputChange}
                      disabled={!isEditing.contact}
                      placeholder="Enter your practice location"
                      className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.contact ? 'border-[#295567]/50' : ''}`}
                    />
                  </div>
                </div>
                
                {/* Address Fields */}
                <div>
                  <label className="block text-gray-600 mb-2 text-sm">Address</label>
                  <div className="space-y-2">
                    <div className={`relative ${isEditing.contact ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                      <input
                        type="text"
                        id="address.line1"
                        name="address.line1"
                        value={userInfo.address.line1}
                        onChange={handleInputChange}
                        disabled={!isEditing.contact}
                        placeholder="Address Line 1"
                        className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.contact ? 'border-[#295567]/50' : ''}`}
                      />
                    </div>
                    <div className={`relative ${isEditing.contact ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                      <input
                        type="text"
                        id="address.line2"
                        name="address.line2"
                        value={userInfo.address.line2}
                        onChange={handleInputChange}
                        disabled={!isEditing.contact}
                        placeholder="Address Line 2 (optional)"
                        className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.contact ? 'border-[#295567]/50' : ''}`}
                      />
                    </div>
                    <div className={`relative ${isEditing.contact ? 'bg-white' : 'bg-[#FAFAF9]'} rounded-xl transition-colors duration-300`}>
                      <input
                        type="text"
                        id="address.city"
                        name="address.city"
                        value={userInfo.address.city}
                        onChange={handleInputChange}
                        disabled={!isEditing.contact}
                        placeholder="City"
                        className={`w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300 ${isEditing.contact ? 'border-[#295567]/50' : ''}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours Section */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 h-full overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-[#295567]/5 to-white">
                <h2 className="text-xl font-bold text-gray-800">Business Hours</h2>
                <button
                  type="button"
                  onClick={() => toggleEditing("businessHours")}
                  className="text-[#295567] hover:bg-[#295567]/10 p-2 rounded-full transition-all duration-300"
                >
                  <Edit size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/** Weekend Hours */}
                <div>
                  <label
                    htmlFor="weekendHours"
                    className="block text-gray-600 mb-2 text-sm"
                  >
                    Weekends
                  </label>
                  {isEditing.businessHours ? (
                    <div className="relative">
                      <div className="flex items-center space-x-2">
                        <div className="w-1/2">
                          <label className="text-xs text-gray-500 mb-1 block">
                            Open
                          </label>

                          <input
                            type="time"
                            id="weekendOpenTime"
                            name="weekendOpenTime"
                            value={userInfo.weekendOpenTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-[#295567]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="text-xs text-gray-500 mb-1 block">
                            Close
                          </label>

                          <input
                            type="time"
                            id="weekendCloseTime"
                            name="weekendCloseTime"
                            value={userInfo.weekendCloseTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-[#295567]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 bg-[#295567] text-white text-xs px-2 py-1 rounded-bl-xl rounded-tr-xl">
                        Editing
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={formatTimeDisplay(
                        userInfo.weekendOpenTime,
                        userInfo.weekendCloseTime
                      )}
                      disabled
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-[#FAFAF9]"
                    />
                  )}
                </div>

                {/* Weekdays Time Selection */}
                <div>
                  <label
                    htmlFor="weekdayHours"
                    className="block text-gray-600 mb-2 text-sm"
                  >
                    Weekdays
                  </label>
                  {isEditing.businessHours ? (
                    <div className="relative">
                      <div className="flex items-center space-x-2">
                        <div className="w-1/2">
                          <label className="text-xs text-gray-500 mb-1 block">
                            Open
                          </label>
                          <input
                            type="time"
                            id="weekdayOpenTime"
                            name="weekdayOpenTime"
                            value={userInfo.weekdayOpenTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-[#295567]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="text-xs text-gray-500 mb-1 block">
                            Close
                          </label>
                          <input
                            type="time"
                            id="weekdayCloseTime"
                            name="weekdayCloseTime"
                            value={userInfo.weekdayCloseTime}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-[#295567]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#295567] transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 bg-[#295567] text-white text-xs px-2 py-1 rounded-bl-xl rounded-tr-xl">
                        Editing
                      </div>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={formatTimeDisplay(
                        userInfo.weekdayOpenTime,
                        userInfo.weekdayCloseTime
                      )}
                      disabled
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-[#FAFAF9]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className={`px-12 py-2 ${isLoading ? 'bg-gray-400' : 'bg-[#295567] hover:bg-[#295567]/90'} text-white rounded-xl transition-all duration-300 shadow-sm`}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;