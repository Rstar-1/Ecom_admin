import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, clearMessages } from "../../redux/auth/authSlice";
import GenericContainer from "../utility/GenericContainer";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  // 🔁 Redirect on success
  useEffect(() => {
    if (success) navigate("/dashboard");
  }, [success, navigate]);

  // 🧠 Handle input change (optimized)
  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) dispatch(clearMessages());
  };

  // 🚀 Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    dispatch(loginUser(form));
  };

  return (
    <GenericContainer
      version="v0"
      className="bg-white h-100 flex items-center justify-center"
    >
      <div className="h-500 flex items-center w-60 overflow-auto mx-auto border-ec rounded-5">
        <div className="w-50 h-500 bg-forth"></div>

        <div className="w-50">
          <form className="px-30" onSubmit={handleSubmit}>
            <h2 className="large-text font-600 text-primary">Welcome Back</h2>
            <p className="para-text font-400 text-gray mt-3">
              User Login here..
            </p>

            <div className="mt-20 grid-cols-1 gap-12">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="h-input w-full border-ec rounded-5"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="h-input w-full border-ec rounded-5"
              />

              <button
                type="submit"
                disabled={loading}
                className="py-10 mt-20 rounded-5 para-text border-0 bg-primary text-white cursor-pointer"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {!!error && (
                <p className="para-text font-400 mt-10 text-danger">{error}</p>
              )}

              {!!success && (
                <p className="para-text font-400 mt-10 text-success">
                  {success}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </GenericContainer>
  );
};

export default Login;