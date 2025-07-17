function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-red-900 via-yellow-900 to-black text-white px-6">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
        Welcome to the Book Review Platform 📚
      </h1>
      <p className="text-gray-300 text-center max-w-xl mb-6">
        Explore books, read community reviews, and share your thoughts with other passionate readers. Your next great read starts here!
      </p>
      <a
        href="/books"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition"
      >
        Browse Books
      </a>
    </div>
  );
}

export default HomePage;
