import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {
  // Password toggle function
  const [showPassword, setShowPassword] = useState(false);

  const {   creteUser, update} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value; // Corrected
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    // Client-side validation (optional)
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
       if (!passwordRegex.test(password)) {
        toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        return;
      }

  
    // Create user
    creteUser(email, password)
      .then((result) => {
        // Update profile with the name and photo URL
        update(name, photoUrl)
          .then(() => {
            console.log('User created and profile updated:', result.user);
            e.target.reset();
            toast.success('Registration successful! Please log in now.');
            navigate('/'); // Redirect to login page
          })
          .catch((error) => {
            console.error(error);
            toast.error('Failed to update profile: ' + (error.message || 'Please try again later.'));
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message || 'An error occurred. Please try again later.');
      });
  };
  

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleRegistration} className="card-body">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Please enter a name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                name="photoUrl"
                placeholder="Enter your photo URL"
                className="input input-bordered"
                required
              />
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission when clicking the eye icon
                  setShowPassword(!showPassword);
                }}
                className="btn btn-xs absolute right-5 top-12"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                SignUp
              </button>
            </div>
            <p className="mt-4">
              Already have an account?{' '}
              <NavLink to="/login" className="link link-primary">
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
