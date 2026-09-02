import Navbar from "../components/Navbar";

const Agent = () => {
  return (
    <div className="min-h-screen bg-pink-50">

      {/* Navbar */}
      <Navbar />

      {/* Agent Content */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-fuchsia-600">
            Agent Page
          </h1>

          <p className="mt-3 text-gray-600">
            ye sohom kam karne ke bad karenge...
          </p>
        </div>
      </div>

    </div>
  );
};

export default Agent;