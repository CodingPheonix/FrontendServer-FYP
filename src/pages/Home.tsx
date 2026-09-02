import Navbar from "../components/Navbar";


const Home = () => {
  return (
    <div className="min-h-screen bg-pink-50">
      
      {/* Navbar */}
      <Navbar />

      {/* Home Content */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-600">
            Home Page
          </h1>

          <p className="mt-3 text-gray-600">
            Abhi time nehi he, bad me karenge..
          </p>
        </div>
      </div>

    </div>
  );
};

export default Home;