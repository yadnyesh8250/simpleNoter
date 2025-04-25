import React, { useState } from 'react';
import { isCookie, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    async function fetchLogindata() {
      try {
        const response = await axios.post("http://localhost:5000/api/user/login", { email, password }, {
          withCredentials: true
        });
        console.log(response.data);
        console.log(isCookie("accessToken"));
        

        if (response.data.success) {
          navigate("/Home");
        } else {
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    }
    fetchLogindata();
  };

  return (
    <>
  <div className="text-center mt-10">
  <h1 className="text-5xl font-extrabold text-fuchsia-400 tracking-in-expand">
   Note Your Hacking..
  </h1>
</div>

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden text-white font-mono">
            
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-sm opacity-40"
        style={{
          backgroundImage: `url('https://images.unsplash.com/flagged/photo-1550949078-fbd850f36ec5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-purple-950 to-fuchsia-900 opacity-60 mix-blend-overlay"></div>

      {/* Login form */}
      <div className="relative z-10 backdrop-blur-sm bg-black/60 p-10 rounded-2xl shadow-[0_0_30px_#a855f7] w-96 border border-purple-700">
        <h2 className="text-4xl font-bold text-purple-400 text-center mb-6">Access Terminal</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black border border-purple-700 text-purple-300 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 rounded bg-black border border-purple-700 text-purple-300 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-bold rounded hover:bg-purple-500 transition shadow-[0_0_10px_#a855f7]"
          >
            Enter
          </button>
          <Link to="/Register" className="block text-center mt-4 text-purple-300 hover:text-purple-500 transition">
            Don't have an account? Register
          </Link>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
