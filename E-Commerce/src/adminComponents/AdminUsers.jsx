import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const AdminUsers = () => {
  const user = useSelector((action) => action?.user?.user);

  return (
    <>
      <Helmet>
        <title>Govind Hub - Admin Users</title>
        <meta
          name="description"
          content="Manage and oversee user accounts on the Govind Hub Admin Panel. View user profiles, update information, and handle account settings."
        />
        <meta
          name="keywords"
          content="Govind Hub, admin users, manage users, user accounts, account settings"
        />
      </Helmet>

      {user.role === "user" && (
        <h1 className="text-2xl font-semibold">Only admin can view</h1>
      )}
    </>
  );
};

export default AdminUsers;
