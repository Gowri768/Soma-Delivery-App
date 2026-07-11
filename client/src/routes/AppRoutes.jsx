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
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import Dashboard from "../pages/shop/Dashboard";
import AddProduct from "../pages/shop/AddProduct";
import MyProducts from "../pages/shop/MyProducts";
import EditProduct from "../pages/shop/EditProduct";
import MyOrders from "../pages/public/MyOrders";
import ShopOrders from "../pages/shop/ShopOrders";
import ProtectedRoute from "./ProtectedRoute";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/products" element={<Products />} />

          <Route path="/shops" element={<Shops />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
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
  path="/product/:id"
  element={<ProductDetails />}
  
/>
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
<Route
  path="/shop/orders"
  element={
    <ProtectedRoute allowedRoles={["shopOwner"]}>
      <ShopOrders />
    </ProtectedRoute>
  }
/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}


export default AppRoutes;