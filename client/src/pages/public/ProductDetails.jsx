import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import {
  addReview,
  getProductReviews,
} from "../../services/reviewService";

import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Store,
  Mail,
  Tag,
  Star,
  Send,
  User,
} from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addingToCart, setAddingToCart] = useState(false);

  // Review state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] =
    useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] =
    useState(true);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  // ==========================================
  // GET PRODUCT
  // ==========================================

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProductById(id);

      setProduct(data.product);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GET REVIEWS
  // ==========================================

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);

      const data = await getProductReviews(id);

      setReviews(data.reviews || []);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;

    try {
      setAddingToCart(true);

      const data = await addToCart(product._id);

      alert(data.message);

      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add to cart"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  // ==========================================
  // SUBMIT REVIEW
  // ==========================================

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      alert("Please login to write a review.");
      navigate("/login");
      return;
    }

    if (!comment.trim()) {
      alert("Please write a review comment.");
      return;
    }

    try {
      setSubmittingReview(true);

      const data = await addReview(
        product._id,
        Number(rating),
        comment.trim()
      );

      alert(
        data.message ||
          "Review added successfully."
      );

      setComment("");
      setRating(5);

      // Refresh product rating/count
      await fetchProduct();

      // Refresh individual reviews
      await fetchReviews();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to submit review"
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <Package
              size={45}
              className="text-orange-500 mx-auto mb-4"
            />
          </div>

          <p className="text-gray-500 text-lg">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
            <Package
              size={30}
              className="text-red-500"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            {error ||
              "This product could not be found."}
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition font-medium"
          >
            <ArrowLeft size={19} />
            Back to Products
          </button>
        </div>
      </div>

      {/* ======================================
          PRODUCT
      ====================================== */}

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="grid md:grid-cols-2">

            {/* IMAGE */}

            <div className="bg-gray-100 p-8 md:p-10 flex items-center justify-center min-h-[400px]">
              <img
                src={
                  product.image ||
                  "https://placehold.co/600x500?text=No+Image"
                }
                alt={product.name}
                className="w-full max-h-[500px] object-contain rounded-2xl"
              />
            </div>

            {/* DETAILS */}

            <div className="p-8 md:p-10">

              {/* Category */}

              <div className="flex items-center gap-2 text-orange-600 mb-4">
                <Tag size={18} />

                <span className="font-semibold">
                  {product.category}
                </span>
              </div>

              {/* Name */}

              <h1 className="text-4xl font-bold text-gray-800">
                {product.name}
              </h1>

              {/* Rating */}

              <div className="flex items-center gap-3 mt-4">

                <div className="flex items-center gap-1 bg-green-100 px-3 py-1.5 rounded-lg">
                  <Star
                    size={17}
                    className="fill-green-600 text-green-600"
                  />

                  <span className="font-bold text-green-700">
                    {Number(
                      product.rating || 0
                    ).toFixed(1)}
                  </span>
                </div>

                <span className="text-gray-500 text-sm">
                  {product.numReviews || 0}{" "}
                  {product.numReviews === 1
                    ? "review"
                    : "reviews"}
                </span>

              </div>

              {/* Description */}

              <p className="text-gray-600 mt-5 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}

              <div className="mt-7">
                <p className="text-sm text-gray-500">
                  Price
                </p>

                <p className="text-4xl font-bold text-orange-600">
                  ₹{product.price}
                </p>
              </div>

              {/* Stock */}

              <div className="mt-6 flex items-center gap-3">

                <Package
                  size={20}
                  className={
                    isOutOfStock
                      ? "text-red-500"
                      : "text-green-600"
                  }
                />

                {isOutOfStock ? (
                  <span className="font-semibold text-red-600">
                    Out of Stock
                  </span>
                ) : (
                  <span className="font-semibold text-green-600">
                    {product.stock} items available
                  </span>
                )}

              </div>

              {/* SHOP OWNER */}

              {product.shopOwner && (
                <div className="mt-7 bg-gray-50 rounded-2xl p-5">

                  <div className="flex items-center gap-3 mb-4">

                    <div className="bg-orange-100 p-3 rounded-xl">
                      <Store
                        size={22}
                        className="text-orange-500"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Sold by
                      </p>

                      <p className="font-bold text-gray-800">
                        {product.shopOwner.fullName ||
                          "Shop Owner"}
                      </p>
                    </div>

                  </div>

                  {product.shopOwner.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail size={16} />

                      <span>
                        {product.shopOwner.email}
                      </span>
                    </div>
                  )}

                </div>
              )}

              {/* ADD TO CART */}

              <button
                onClick={handleAddToCart}
                disabled={
                  isOutOfStock || addingToCart
                }
                className="mt-8 w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition"
              >
                <ShoppingCart size={22} />

                {addingToCart
                  ? "Adding to Cart..."
                  : isOutOfStock
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

              {/* VIEW CART */}

              <button
                onClick={() => navigate("/cart")}
                className="mt-3 w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition"
              >
                View Cart
              </button>

            </div>
          </div>
        </div>

        {/* ======================================
            REVIEW SECTION
        ====================================== */}

        <div className="bg-white rounded-3xl shadow-lg mt-8 p-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Ratings & Reviews
              </h2>

              <p className="text-gray-500 mt-1">
                Share your experience with this product.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2">
                <Star
                  size={25}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="text-3xl font-bold text-gray-800">
                  {Number(
                    product.rating || 0
                  ).toFixed(1)}
                </span>
              </div>

              <span className="text-gray-500">
                ({product.numReviews || 0})
              </span>

            </div>

          </div>

          {/* REVIEW FORM */}

          <div className="border-t mt-7 pt-7">

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Write a Review
            </h3>

            <form onSubmit={handleSubmitReview}>

              {/* Rating */}

              <div className="mb-5">

                <p className="text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </p>

                <div className="flex items-center gap-2">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setRating(star)
                        }
                        className="p-1"
                      >
                        <Star
                          size={28}
                          className={
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* Comment */}

              <div className="mb-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>

                <textarea
                  value={comment}
                  onChange={(e) =>
                    setComment(e.target.value)
                  }
                  rows={4}
                  placeholder="Tell us about your experience..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={submittingReview}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                <Send size={18} />

                {submittingReview
                  ? "Submitting..."
                  : "Submit Review"}
              </button>

            </form>

          </div>

          {/* ======================================
              CUSTOMER REVIEWS
          ====================================== */}

          <div className="border-t mt-8 pt-8">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Customer Reviews
              </h3>

              <span className="text-sm text-gray-500">
                {reviews.length}{" "}
                {reviews.length === 1
                  ? "review"
                  : "reviews"}
              </span>
            </div>

            {/* Loading */}

            {reviewsLoading ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">
                  Loading reviews...
                </p>
              </div>
            ) : reviews.length === 0 ? (
              /* No reviews */

              <div className="py-10 text-center bg-gray-50 rounded-2xl">
                <Star
                  size={40}
                  className="text-gray-300 mx-auto mb-3"
                />

                <p className="font-semibold text-gray-700">
                  No reviews yet
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Be the first customer to review this product.
                </p>
              </div>
            ) : (
              /* Reviews */

              <div className="space-y-5">

                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-gray-200 rounded-2xl p-5"
                  >

                    {/* Customer */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <User
                            size={20}
                            className="text-orange-500"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {review.customer?.fullName ||
                              "Customer"}
                          </p>

                          <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map(
                              (star) => (
                                <Star
                                  key={star}
                                  size={15}
                                  className={
                                    star <=
                                    review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              )
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Date */}

                      <span className="text-xs text-gray-400">
                        {review.createdAt
                          ? new Date(
                              review.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </span>

                    </div>

                    {/* Comment */}

                    {review.comment && (
                      <p className="text-gray-600 mt-4 leading-relaxed">
                        {review.comment}
                      </p>
                    )}

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;