import { LoaderFunction, redirect } from "react-router-dom";
export const loader: LoaderFunction = async ({ params }) => {
  const storedData = localStorage.getItem("isAuth");
  const isAuth = storedData ? JSON.parse(storedData) : null;

  if (!isAuth) {
    return redirect("/register");
  }

  console.log(params);

  return null;
};

export default function Item() {
  return <div>Item</div>;
}
