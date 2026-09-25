import {
  Truck,
  ShoppingCart,
  Store,
  ShieldCheck,
  Heart,
  Users,
} from "lucide-react";
import BackButton from "../../components/common/BackButton";
function About() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Get your everyday essentials delivered quickly to your doorstep.",
    },
    {
      icon: ShoppingCart,
      title: "Easy Shopping",
      description:
        "Browse products, add them to your cart, and place orders with ease.",
    },
    {
      icon: Store,
      title: "Trusted Shops",
      description:
        "Shop from local stores and discover products available near you.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Orders",
      description:
        "We aim to provide a safe and reliable shopping experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 pt-6">
      <BackButton />
    </div>
      {/* Hero */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <div className="inline-flex items-center justify-center bg-orange-100 p-4 rounded-2xl mb-6">
            <Heart
              size={36}
              className="text-orange-500"
            />
          </div>

          <h1 className="text-5xl font-bold text-gray-800">
            About{" "}
            <span className="text-orange-500">
              Soma Delivery
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Soma Delivery is a modern grocery delivery platform
            that connects customers with local shops, making
            everyday shopping simple, convenient, and accessible.
          </p>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-8">

            <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <Heart
                size={28}
                className="text-orange-500"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our mission is to make everyday shopping simple
              by connecting customers with trusted local shops
              and helping them get quality products delivered
              conveniently to their doorstep.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-8">

            <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-5">
              <Users
                size={28}
                className="text-orange-500"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Vision
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our vision is to build a reliable local delivery
              ecosystem where customers, shop owners, and delivery
              partners can connect through technology.
            </p>

          </div>

        </div>

      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose Us?
          </h2>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Everything you need for a simple and convenient
            local shopping experience.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-7 text-center"
              >

                <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">

                  <Icon
                    size={32}
                    className="text-orange-500"
                  />

                </div>

                <h3 className="font-bold text-xl text-gray-800 mt-5">
                  {feature.title}
                </h3>

                <p className="text-gray-500 mt-3 leading-relaxed">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </section>

      {/* Simple CTA */}
      <section className="bg-orange-500">

        <div className="max-w-5xl mx-auto px-6 py-14 text-center">

          <h2 className="text-3xl font-bold text-white">
            Ready to start shopping?
          </h2>

          <p className="text-orange-50 mt-3">
            Explore products from local shops and place your
            first order today.
          </p>

          <a
            href="/products"
            className="inline-block mt-6 bg-white text-orange-600 hover:bg-orange-50 px-7 py-3 rounded-xl font-bold transition"
          >
            Explore Products
          </a>

        </div>

      </section>

    </div>
  );
}

export default About;