import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    house: "",
    village: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await placeOrder(address);

      alert(data.message);

      navigate("/my-orders");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to place order"
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 space-y-4"
      >

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="house"
          placeholder="House No / Street"
          value={address.house}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="village"
          placeholder="Village"
          value={address.village}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg"
        >
          Place Order
        </button>

      </form>

    </div>
  );
}

export default Checkout;