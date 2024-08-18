import { useSelector } from "react-redux";

const AdminUsers = () => {
  const user = useSelector((action) => action?.user?.user);

  return (
    <>
      {user.role === 'user' && <h1 className="text-2xl font-semibold">Only admin can view</h1>}
    </>
  );
};

export default AdminUsers;
