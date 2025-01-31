import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      toast.success("Login successful!", { position: "top-right" });
      navigate("/dashboard");
    } catch (error) {

      setForm({ email: "", password: "" });
      toast.error("Login failed! Please check your email or password. and try Again. ", { position: "top-right" });
    }
  };

  return (
    <div className="bg-zinc-800 text-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-orange-300 p-4 h-fit w-fit items-center rounded-4xl bg-zinc-600 shadow-md shadow-orange-800">
      <h2 className="uppercase">Sign In</h2>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-150 bg-zinc-700 px-3 py-2 rounded-[10px] outline-none" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-150 bg-zinc-700 px-3 py-2 rounded-[10px] outline-none" />
        <button type="submit" className="cursor-pointer w-fit px-20 py-1 bg-blue-400 hover:bg-blue-500 rounded-2xl">Login</button>
        <p className="text-center text-sm">Don't have an account? <Link to="/register" className="text-orange-300 hover:text-orange-400">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
