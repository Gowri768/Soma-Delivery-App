import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold">
          No Orders Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-6"
          >

            <div className="flex justify-between mb-4">

              <h2 className="font-bold">
                Order ID:
                {" "}
                {order._id}
              </h2>

              <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full">
                {order.status}
              </span>

            </div>

            <p>
              Total:
              {" "}
              <strong>₹{order.total}</strong>
            </p>

            <p className="mt-2">
              Ordered On:
              {" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyOrders;