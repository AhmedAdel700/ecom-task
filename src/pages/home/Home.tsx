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
  // Type the state as an array of Product objects
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null); // Fixed type

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const username: UserData | null = storedUserData
      ? JSON.parse(storedUserData)
      : null;

    if (username) {
      setUser(username); // Set user data when available
    }

    fetchProducts().then((productsData) => {
      setProducts(productsData);
      setLoading(false);
    });
  }, []); // Use empty dependency array to fetch data once on component mount

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="home">
      <header>
        {user && <h2>Welcome To Products List : {user.username}</h2>}
      </header>

      <div className="products">
        <Card products={products} />
      </div>
    </section>
  );
}
