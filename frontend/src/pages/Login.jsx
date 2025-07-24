import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const mockUser = {
      id: "u1",
      name,
      email: `${name.toLowerCase()}@test.com`,
    };
    setUser(mockUser);
    navigate("/exams");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
