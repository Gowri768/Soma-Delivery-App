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
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
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

    const products = await Product.find(filter).populate(
      "shopOwner",
      "fullName email"
    );

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
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);

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