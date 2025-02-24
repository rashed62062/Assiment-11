import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading icon
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { signInUser, forgotPassword, signInGoogleUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInGoogleUser();
      toast.success("Google Sign-In successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Password Reset
  const handlePasswordReset = async () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email to reset your password.");
      return;
    }
    try {
      await forgotPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error(error.message || "Failed to send password reset email.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/20 backdrop-blur-md shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-white">Login to Your Account</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="text-white">Email</span>
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/30 text-white placeholder-gray-200"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="text-white">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/30 text-white placeholder-gray-200"
              required
            />
            <label className="label">
              <span
                onClick={handlePasswordReset}
                className="text-sm text-white hover:underline cursor-pointer"
              >
                Forgot password?
              </span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-blue-600 hover:bg-blue-500 text-white flex justify-center items-center gap-2 transition-all"
            disabled={loading}
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-4 text-white">OR</div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="btn w-full bg-white/30 text-white hover:bg-white/40 flex justify-center items-center gap-2 transition-all"
          disabled={loading}
        >
          <FcGoogle className="text-xl" />
          {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;
