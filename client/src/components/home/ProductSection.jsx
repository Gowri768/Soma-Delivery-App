import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "../product/ProductCard";

function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-10 text-center text-4xl font-bold">
          Popular Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </section>
    
  );
}

export default ProductSection;