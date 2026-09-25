import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";

// ===============================
// CUSTOMER - PLACE ORDER
// ===============================

export const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethod = "COD" } = req.body;

    // ==========================================
    // VALIDATE PAYMENT METHOD
    // ==========================================

    const allowedPaymentMethods = ["COD", "ONLINE"];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // ==========================================
    // GET CART
    // ==========================================

    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // ==========================================
    // FINAL STOCK CHECK
    // ==========================================

    for (const item of cart.items) {
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message:
            "One of the products in your cart no longer exists",
        });
      }

      if (item.quantity > item.product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${item.product.stock} item(s) of "${item.product.name}" available in stock`,
        });
      }

      if (item.product.stock <= 0) {
        return res.status(400).json({
          success: false,
          message: `"${item.product.name}" is out of stock`,
        });
      }
    }

    // ==========================================
    // CALCULATE ORDER TOTAL
    // ==========================================

    const subtotal = cart.items.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );

    const deliveryCharge = 20;
    const total = subtotal + deliveryCharge;

    // ==========================================
    // CREATE ORDER ITEMS
    // ==========================================

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      shopOwner: item.product.shopOwner,
    }));

    console.log("Order Items:", orderItems);

    // ==========================================
    // REDUCE STOCK
    // ==========================================

    for (const item of cart.items) {
      item.product.stock -= item.quantity;

      await item.product.save();
    }

    // ==========================================
    // PAYMENT STATUS
    // ==========================================

    const paymentStatus = "Pending";

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = await Order.create({
      customer: req.user.id,
      items: orderItems,
      address,
      subtotal,
      deliveryCharge,
      total,
      paymentMethod,
      paymentStatus,
    });

    // ==========================================
    // CLEAR CART
    // ==========================================

    cart.items = [];

    await cart.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,
      message:
        paymentMethod === "COD"
          ? "Order placed successfully with Cash on Delivery"
          : "Order created. Continue to online payment.",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// CUSTOMER - MOCK ONLINE PAYMENT
// ===============================

export const processMockPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    // ==========================================
    // VALIDATE ORDER ID
    // ==========================================

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    // ==========================================
    // FIND CUSTOMER'S ORDER
    // ==========================================

    const order = await Order.findOne({
      _id: orderId,
      customer: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ==========================================
    // CHECK PAYMENT METHOD
    // ==========================================

    if (order.paymentMethod !== "ONLINE") {
      return res.status(400).json({
        success: false,
        message:
          "This order is not an online payment order",
      });
    }

    // ==========================================
    // CHECK CURRENT PAYMENT STATUS
    // ==========================================

    if (order.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Payment has already been completed",
      });
    }

    // ==========================================
    // GENERATE MOCK TRANSACTION ID
    // ==========================================

    const transactionId =
      "MOCK_TXN_" +
      Date.now() +
      "_" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    // ==========================================
    // MARK PAYMENT AS PAID
    // ==========================================

    order.paymentStatus = "Paid";

    await order.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      message: "Payment successful",
      transactionId,
      order,
    });
  } catch (error) {
    console.error(
      "Mock payment error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Payment failed",
    });
  }
};

// ===============================
// CUSTOMER - MY ORDERS
// ===============================

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// SHOP OWNER - GET SHOP ORDERS
// ===============================

export const getShopOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.shopOwner": req.user.id,
    })
      .populate(
        "customer",
        "fullName email phone"
      )
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// SHOP OWNER - UPDATE ORDER STATUS
// ===============================

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Accepted",
      "Rejected",
      "Delivered",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      "items.shopOwner": req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found or you are not authorized to update it",
      });
    }

    const updateData = {
      status,
    };

    // Automatically assign a delivery partner
    // when the shop accepts the order.
    if (status === "Accepted") {
      const deliveryPartner = await User.findOne({
        role: "deliveryPartner",
      });

      if (deliveryPartner) {
        updateData.deliveryPartner =
          deliveryPartner._id;
      }
    }

    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// SHOP OWNER - DASHBOARD
// ===============================

// ===============================
// SHOP OWNER - DASHBOARD
// ===============================

export const getShopDashboard = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.shopOwner": req.user.id,
    }).populate("items.product", "price");

    const totalOrders = orders.length;

    // Only count revenue from this shop's products
    // and only from delivered orders.
    const revenue = orders.reduce((totalRevenue, order) => {
      if (order.status !== "Delivered") {
        return totalRevenue;
      }

      const shopRevenue = order.items.reduce(
        (shopTotal, item) => {
          if (
            item.shopOwner &&
            item.shopOwner.toString() ===
              req.user.id.toString()
          ) {
            const price = item.product?.price || 0;

            return (
              shopTotal +
              price * item.quantity
            );
          }

          return shopTotal;
        },
        0
      );

      return totalRevenue + shopRevenue;
    }, 0);

    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;

    res.status(200).json({
      success: true,
      totalOrders,
      revenue,
      pendingOrders,
    });
  } catch (error) {
    console.error(
      "Get shop dashboard error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// DELIVERY PARTNER - GET ASSIGNED ORDERS
// ===============================

export const getDeliveryOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      deliveryPartner: req.user.id,
    })
      .populate(
        "customer",
        "fullName email phone"
      )
      .populate("items.product")
      .populate(
        "items.shopOwner",
        "fullName email"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// DELIVERY PARTNER - UPDATE DELIVERY STATUS
// ===============================

export const updateDeliveryStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Out for Delivery",
      "Delivered",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery status",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      deliveryPartner: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found or not assigned to you",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message:
        "Delivery status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===============================
// DELIVERY PARTNER - EARNINGS
// ===============================

export const getDeliveryEarnings = async (
  req,
  res
) => {
  try {
    const orders = await Order.find({
      deliveryPartner: req.user.id,
      status: "Delivered",
    });

    const totalDeliveries = orders.length;

    const totalEarnings = orders.reduce(
      (sum, order) =>
        sum + (order.deliveryCharge || 0),
      0
    );

    res.status(200).json({
      success: true,
      totalDeliveries,
      totalEarnings,
    });
  } catch (error) {
    console.error(
      "Get delivery earnings error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch delivery earnings",
    });
  }
};

// ===============================
// DELIVERY PARTNER - DELIVERY HISTORY
// ===============================

export const getDeliveryHistory = async (
  req,
  res
) => {
  try {
    const orders = await Order.find({
      deliveryPartner: req.user.id,
      status: "Delivered",
    })
      .populate(
        "customer",
        "fullName email phone"
      )
      .populate("items.product")
      .populate(
        "items.shopOwner",
        "fullName email"
      )
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "Get delivery history error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch delivery history",
    });
  }
};