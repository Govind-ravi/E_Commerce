import { Helmet } from "react-helmet";

const YourOrders = () => {
  return (
    <>
      <Helmet>
        <title>Govind Hub - Your Orders</title>
        <meta
          name="description"
          content="View and manage your order history on Govind Hub. Check the status of your past orders and track your deliveries."
        />
        <meta
          name="keywords"
          content="Govind Hub, your orders, order history, track orders, manage orders"
        />
      </Helmet>

      <div className="w-[80%] rounded-r py-2 px-4">
        <h1 className="text-4xl font-semibold ">My Orders</h1>
      </div>
    </>
  );
};

export default YourOrders;
