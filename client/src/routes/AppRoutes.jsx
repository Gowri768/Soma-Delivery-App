import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "../pages/public/ProductDetails";
import PublicLayout from "../components/layout/PublicLayout";

import Cart from "../pages/public/Cart";
import Checkout from "../pages/public/Checkout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Products from "../pages/public/Products";
import Shops from "../pages/public/Shops";
import ShopDetails from "../pages/public/ShopDetails";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import MyOrders from "../pages/public/MyOrders";

import Dashboard from "../pages/shop/Dashboard";
import AddProduct from "../pages/shop/AddProduct";
import MyProducts from "../pages/shop/MyProducts";
import EditProduct from "../pages/shop/EditProduct";
import ShopOrders from "../pages/shop/ShopOrders";

import DeliveryDashboard from "../pages/Delivery/Dashboard";
import DeliveryHistory from "../pages/Delivery/DeliveryHistory";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminProducts from "../pages/admin/Products";
import AdminOrders from "../pages/admin/Orders";
import AdminDeliveryPartners from "../pages/admin/DeliveryPartners";
import AdminDeliveryApplications from "../pages/admin/DeliveryApplications";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
            PUBLIC LAYOUT
        ===================================================== */}

        <Route element={<PublicLayout />}>

          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* PUBLIC PAGES */}

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          {/* SHOPS */}

          <Route
            path="/shops"
            element={<Shops />}
          />

          {/* SINGLE SHOP */}

          <Route
            path="/shops/:shopId"
            element={<ShopDetails />}
          />

          {/* AUTH */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* PRODUCT DETAILS */}

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* =====================================================
              CUSTOMER
          ===================================================== */}

          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* =====================================================
              SHOP OWNER
          ===================================================== */}

          <Route
            path="/shop/dashboard"
            element={
              <ProtectedRoute allowedRoles={["shopOwner"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shop/add-product"
            element={
              <ProtectedRoute allowedRoles={["shopOwner"]}>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shop/my-products"
            element={
              <ProtectedRoute allowedRoles={["shopOwner"]}>
                <MyProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shop/edit-product/:id"
            element={
              <ProtectedRoute allowedRoles={["shopOwner"]}>
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shop/orders"
            element={
              <ProtectedRoute allowedRoles={["shopOwner"]}>
                <ShopOrders />
              </ProtectedRoute>
            }
          />

          {/* =====================================================
              DELIVERY PARTNER
          ===================================================== */}

          <Route
            path="/delivery/dashboard"
            element={
              <ProtectedRoute allowedRoles={["deliveryPartner"]}>
                <DeliveryDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/delivery/history"
            element={
              <ProtectedRoute allowedRoles={["deliveryPartner"]}>
                <DeliveryHistory />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* =====================================================
            ADMIN
        ===================================================== */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/delivery-partners"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDeliveryPartners />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/delivery-applications"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDeliveryApplications />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;