function DeliveryTopbar() {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-30">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Delivery Partner Panel
        </h2>
      </div>

      <div className="text-sm text-gray-500">
        Manage your deliveries
      </div>
    </header>
  );
}

export default DeliveryTopbar;