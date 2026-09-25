import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import * as cartRoutesModule from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import deliveryApplicationRoutes from "./routes/deliveryApplicationRoutes.js";
dotenv.config();
const cartRoutes = cartRoutesModule.default;
// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/delivery-application",
  deliveryApplicationRoutes
);

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Soma Delivery Backend Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

console.log("Auth route mounted at /api/auth");
console.log("Admin route mounted at /api/admin");

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});