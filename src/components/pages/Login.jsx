import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api-services/Service'
import { toast } from 'react-hot-toast';

function Login({ setAuthenticated }) {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userDetails = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);   

    try {
      const data = await login(userDetails);  
      setLoading(false);

      if (data) {
        setAuthenticated(true);  
        localStorage.setItem('user', JSON.stringify(data));  
        navigate('/'); 
        const successMessage = data.message || 'Login successful!';  
        toast.success(successMessage)
        console.log(data)
      }
    } catch (err) {
      setLoading(false);

       
      let errorMessage = 'An error occurred. Please try again.';

      
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;  
      } else if (err.message) {
        errorMessage = err.message;   
      setError(errorMessage);
      toast.error(errorMessage);   
      console.error(err);   
    }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>

        {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?  
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;
