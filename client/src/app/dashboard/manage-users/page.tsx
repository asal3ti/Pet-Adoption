import UsersTable from "./UsersTable";

export default function page() {
  return (
    <section className="container p-20">
      <div className="flex justify-between items-center pe-5">
        <h1 className="text-3xl text-green-700 font-semibold">Manage Users</h1>
      </div>
      <UsersTable />
    </section>
  );
}
