import { useEffect, useState } from "react";
import { LoaderFunction, redirect } from "react-router-dom";
import { fetchProducts } from "../../api";
import Loading from "../../components/loading/Loading";
import Card from "../../components/card/Card";
import "./home.css";

// Define the type for a product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Define a type for the user data
interface UserData {
  username: string;
  password: string;
}

// Loader function to check authentication
export const loader: LoaderFunction = async () => {
  const storedData = localStorage.getItem("isAuth");
  const isAuth = storedData ? JSON.parse(storedData) : null;

  if (!isAuth) {
    return redirect("/register");
  }

  return null;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [renderedProducts, setRenderedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [cart, setCart] = useState<number>(
    JSON.parse(localStorage.getItem("cart") || "0")
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", "audio", "gaming", "tv", "mobile"];

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const username: UserData | null = storedUserData
      ? JSON.parse(storedUserData)
      : null;

    if (username) {
      setUser(username);
    }

    const cachedProducts = localStorage.getItem("products");

    if (cachedProducts) {
      const productsData = JSON.parse(cachedProducts);
      setProducts(productsData);
      setRenderedProducts(productsData);
      setLoading(false);
    } else {
      fetchProducts().then((productsData) => {
        setProducts(productsData);
        setRenderedProducts(productsData);
        localStorage.setItem("products", JSON.stringify(productsData)); // Cache products in localStorage
        setLoading(false);
      });
    }
  }, []);

  const updateCart = (newCartValue: number) => {
    setCart(newCartValue);
    localStorage.setItem("cart", newCartValue.toString());
  };

  const getItemByCategory = (category: string) => {
    setActiveCategory(category);

    if (category === "all") {
      setRenderedProducts(products);
      return;
    }

    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    setRenderedProducts(filteredProducts);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="home">
      <header>
        {user && <h2>Welcome To Products List: {user.username}</h2>}
        <h4>Cart Items: {cart}</h4>
      </header>

      <section className="search">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => getItemByCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </section>

      <div className="products">
        <Card products={renderedProducts} cart={cart} updateCart={updateCart} />
      </div>
    </section>
  );
}
