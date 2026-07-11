function ShopCard({ shop }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
      <img
        src={shop.image}
        alt={shop.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold">{shop.name}</h3>

        <p className="mt-2 text-gray-500">
          {shop.category}
        </p>

        <p className="mt-3 text-orange-600 font-semibold">
          ⭐ {shop.rating}
        </p>
      </div>
    </div>
  );
}

export default ShopCard;