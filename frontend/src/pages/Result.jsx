import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const score = location.state?.score || 0;
  const answers = location.state?.answers || [];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Your Score: {score}
        </h2>

        {answers.map((ans, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <p className="font-semibold">
              {index + 1}. {ans.questionText}
            </p>
            <ul className="ml-4 mt-2">
              {ans.options.map((opt, idx) => {
                const isCorrect = idx === ans.correctOption;
                const isSelected = idx === ans.selectedOption;
                const isWrong = isSelected && !isCorrect;

                return (
                  <li
                    key={idx}
                    className={`p-1 rounded ${
                      isCorrect ? "bg-green-100" : isWrong ? "bg-red-100" : ""
                    }`}
                  >
                    {opt} {isCorrect ? "(Correct)" : ""}{" "}
                    {isSelected ? "(Your answer)" : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

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
