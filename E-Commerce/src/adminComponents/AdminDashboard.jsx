import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const user = useSelector((action) => action?.user?.user);

  return (
    <>
      <Helmet>
        <title>Govind Hub - Admin Dashboard</title>
        <meta
          name="description"
          content="Access and manage your store's overall performance on the Govind Hub Admin Dashboard. View key metrics, statistics, and insights."
        />
        <meta
          name="keywords"
          content="Govind Hub, admin dashboard, store management, performance metrics, admin panel"
        />
      </Helmet>

      <div>
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Welcome, {user.name}!</h3>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
