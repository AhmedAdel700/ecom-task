import { Link } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 Not Found</h1>
      <p>The page You Requested Could Not Be Found</p>
      <Link to="/" replace>
        Back to Home Page
      </Link>
    </div>
  );
}
