import ShopSidebar from "./ShopSidebar";
import ShopTopbar from "./ShopTopbar";

function ShopLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      <ShopSidebar />

      <div className="ml-64">

        <ShopTopbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default ShopLayout;