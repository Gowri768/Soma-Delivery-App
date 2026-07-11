import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      // Save token
      localStorage.setItem("token", data.token);

      // Save user details
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(data.message);

      // Redirect after login
      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="mt-4 text-center text-sm">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default Login;