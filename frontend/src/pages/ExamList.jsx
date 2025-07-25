import { useEffect, useState } from "react";
import { getExams } from "../api";
import { useNavigate } from "react-router-dom";

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getExams().then((res) => setExams(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Available Exams
          </h1>
          <p className="text-gray-600">
            Choose an exam to test your knowledge and skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-lg hover:border-blue-300 transform transition-all duration-200 hover:scale-105 group flex flex-col h-full"
              onClick={() => navigate(`/exam/${exam._id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {exam.title}
                </h2>
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              <p className="text-gray-600 leading-relaxed flex-grow">
                {exam.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                  Start Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamList;
