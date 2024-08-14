const UsersColumn = () => {
  return (
    <thead className="text-md text-green-800 uppercase bg-transparen border-b-green-700">
      <tr>
        <th scope="col" className="px-6 py-3">
          User ID
        </th>
        <th scope="col" className="px-6 py-3">
          First Name
        </th>
        <th scope="col" className="px-6 py-3">
          Last Name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Phone
        </th>
        <th scope="col" className="px-6 py-3">
          Role
        </th>
        <th scope="col" className="px-6 py-3">
          Email Verified
        </th>
      </tr>
    </thead>
  );
};

export default UsersColumn;
