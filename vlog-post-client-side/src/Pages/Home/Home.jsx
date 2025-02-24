import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiHeart, FiEye } from 'react-icons/fi'; // Add icons for wishlist and view details

const Home = () => {
  const [wishlist, setWishlist] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [loading, setLoading] = useState(false); // Loading state for API calls

  // Fetch Blog Data using Axios
  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs?page=${page}&limit=6`);
      const { data, pagination } = response.data;
      setBlogs(data);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs on component mount and when page changes
  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  // Add Blog to Wishlist
  const addToWishlist = (blog) => {
    if (!wishlist.some((item) => item.id === blog.id)) {
      setWishlist([...wishlist, blog]);
      toast.success(`${blog.title} has been added to your wishlist!`);
    } else {
      toast.info(`${blog.title} is already in your wishlist!`);
    }
  };

  // Handle Newsletter Subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Thank you for subscribing to our newsletter!');
  };

  // Show Blog Details
  const showBlogDetails = (id) => {
    setSelectedBlog(_id);
  };

  // Close Blog Details
  const closeBlogDetails = () => {
    setSelectedBlog(null);
  };

  // Handle Pagination
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4 text-center shadow-lg">
        <h1 className="text-3xl font-bold">Our Blog Website</h1>
      </header>

      {/* Banner */}
      <section
        className="bg-cover bg-center h-72 flex items-center justify-center text-white"
        style={{ backgroundImage: 'url(https://picsum.photos/1200/400)' }}
      >
        <h2 className="text-5xl font-bold text-shadow-md">Enrich Your Knowledge</h2>
      </section>

      {/* Recent Blog Posts */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Blog Posts</h2>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="spinner-border text-gray-600" role="status"></div>
          </div>
        ) : blogs.length === 0 ? (
          <p>No blogs available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={blog.image || 'default-image-url.jpg'}
                  alt={`Blog titled: ${blog.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-2">Author: {blog.author}</p>
                  <p className="text-gray-600 mb-4">Date: {blog.date}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToWishlist(blog)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
                    >
                      <FiHeart className="inline-block mr-2" />
                      Add to Wishlist
                    </button>
                    <button
                      onClick={() => showBlogDetails(id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
                    >
                      <FiEye className="inline-block mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400 transition-all"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400 transition-all"
          >
            Next
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Subscribe to Our Newsletter</h2>
          <form onSubmit={handleSubscribe} className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-2 w-64 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-600 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Tips Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Blogging Tips</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Write blogs regularly</li>
          <li>Do keyword research</li>
          <li>Use images and videos</li>
          <li>Create interactive content</li>
        </ul>
      </section>

      {/* Blog Details Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-all"
          role="dialog"
          aria-labelledby="blog-modal"
          aria-hidden={!selectedBlog}
        >
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full transform transition-all">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedBlog.title}</h2>
            <p className="text-gray-600 mb-2">Author: {selectedBlog.author}</p>
            <p className="text-gray-600 mb-4">Date: {selectedBlog.date}</p>
            <p className="text-gray-800">{selectedBlog.content}</p>
            <button
              onClick={closeBlogDetails}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
