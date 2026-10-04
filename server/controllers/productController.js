import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const {
  name,
  description,
  price,
  category,
  stock,
  unit,
} = req.body;

  const product = await Product.create({
  name,
  description,
  price,
  category,
  stock,
  unit,
  image: req.file ? req.file.path : "",
  shopOwner: req.user.id,
});

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    const products = await Product.find(filter).populate("shopOwner", "fullName shopName email")
    

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "shopOwner",
      "fullName email"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check authorization: shopOwner must match or user is admin, or claim if product is unowned
    if (
      req.user.role !== "admin" &&
      product.shopOwner &&
      product.shopOwner.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    const { name, description, price, category, stock, unit } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined && price !== "") updateData.price = Number(price);
    if (category !== undefined) updateData.category = category;
    if (stock !== undefined && stock !== "") updateData.stock = Number(stock);
    if (unit !== undefined) updateData.unit = unit;

    if (req.file) {
      updateData.image = req.file.path;
    }

    if (!product.shopOwner) {
      updateData.shopOwner = req.user.id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      product.shopOwner &&
      product.shopOwner.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get My Products
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      shopOwner: req.user.id,
    });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};