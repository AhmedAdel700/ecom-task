import { useRouteError } from "react-router-dom";

export default function Error(): JSX.Element {
  interface CustomError {
    status: number;
    message: string;
  }
  const error = useRouteError();

  return (
    <div>
      <h1>
        {`Error: ${
          (error as CustomError).status
            ? (error as CustomError).status
            : "Unexpected Error !"
        }`}
      </h1>
      <p>{(error as CustomError).message}</p>
    </div>
  );
}
