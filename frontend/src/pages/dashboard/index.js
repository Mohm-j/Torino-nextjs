import ProtectedRoute from "@/components/modules/ProtectedRoute";
import DashboardPage from "@/components/templates/DashboardPage/DashboardPage";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardPage />;
    </ProtectedRoute>
  );
};

export default Dashboard;
