import DeliverySidebar from "./DeliverySidebar";
import DeliveryTopbar from "./DeliveryTopbar";

function DeliveryLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DeliverySidebar />

      <div className="ml-64">
        <DeliveryTopbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DeliveryLayout;