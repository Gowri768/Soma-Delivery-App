import shops from "../../data/shopData";
import ShopCard from "../shop/ShopCard";

function ShopSection() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-10 text-center text-4xl font-bold">
          🏪 Trusted Local Shops
          Support nearby businesses while enjoying fast and reliable delivery.
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ShopSection;