import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css";

import Layout from "./pages/layout/Layout";
import Home, { loader as homeLoader } from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";
import Error from "./pages/error/Error";
import Item, { loader as itemLoader } from "./pages/item/Item";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="product/:id" element={<Item />} loader={itemLoader} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
export default function App(): JSX.Element {
  return <RouterProvider router={router} />;
}
