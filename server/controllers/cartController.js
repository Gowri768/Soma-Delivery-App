import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ===============================
// CUSTOMER - ADD TO CART
// ===============================

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const requestedQuantity = Number(quantity) || 1;

    if (requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: "Product is out of stock",
      });
    }

    let cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      const newQuantity =
        existingItem.quantity + requestedQuantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} item(s) available in stock`,
        });
      }

      existingItem.quantity = newQuantity;
    } else {
      if (requestedQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} item(s) available in stock`,
        });
      }

      cart.items.push({
        product: productId,
        quantity: requestedQuantity,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
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
// CUSTOMER - GET CART
// ===============================

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
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
// CUSTOMER - UPDATE CART QUANTITY
// ===============================

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Increase quantity only if stock is available
    if (action === "increase") {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (item.quantity + 1 > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} item(s) available in stock`,
        });
      }

      item.quantity += 1;
    }

    if (action === "decrease") {
      item.quantity -= 1;
    }

    if (!["increase", "decrease"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid cart action",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.quantity > 0
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
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
// CUSTOMER - REMOVE FROM CART
// ===============================

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};