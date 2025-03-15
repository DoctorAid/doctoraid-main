import React, { useState, useRef } from "react";

function SettingsPage() {
  const [userInfo, setUserInfo] = useState({
    name: "Dr. John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris arcu et leo.",
    telephone: "0712345678",
    location: "",
    weekendOpenTime: "07:00",
    weekendCloseTime: "17:00",
    weekdayOpenTime: "15:00",
    weekdayCloseTime: "18:00",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [isEditing, setIsEditing] = useState({
    userInfo: false,
    contact: false,
    businessHours: false,
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
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

  const handleSave = () => {
    //sending data to the server
    console.log("Saving user data: ", userInfo);
    console.log("Profile image: ", profileImage);

    //resetting the editing state
    setIsEditing({
      userInfo: false,
      contact: false,
      businessHours: false,
    });
  };

  const formatTimeDisplay = (openTime, closeTime) => {
    return `${openTime} - ${closeTime}`;
  };

  return (
    <div className="flex bg-[#FAFAF9] w-full min-h-screen text-black">
      <div className="w-full max-w-6xl p-6 mx-auto">
        {/* User Information Section */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-2xl font-bold">User Information</h2>
            <button
              type="button"
              onClick={() => toggleEditing("userInfo")}
              className="text-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="relative w-40 h-40 mb-4 overflow-hidden">
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
                  className="flex items-center text-gray-700 font-medium"
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
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    disabled={!isEditing.userInfo}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={userInfo.description}
                    onChange={handleInputChange}
                    disabled={!isEditing.userInfo}
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Contact Section */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Contact</h2>
                <button
                  type="button"
                  onClick={() => toggleEditing("contact")}
                  className="text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-gray-700 mb-2"
                  >
                    Telephone
                  </label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={userInfo.telephone}
                    onChange={handleInputChange}
                    disabled={!isEditing.contact}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-gray-700 mb-2"
                  >
                    Location
                  </label>
                  <textarea
                    id="location"
                    name="location"
                    value={userInfo.location}
                    onChange={handleInputChange}
                    disabled={!isEditing.contact}
                    rows="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours Section */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Business Hours</h2>
                <button
                  type="button"
                  onClick={() => toggleEditing("businessHours")}
                  className="text-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/** Weekend Hours */}
                <div>
                  <label
                    htmlFor="weekendHours"
                    className="block text-gray-700 mb-2"
                  >
                    Weekends
                  </label>
                  {isEditing.businessHours ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-1/2">
                        <label className="text-xs text-gray-500 mb-1 block">
                          Open
                        </label>

                        <input
                          type="text"
                          id="weekendOpenTime"
                          name="weekendOpenTime"
                          value={userInfo.weekendOpenTime}
                          onChange={handleInputChange}
                          //disabled={!isEditing.businessHours}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="text-xs text-gray-500 mb-1 block">
                          Close
                        </label>

                        <input
                          type="text"
                          id="weekendCloseTime"
                          name="weekendCloseTime"
                          value={userInfo.weekendCloseTime}
                          onChange={handleInputChange}
                          //disabled={!isEditing.businessHours}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  )}
                </div>

                {/* Weekdays Time Selection */}
                <div>
                  <label
                    htmlFor="weekdayHours"
                    className="block text-gray-700 mb-2"
                  >
                    Weekdays
                  </label>
                  {isEditing.businessHours ? (
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
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
            className="px-12 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
