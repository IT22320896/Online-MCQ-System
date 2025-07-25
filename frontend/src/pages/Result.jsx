import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const score = location.state?.score || 0;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Your Score</h2>
        <p className="text-4xl text-green-600">{score}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/exams")}
        >
          Back to Exams
        </button>
      </div>
    </div>
  );
};

export default Result;
