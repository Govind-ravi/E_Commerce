import { Helmet } from "react-helmet";

const AdminOrders = () => {
  return (
    <>
      <Helmet>
        <title>Govind Hub - Admin Orders</title>
        <meta
          name="description"
          content="Manage and review customer orders on the Govind Hub Admin Panel. Process, update, and track orders efficiently."
        />
        <meta
          name="keywords"
          content="Govind Hub, admin orders, manage orders, review orders, order processing"
        />
      </Helmet>

      <div>
        <p>Your Orders</p>
      </div>
    </>
  );
};
export default AdminOrders;
