import { User } from "@/types/User";
import React from "react";
interface Props {
  user: User;
}

const UsersRow = ({ user }: Props) => {
  const { firstName, lastName, email, phone, role, emailVerified, _id } = user;
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

  return (
    <tr className="border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-green-900 whitespace-nowrap"
      >
        {_id.slice(0, 8)}
      </th>
      <td className="px-6 py-4">{firstName}</td>
      <td className="px-6 py-4">{lastName}</td>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">
        {phone && formatPhoneNumber(phone as string)}
      </td>
      <td className="px-6 py-4">{role}</td>
      <td className="px-6 py-4">{emailVerified ? "Yes" : "No"}</td>
    </tr>
  );
};

export default UsersRow;
