import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
export const placeOrder = async (req, res) => {
  try {
    const { address } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const subtotal = cart.items.reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    );

    const deliveryCharge = 20;
    const total = subtotal + deliveryCharge;

    // Create order items with shop owner
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      shopOwner: item.product.shopOwner,
    }));

    // Debug
    console.log("Order Items:", orderItems);

    const order = await Order.create({
      customer: req.user.id,
      items: orderItems,
      address,
      subtotal,
      deliveryCharge,
      total,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
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

export const getShopOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.shopOwner": req.user.id,
    })
      .populate("customer", "fullName email phone")
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

    const updateData = { status };

    // Assign delivery partner only when accepted
    if (status === "Accepted") {
      const deliveryPartner = await User.findOne({
        role: "deliveryPartner",
      });

      if (deliveryPartner) {
        updateData.deliveryPartner = deliveryPartner._id;
      }
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
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

export const getShopDashboard = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.shopOwner": req.user.id,
    });

    const totalOrders = orders.length;

    const revenue = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const pendingOrders = orders.filter(
      (order) => order.status === "Pending"
    ).length;

    res.json({
      success: true,
      totalOrders,
      revenue,
      pendingOrders,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};