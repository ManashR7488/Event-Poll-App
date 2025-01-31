import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      toast.success("Registration successful! Please log in to continue.", { position: "top-right" });
      navigate("/login");
    } catch (error) {
      setForm({name:"", email: "", password: "",});
      toast.error(error.response?.data?.message || "Registration failed. Please try again.", { position: "top-right" });
      navigate("/register");
    }
  };

  return (
    <div className="bg-zinc-800 text-white min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-orange-300 p-4 h-fit w-fit items-center rounded-4xl bg-zinc-600 shadow-md shadow-orange-800">
      <h2 className="uppercase">Sign Up</h2>
        <input value={form.name} type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-150 bg-zinc-700 px-3 py-2 rounded-[10px] outline-none" />
        <input value={form.email} type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-150 bg-zinc-700 px-3 py-2 rounded-[10px] outline-none" />
        <input value={form.password} type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-150 bg-zinc-700 px-3 py-2 rounded-[10px] outline-none" />
        <button type="submit" className="cursor-pointer w-fit px-20 py-1 bg-green-400 hover:bg-green-500 rounded-2xl">Register</button>
        <p className="text-center text-sm">Already have an account? <Link to="/login" className="text-orange-300 hover:text-orange-400">Sign In</Link></p>
      </form>
    </div>
  );
};

export default Register;
