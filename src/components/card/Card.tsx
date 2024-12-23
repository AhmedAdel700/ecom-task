import { Link } from "react-router-dom";
import "./card.css";

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

// Define the props for Card component
interface CardProps {
  products: Product[];
}

// Helper function to truncate text to a specified length with ellipsis
const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const Card: React.FC<CardProps> = ({ products }) => {
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
            <button>Add To Cart</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
