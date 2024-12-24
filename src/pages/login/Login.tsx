import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  // Define a type for the user data
  interface UserData {
    username: string;
    password: string;
  }

  // Use the UserData type for state
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUserData = localStorage.getItem("userData");
    const user: UserData | null = storedUserData
      ? JSON.parse(storedUserData)
      : null;

    if (
      user &&
      user.username === userData.username &&
      user.password === userData.password
    ) {
      // Set isAuth to true in localStorage
      localStorage.setItem("isAuth", JSON.stringify(true));

      // Reset the form data
      setUserData({ username: "", password: "" });

      // Redirect to the home page
      navigate("/");
    } else {
      alert("Invalid Credentials. Please Try Again.");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="username">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="password">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>Not A Memeber Yet ?<Link to='/register'>Sign up</Link></p>
    </div>
  );
}
