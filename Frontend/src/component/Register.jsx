import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register= () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    async function fetchdata()
    {
      const responce=await axios.post("http://localhost:5000/api/user/register",{
        username,
        email,
        password
      })

      console.log(responce.data);
      
    }
    fetchdata();
    
    // Backend call for login goes here
    navigate("/Login");

    
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-black to-indigo-900 opacity-30 animate-pulse"></div>
      <div className="relative z-10 backdrop-blur-sm bg-black/50 p-10 rounded-2xl shadow-[0_0_30px_#a855f7] w-96">
        <h2 className="text-4xl font-bold text-purple-400 text-center mb-6 font-mono">Access Terminal</h2>
        <form onSubmit={handleRegister}>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-6 p-3 rounded bg-black border border-purple-700 text-purple-300 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
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
            Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Register;