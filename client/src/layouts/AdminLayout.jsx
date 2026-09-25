import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-100">
      <AdminSidebar />

      <div className="ml-64 w-[calc(100%-16rem)] min-w-0">
        <AdminTopbar />

        <main className="w-full min-w-0 overflow-x-hidden p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;