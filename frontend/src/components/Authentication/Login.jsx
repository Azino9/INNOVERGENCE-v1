import React, { useState, useEffect, useContext } from 'react';
import { Skull, User, Lock, Eye, EyeOff } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import heroImageUrl from '../../assets/leftimage.jpeg';

const Login = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 
                    bg-gradient-to-br from-black via-gray-900 to-red-950 text-white 
                    font-['Orbitron',_sans-serif] relative overflow-hidden">
      
      {/* Back Button */}
      <Link to="/">
      <button className="absolute top-4 left-4 md:top-6 md:left-6 z-50 flex items-center space-x-2 px-3 py-1 bg-red-700/80 hover:bg-red-600 text-white font-bold rounded-md shadow-md transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>
</Link>
      {/* Heading */}
      <div className={`absolute top-10 md:top-12 w-full flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 
                      ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest uppercase leading-tight" style={{ fontFamily: '"Bebas Neue", sans-serif', background: 'linear-gradient(to right, #ff0000, #ffffff, #ff0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 25px rgba(255,0,0,0.8)', letterSpacing: '5px' }}>
          Innovergence <span className="text-white">XXV</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg uppercase tracking-[0.25em] mt-2 md:mt-3" style={{ fontFamily: '"Orbitron", sans-serif', textShadow: '0 0 10px rgba(255,0,0,0.4)' }}>
          A Marvelous Hackathon Experience
        </p>
        <div className="mt-4 w-32 h-1 bg-gradient-to-r from-red-600 via-white to-red-600 rounded-full shadow-[0_0_15px_#dc2626]" />
      </div>

      {/* Main Login Container */}
      <div className={`w-full max-w-5xl flex rounded-2xl shadow-[0_0_25px_#b91c1c] overflow-hidden
                      bg-gray-900/90 border-2 border-red-700/60 transition-all duration-700 ease-out 
                      mt-40 md:mt-44
                      ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

        {/* LEFT PANEL */}
        <div className={`hidden md:block w-1/2 p-8 bg-cover bg-center relative 
                         transition-transform duration-1000 ease-out 
                         ${isMounted ? 'translate-x-0' : '-translate-x-full'}`}
             style={{ backgroundImage: `url(${heroImageUrl})`, filter: 'grayscale(20%) brightness(3.5) contrast(1.3)' }}>
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-8">
            <p className="text-3xl font-extrabold text-red-600 drop-shadow-[0_0_12px_#b91c1c] uppercase">
              “I am Marvel Jesus”
            </p>
            <p className="text-sm mt-2 text-gray-300 italic">— Deadpool.</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={`w-full md:w-1/2 p-8 md:p-12 backdrop-blur-sm 
                         transition-opacity duration-1000 ease-out 
                         ${isMounted ? 'opacity-100' : 'opacity-0'}`}>

          {/* Logo */}
          <div className="text-center mb-8">
            <Skull className="mx-auto w-14 h-14 text-red-600 drop-shadow-[0_0_15px_#b91c1c]" />
            <h1 className="text-4xl font-extrabold mt-3 text-red-500 tracking-widest">
              LOG<span className="text-gray-200">IN</span>
            </h1>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
              Secure? Meh. Stylish? Hell yeah.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-red-300 mb-1">
                Code Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                <input
                  type="email"
                  id="username"
                  placeholder="regno@klu.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black/70 border border-red-700/60 rounded-md text-white placeholder-gray-500 
                             focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition duration-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-red-300 mb-1">
                Secret Sauce (Password)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-black/70 border border-red-700/60 rounded-md text-white placeholder-gray-500 
                             focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 mt-8 
                         bg-gradient-to-r from-red-800 to-red-500 rounded-full 
                         text-black font-extrabold uppercase tracking-widest 
                         shadow-lg shadow-red-600/40 
                         hover:shadow-red-400/70 hover:from-red-600 hover:to-red-700 
                         transition-all duration-500 transform hover:scale-105"
            >
              {loading ? "Logging in..." : "Assemble Your Team!"}
            </button>

            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
