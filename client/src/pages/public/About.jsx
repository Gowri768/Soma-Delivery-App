import {
  Truck,
  ShoppingCart,
  Store,
  ShieldCheck,
} from "lucide-react";

function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-orange-500">
          About Soma Delivery
        </h1>

        <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto">
          Soma Delivery is a modern grocery delivery platform
          connecting customers with nearby stores to provide
          fresh groceries quickly, safely, and conveniently.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">
            Our Mission
          </h2>

          <p className="text-gray-600">
            To make everyday shopping simple by delivering
            quality products from trusted local shops directly
            to customers' doorsteps.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">
            Our Vision
          </h2>

          <p className="text-gray-600">
            To become the most trusted local delivery platform
            by combining technology, speed, and reliable service.
          </p>
        </div>

      </div>

      <h2 className="text-4xl font-bold text-center mt-16 mb-10">
        Why Choose Us?
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <Truck className="mx-auto text-orange-500" size={45} />
          <h3 className="font-bold mt-4">Fast Delivery</h3>
          <p className="text-gray-600 mt-2">
            Quick doorstep delivery.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <ShoppingCart className="mx-auto text-orange-500" size={45} />
          <h3 className="font-bold mt-4">Easy Shopping</h3>
          <p className="text-gray-600 mt-2">
            Simple and user-friendly ordering.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <Store className="mx-auto text-orange-500" size={45} />
          <h3 className="font-bold mt-4">Trusted Shops</h3>
          <p className="text-gray-600 mt-2">
            Products from verified local stores.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <ShieldCheck className="mx-auto text-orange-500" size={45} />
          <h3 className="font-bold mt-4">Secure Orders</h3>
          <p className="text-gray-600 mt-2">
            Safe and reliable shopping experience.
          </p>
        </div>

      </div>

    </div>
  );
}

export default About;