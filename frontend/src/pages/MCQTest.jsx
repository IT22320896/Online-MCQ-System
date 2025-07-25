import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions, submitAnswers } from "../api";

const MCQTest = ({ user }) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getQuestions(id).then((res) => setQuestions(res.data));
  }, [id]);

  const handleSelect = (qId, index) => {
    setAnswers((prev) => ({ ...prev, [qId]: index }));
  };

  const handleSubmit = () => {
    const formatted = Object.entries(answers).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })
    );
    submitAnswers(id, { userId: user.id, answers: formatted }).then((res) => {
      navigate(`/result/${res.data.resultId}`, {
        state: { score: res.data.score },
      });
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Answer the questions</h2>
      {questions.map((q, i) => (
        <div key={q._id} className="mb-6">
          <p className="font-medium">
            {i + 1}. {q.questionText}
          </p>
          <div className="ml-4">
            {q.options.map((opt, idx) => (
              <label key={idx} className="block">
                <input
                  type="radio"
                  name={q._id}
                  className="mr-2"
                  checked={answers[q._id] === idx}
                  onChange={() => handleSelect(q._id, idx)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default MCQTest;
