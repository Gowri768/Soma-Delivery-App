import User from "../models/User.js";

export const applyAsDeliveryPartner = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already a delivery partner
    if (user.role === "deliveryPartner") {
      return res.status(400).json({
        success: false,
        message: "You are already a delivery partner",
      });
    }

    // Application already pending
    if (user.deliveryPartnerStatus === "pending") {
      return res.status(400).json({
        success: false,
        message: "Your delivery partner application is already pending",
      });
    }

    // Already approved
    if (user.deliveryPartnerStatus === "approved") {
      return res.status(400).json({
        success: false,
        message: "Your delivery partner application is already approved",
      });
    }

    user.deliveryPartnerStatus = "pending";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Delivery partner application submitted successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        deliveryPartnerStatus: user.deliveryPartnerStatus,
      },
    });
  } catch (error) {
    console.error(
      "Delivery partner application error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to submit delivery partner application",
      error: error.message,
    });
  }
};
export const getMyDeliveryApplication = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "fullName email role deliveryPartnerStatus"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "Get delivery application error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get application status",
      error: error.message,
    });
  }
};