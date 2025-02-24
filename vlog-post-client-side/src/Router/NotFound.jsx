// src/Component/NotFound.js


const NotFound = () => {
  return (
 <div>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
  <h1 class="text-9xl font-extrabold text-gray-700">404</h1>
  <p class="mt-4 text-xl text-gray-600">Oops! The page you're looking for doesn't exist.</p>
  <p class="mt-2 text-sm text-gray-500">It might have been moved or deleted.</p>
  <a
    href="/"
    class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-red-700 transition"
  >
    Go Back Home
  </a>
</div>

 </div>
  );
};

export default NotFound;
