import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/product/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

const category =
  searchParams.get("category") || "All";

  useEffect(() => {
  fetchProducts();
}, [search, category]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(search, category);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-6">
        Products
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-3 rounded-lg mb-8"
      />

      <div className="grid md:grid-cols-3 gap-6">

        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))
        ) : (
          <h2>No products found.</h2>
        )}

      </div>

    </div>
  );
}

export default Products;