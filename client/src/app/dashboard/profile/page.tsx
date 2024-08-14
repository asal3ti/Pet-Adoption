"use client";
import { Loading } from "@/components";
import { useMyUser } from "@/hooks/useMyUser";
import InfoProfile from "./InfoProfile";
import DeleteProfile from "./DeleteProfile";

export default function MyProfile() {
  const { user, isLoading, isError } = useMyUser();

  function formatPhoneNumber(phoneNumber: string) {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Check if the cleaned number has the right length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    // Return formatted phone number or an empty string if not valid
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber; // Return the original if it doesn't match the expected format
  }

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading user data</div>;

  return (
    <section className="container p-20">
      <div className="xl:w-2/3">
        <div className="flex justify-between items-center pe-5">
          <h1 className="text-3xl text-green-700 font-semibold">
            Account Settings
          </h1>
          <p className="bg-green-900 rounded px-4 py-2 capitalize text-white text-2xl">
            {user?.role}
          </p>
        </div>
        {/* <hr className="my-4" />
        <div className="mb-4 p-5">
          <p className="text-2xl text-green-700 font-semibold">Full Name</p>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <label>Your full name is</label>
              <p className={`bg-transparent rounded-md font-bold`}>
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <button
              type={"button"}
              className="bg-black text-white px-4 py-2 rounded hover:bg-slate-700"
            >
              Change
            </button>
          </div>
        </div> */}
        <hr className="my-4" />
        {/* Full Name */}
        <InfoProfile
          title="Full Name"
          label="Your full name is"
          type="text"
          keys={["firstName", "lastName"]}
        >
          <p className={`bg-transparent rounded-md font-bold`}>
            {user?.firstName} {user?.lastName}
          </p>
        </InfoProfile>
        <hr className="my-4" />

        {/* Email Address */}
        <InfoProfile
          title="Email Address"
          label="Your email address is"
          type="email"
          keys="email"
        >
          <p className={`bg-transparent rounded-md font-bold`}>{user.email}</p>
        </InfoProfile>
        <hr className="my-4" />

        {/* Password */}
        <InfoProfile
          title="Password"
          label="Current password"
          type="password"
          keys="password"
        >
          <input
            name="password"
            id="password"
            type="password"
            value={"**********************"}
            readOnly={true}
            className={`bg-transparent rounded-md font-bold 
            `}
          />
        </InfoProfile>
        <hr className="my-4" />

        {/* Phone Number */}
        <InfoProfile
          title="Phone Number"
          label="Current phone"
          type="text"
          keys="phone"
        >
          {user?.phone && (
            <p className={`bg-transparent rounded-md font-bold`}>
              (+1) {formatPhoneNumber(user.phone)}
            </p>
          )}
        </InfoProfile>
        <hr className="my-4" />

        {/* Delete Account */}
        <DeleteProfile />
      </div>
    </section>
  );
}
