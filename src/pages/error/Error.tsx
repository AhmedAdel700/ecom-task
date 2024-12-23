import { useRouteError } from "react-router-dom";
import "./error.css";

export default function Error(): JSX.Element {
  interface CustomError {
    status: number;
    message: string;
  }
  const error = useRouteError();

  return (
    <div className="error-section">
      <h2>
        {`Error: ${
          (error as CustomError).status
            ? (error as CustomError).status
            : "Unexpected Error !"
        }`}
      </h2>
      <p>{(error as CustomError).message}</p>
    </div>
  );
}
