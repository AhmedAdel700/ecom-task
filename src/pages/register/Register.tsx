import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
export default function Register() {
  // Define a type for the user data
  interface UserData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  // Use the UserData type for state
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password and confirm password
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage("Passwords Do Not Match.");
      return;
    }

    // Clear error message if validation passes
    setErrorMessage("");

    // Save user data to localStorage
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userDataToStore } = userData; // Exclude confirmPassword
    localStorage.setItem("userData", JSON.stringify(userDataToStore));

    // Set isAuth to true in localStorage
    localStorage.setItem("isAuth", JSON.stringify(true));

    // Clear form fields
    setUserData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="register">
      <h1>Register</h1>
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

        <div className="email">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
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

        <div className="confirm-password">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Submit</button>
      </form>

      <p>
        Already Have An Account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}
