import { Link } from "react-router-dom";
import "./card.css";
import { useState } from "react";

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

interface CardProps {
  products: Product[];
  cart: number;
  updateCart: (newCartValue: number) => void;
}

const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const Card: React.FC<CardProps> = ({ products, cart, updateCart }) => {
  const [addState, setAddState] = useState<Record<number, boolean>>({});

  const handleClick = (id: number) => {
    setAddState((prevState) => {
      const newState = { ...prevState, [id]: !prevState[id] };

      // Update the cart state and localStorage
      const updatedCart = newState[id] ? cart + 1 : cart - 1;
      updateCart(updatedCart); // Update the cart in the parent component
      return newState;
    });
  };

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="card">
          <div className="img-box">
            <img src={product.image} alt={product.title} />
          </div>

          <h2>{truncateText(product.title, 20)}</h2>
          <p>{truncateText(product.description, 60)}</p>
          <p className="price">Price: ${product.price}</p>

          <div className="more">
            <Link to={`product/${product.id}`}>View</Link>
            <button onClick={() => handleClick(product.id)}>
              {addState[product.id] ? "Remove Item" : "Add To Cart"}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
