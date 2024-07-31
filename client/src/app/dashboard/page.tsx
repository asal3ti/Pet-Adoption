import ProtectedRoute from "@/components/ProtectedRoute";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* Your dashboard content */}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
