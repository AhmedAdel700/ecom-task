import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchItem, Product } from "../../api";
import Loading from "../../components/loading/Loading";
import "./item.css";

export default function Item() {
  const { id } = useParams<{ id?: string }>();
  const [item, setItem] = useState<Product | null>(null);

  useEffect(() => {
    fetchItem(id).then((item) => setItem(item));
  }, [id]);

  return (
    <>
      {item ? (
        <div className="item">
          <Link to="/">Return</Link>

          <div className="img-box">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="content">
            <h1>{item.title}</h1>
            <p className="description">{item.description}</p>
            <p className="cat">
              <strong>Category:</strong> {item.category}
            </p>
            <p className="price">
              <strong>Price:</strong> ${item.price.toFixed(2)}
            </p>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
