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
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);
  const [cart, setCart] = useState<number>(
    JSON.parse(localStorage.getItem("cart") || "0")
  );

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const username: UserData | null = storedUserData
      ? JSON.parse(storedUserData)
      : null;

    if (username) {
      setUser(username);
    }

    fetchProducts().then((productsData) => {
      setProducts(productsData);
      setLoading(false);
    });
  }, []);

  const updateCart = (newCartValue: number) => {
    setCart(newCartValue);
    localStorage.setItem("cart", newCartValue.toString());
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
        <button className="active">All</button>
        <button>Audio</button>
        <button>Gaming</button>
        <button>TV</button>
        <button>Mobile</button>
        <button>laptop</button>
        <button>Appliances</button>
      </section>

      <div className="products">
        <Card products={products} cart={cart} updateCart={updateCart} />
      </div>
    </section>
  );
}
