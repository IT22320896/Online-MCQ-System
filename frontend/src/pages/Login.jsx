import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email);
      const user = response.data;
      setUser(user);
      navigate("/exams");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(
        "Login failed: " +
          (error.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Enter your email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Login;
