import Button from "../ui/Button";
import deliveryImage from "../../assets/images/delivery.png";
import { useNavigate } from "react-router-dom";
function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-orange-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-20 lg:flex-row">

        {/* Left Content */}
        <div className="max-w-2xl">

          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-gray-900">
            Everything You Need,
            <span className="block text-orange-600">
              Delivered Across Your Village
            </span>
          </h1>

          <p className="mb-8 text-lg text-gray-600">
            Order groceries, vegetables, dairy products,
            medicines, and daily essentials from trusted
            local shops in just a few clicks.
          </p>

          <div className="flex gap-4">
           <Button
  text="Shop Now"
  onClick={() => navigate("/products")}
/>

<Button
  text="Explore Shops"
  variant="secondary"
  onClick={() => navigate("/shops")}
/>
          </div>

        </div>

        {/* Right Image */}

        <div className="flex justify-center">

          <img
  src={deliveryImage}
  alt="Fresh Grocery Delivery"
  className="w-full max-w-lg rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
/>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;