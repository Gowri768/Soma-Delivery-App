import {
  ShoppingBasket,
  Milk,
  Apple,
  Pill,
  Package,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Groceries",
    icon: ShoppingBasket,
  },
  {
    id: 2,
    name: "Dairy",
    icon: Milk,
  },
  {
    id: 3,
    name: "Fruits",
    icon: Apple,
  },
  {
    id: 4,
    name: "Medicines",
    icon: Pill,
  },
  {
    id: 5,
    name: "Household",
    icon: Home,
  },
  {
    id: 6,
    name: "Essentials",
    icon: Package,
  },
];

function CategorySection() {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-10 text-center text-4xl font-bold">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
                <div
  key={category.id}
  onClick={() =>
    navigate(`/products?category=${category.name}`)
  }
  className="cursor-pointer rounded-2xl border p-6 text-center transition hover:-translate-y-1 hover:shadow-xl hover:border-orange-500"
>
                <Icon
                  size={40}
                  className="mx-auto mb-4 text-orange-500"
                />

                <h3 className="font-semibold">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default CategorySection;