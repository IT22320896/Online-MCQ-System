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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Exams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="border p-4 rounded shadow cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/exam/${exam._id}`)}
          >
            <h2 className="text-xl font-semibold">{exam.title}</h2>
            <p className="text-gray-600">{exam.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamList;
