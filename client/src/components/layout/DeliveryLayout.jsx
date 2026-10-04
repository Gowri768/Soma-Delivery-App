import { useEffect, useState } from "react";
import DeliverySidebar from "./DeliverySidebar";
import DeliveryTopbar from "./DeliveryTopbar";

function DeliveryLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-100">
      {/* Mobile sidebar backdrop overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <DeliverySidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-w-0 w-full lg:ml-64 lg:w-[calc(100%-16rem)]">
        <DeliveryTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="w-full min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DeliveryLayout;
