import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from "../../assets/logo.jpg";

const Navar = () => {
  const { user, signOutUser} = useContext(AuthContext);




  
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Signing out");
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allBlog">All Blog</NavLink>
      </li>
      <li>
        <NavLink to="/FeaturedBlogs"> Featured Blogs</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/addBlog"> Add Blog</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">Wishlist </NavLink>
          </li>
         
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg dark:bg-gray-800">
      {/* Navbar Start */}
      <div className="navbar-start">
        <img src={logo} alt="Logo" className="w-8 h-8 rounded-full ml-2" />
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-gray-700"
          >
            {links}
          </ul>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center">
        

        {user ? (
          <>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {user?.email}
            </span>
            <img
              src={user?.photoURL}
              alt={`${user?.displayName || "User"}'s Avatar`}
              className="w-8 h-8 rounded-full ml-2"
            />
            <button onClick={handleSignOut} className="btn btn-primary ml-4">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink className="btn btn-primary mr-2" to="/login">
              Login
            </NavLink>
            <NavLink className="btn btn-secondary" to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navar;
