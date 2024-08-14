"use client";
import { useUsers } from "@/hooks/useUsers";
import UsersColumn from "./UsersColumn";
import UsersRow from "./UsersRow";

const UsersTable = () => {
  const { users } = useUsers();
  console.log(users);
  return (
    <div className="relative overflow-x-auto mt-10">
      <table className="w-full text-md text-left rtl:text-right text-green-800">
        <UsersColumn />
        <tbody>
          {users.map((user) => (
            <UsersRow key={user._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
