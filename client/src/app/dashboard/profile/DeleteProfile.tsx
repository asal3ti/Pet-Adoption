import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { deleteUser } from "@/services/userService";
import { tokenAtom, userAtom } from "@/store/atoms";
import { User } from "@/types/User";

const DeleteProfile = () => {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const router = useRouter();

  const [isConfirming, setIsConfirming] = useState(false);

  const deleteAccount = async () => {
    try {
      const { _id } = user as User;
      await deleteUser(_id, token);

      // Clear local storage
      localStorage.removeItem("jwt-token");

      // Reset atoms
      setToken("");
      setUser(null);

      // Navigate to home or login page
      router.push("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsConfirming(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirming(false);
    await deleteAccount();
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  return (
    <div className="mb-4 p-5">
      <p className="text-2xl text-red-700 font-semibold mb-2">Delete Account</p>
      <p className="bg-rose-100 text-rose-600 p-4 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Proceed with caution
      </p>
      <p className="my-4 leading-relaxed font-semibold">
        Make sure you have taken backup of your account in case you ever need to
        get access to your data. We will completely wipe your data. There is no
        way to access your account after this action.
      </p>
      <button
        onClick={handleDeleteClick}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
      >
        Continue with deletion
      </button>
      {isConfirming && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold">
              Are you sure you want to delete your account?
            </h2>
            <p className="mt-4">This action cannot be undone.</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Yes, delete my account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProfile;
