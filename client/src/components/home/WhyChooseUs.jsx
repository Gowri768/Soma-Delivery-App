import {
  Truck,
  ShieldCheck,
  Store,
  ShoppingBasket,
} from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Get groceries delivered quickly to your doorstep.",
    },
    {
      icon: ShoppingBasket,
      title: "Fresh Products",
      desc: "Quality groceries from trusted local shops.",
    },
    {
      icon: Store,
      title: "Trusted Stores",
      desc: "Verified shop owners serving your community.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Ordering",
      desc: "Safe and reliable shopping experience.",
    },
  ];

  return (
    <section className="bg-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Soma Delivery?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <Icon
                  size={45}
                  className="mx-auto text-orange-500 mb-4"
                />

                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {feature.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;