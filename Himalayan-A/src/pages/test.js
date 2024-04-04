import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-black ${isLogin ? 'text-white' : 'text-white'}`}>
      <div className="w-1/4 p-8 bg-gray-900 shadow-lg rounded-md">
        <h2 className="text-xl font-semibold mb-8 text-center">{isLogin ? 'Login' : 'Signup'}</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={`mt-1 p-2 w-full border rounded-md bg-gray-800 ${isLogin ? 'text-white' : 'text-white'}`}
              placeholder="Enter your username"
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`mt-1 p-2 w-full border rounded-md bg-gray-800 ${isLogin ? 'text-white' : 'text-white'}`}
                placeholder="Enter your email"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-2 w-full border rounded-md bg-gray-800 ${isLogin ? 'text-white' : 'text-white'}`}
              placeholder="Enter your password"
            />
          </div>

          {/* Additional form fields can be added based on your requirements */}
          
          <button
            type="submit"
          className={`w-full ${isLogin ? 'bg-blue-500' : 'bg-blue-500'} text-white p-2 mt-8 rounded-md hover:${isLogin ? 'bg-blue-600' : 'bg-blue-600'}`}
          >            

            {isLogin ? 'Login' : 'Signup'}
          </button>
          
          <div className="mt-5">
            <p className={`text-center mt-8 ${isLogin ? 'text-blue-500' : 'text-blue-500'} text-sm hover:${isLogin ? 'text-blue-700' : 'text-blue-700'}`}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <a href="#" onClick={toggleAuth} className="underline">
                {isLogin ? 'Signup' : 'Login'}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>