import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const user = useSelector((action) => action?.user?.user);

  return (
    <>
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
