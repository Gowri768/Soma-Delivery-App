function ShopTopbar() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-30">

      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Shop Owner Panel
        </h2>
      </div>

      <div className="text-sm text-gray-500">
        Manage your shop
      </div>

    </header>
  );
}

export default ShopTopbar;