import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getShopOrders ,updateOrderStatus, } from "../../services/orderService";

function ShopOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getShopOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    }
  };
  const handleStatus = async (orderId, status) => {
  try {
    await updateOrderStatus(orderId, status);

    fetchOrders();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Shop Orders
      </h1>

      {orders.length === 0 ? (
        <p>No Orders Yet.</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-xl">
                    {order.customer.fullName}
                  </h2>

                  <p>{order.customer.phone}</p>

                  <p>{order.customer.email}</p>

                </div>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full h-fit">
                  {order.status}
                </span>
                <div className="mt-4 flex gap-2">

  <button
    onClick={() =>
      handleStatus(order._id, "Accepted")
    }
    className="bg-orange-600 text-white px-4 py-2 rounded"
  >
    Accept
  </button>

  <button
    onClick={() =>
      handleStatus(order._id, "Rejected")
    }
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Reject
  </button>

  <button
  onClick={() =>
    handleStatus(order._id, "Delivered")
  }
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
>
  Delivered
</button>

</div>

              </div>

              <hr className="my-4" />

              <h3 className="font-semibold mb-2">
                Ordered Items
              </h3>

              {order.items.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between py-2"
                >

                  <span>
                    {item.product ? item.product.name : "Product Deleted"}
                  </span>

                  <span>
                    Qty: {item.quantity}
                  </span>

                </div>

              ))}

              <hr className="my-4" />

              <div className="flex justify-between font-bold text-lg">

                <span>Total</span>

                <span>₹{order.total}</span>

              </div>

            </div>

          ))}

        </div>
      )}

    </DashboardLayout>
  );
}

export default ShopOrders;