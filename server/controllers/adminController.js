import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalShopOwners = await User.countDocuments({
      role: "shopOwner",
    });

    const totalDeliveryPartners = await User.countDocuments({
      role: "deliveryPartner",
    });

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Revenue from delivered orders
    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    const revenue = revenueResult[0]?.total || 0;

    // Monthly revenue chart
    const revenueChart = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const formattedRevenueChart = revenueChart.map((item) => ({
      month: `${item._id.year}-${String(
        item._id.month
      ).padStart(2, "0")}`,
      revenue: item.revenue,
    }));

    // Order status statistics
    const orderStatus = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    // Recent orders
    const recentOrders = await Order.find()
      .populate("customer", "fullName email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      totalUsers,
      totalCustomers,
      totalShopOwners,
      totalDeliveryPartners,
      totalProducts,
      totalOrders,
      revenue,
      revenueChart: formattedRevenueChart,
      orderStatus,
      recentOrders,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("shopOwner", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Get all products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "fullName email phone")
      .populate("deliveryPartner", "fullName email phone")
      .populate("items.product", "name price")
      .populate("items.shopOwner", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getAllDeliveryPartners = async (req, res) => {
  try {
    const deliveryPartners = await User.find({
      role: "deliveryPartner",
    })
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();

    const partnersWithStats = await Promise.all(
      deliveryPartners.map(async (partner) => {
        const deliveredOrders = await Order.find({
          deliveryPartner: partner._id,
          status: "Delivered",
        }).select("deliveryCharge");

        const totalDeliveries = deliveredOrders.length;

        const totalEarnings = deliveredOrders.reduce(
          (sum, order) =>
            sum + (order.deliveryCharge || 0),
          0
        );

        return {
          ...partner,
          totalDeliveries,
          totalEarnings,
        };
      })
    );

    res.status(200).json({
      success: true,
      deliveryPartners: partnersWithStats,
    });
  } catch (error) {
    console.error(
      "Get all delivery partners error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch delivery partners",
      error: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const allowedRoles = [
      "customer",
      "shopOwner",
      "deliveryPartner",
    ];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from changing their own role
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own admin role",
      });
    }

    user.role = role;

// If the user is changed back to customer,
// reset their delivery partner application.
if (role === "customer") {
  user.deliveryPartnerStatus = "none";
}

await user.save();

    const updatedUser = await User.findById(userId).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user role error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: error.message,
    });
  }
};

export const updateAdminOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Accepted",
      "Rejected",
      "Preparing",
      "Out for Delivery",
      "Delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    const updatedOrder = await Order.findById(orderId)
      .populate("customer", "fullName email phone")
      .populate(
        "deliveryPartner",
        "fullName email phone"
      )
      .populate("items.product", "name price")
      .populate("items.shopOwner", "fullName email");

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(
      "Admin update order status error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

export const assignDeliveryPartner = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryPartnerId } = req.body;

    if (!deliveryPartnerId) {
      return res.status(400).json({
        success: false,
        message: "Delivery partner is required",
      });
    }

    const deliveryPartner = await User.findOne({
      _id: deliveryPartnerId,
      role: "deliveryPartner",
    });

    if (!deliveryPartner) {
      return res.status(404).json({
        success: false,
        message: "Delivery partner not found",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.deliveryPartner = deliveryPartnerId;

    await order.save();

    const updatedOrder = await Order.findById(orderId)
      .populate("customer", "fullName email phone")
      .populate(
        "deliveryPartner",
        "fullName email phone"
      )
      .populate("items.product", "name price")
      .populate("items.shopOwner", "fullName email");

    res.status(200).json({
      success: true,
      message: "Delivery partner assigned successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(
      "Assign delivery partner error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to assign delivery partner",
      error: error.message,
    });
  }
};
export const getDeliveryPartnerApplications = async (
  req,
  res
) => {
  try {
    const applications = await User.find({
      deliveryPartnerStatus: "pending",
    })
      .select("-password")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(
      "Get delivery partner applications error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch delivery partner applications",
      error: error.message,
    });
  }
};

export const updateDeliveryPartnerApplication = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;
    const { action } = req.body;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application action",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.deliveryPartnerStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This application is not pending",
      });
    }

    if (action === "approve") {
      user.role = "deliveryPartner";
      user.deliveryPartnerStatus = "approved";
    }

    if (action === "reject") {
      user.role = "customer";
      user.deliveryPartnerStatus = "rejected";
    }

    await user.save();

    const updatedUser = await User.findById(userId).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message:
        action === "approve"
          ? "Delivery partner application approved"
          : "Delivery partner application rejected",
      user: updatedUser,
    });
  } catch (error) {
    console.error(
      "Update delivery partner application error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update application",
      error: error.message,
    });
  }
};