import React from 'react';

const ProfileSettings = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white-100">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
        <hr className="my-4" />
        <div className="mb-4">
          <p className="text-xl font-semibold">Email Address</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Your email address is <strong>john.doe@company.com</strong></p>
            <button className="text-blue-600 underline">Change</button>
          </div>
        </div>
        <hr className="my-4" />
        <div className="mb-4">
          <p className="text-xl font-semibold">Password</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm text-gray-500">Current Password</label>
              <input type="password" id="current-password" className="w-full border-gray-300 rounded-md shadow-sm" placeholder="***********" />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm text-gray-500">New Password</label>
              <input type="password" id="new-password" className="w-full border-gray-300 rounded-md shadow-sm" placeholder="***********" />
            </div>
          </div>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded">Save Password</button>
        </div>
        <hr className="my-4" />
        <div className="mb-10">
          <p className="text-xl font-semibold">Delete Account</p>
          <p className="bg-rose-100 text-rose-600 p-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Proceed with caution
          </p>
          <p className="mt-2">Make sure you have taken backup of your account in case you ever need to get access to your data. We will completely wipe your data. There is no way to access your account after this action.</p>
          <button className="text-sm text-rose-600 underline">Continue with deletion</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
