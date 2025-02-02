import { useState } from "react";
import { register } from "../../api-services/Service";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userDetails = {
        firstname,
        lastname,
        email,
        password,
      };
      const data = await register(userDetails);

      // Success case
      toast.success(data.message);
      console.log("User registered:", data);
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error?.response?.data?.message || error.message || "Something went wrong. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="c1 flex items-center justify-center rounded-lg w-96 h-fit mx-auto bg-gray-100">
      <div className="c2 bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
          Create an Account Here!
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder='Enter fist name'
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400 placeholder:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder='Enter last name'
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400 placeholder:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder='Enter email'
              value={email.toLowerCase()}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400 placeholder:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder='Create password'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400 placeholder:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}
