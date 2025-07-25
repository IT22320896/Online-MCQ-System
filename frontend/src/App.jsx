import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import ExamList from "./pages/ExamList";
import MCQTest from "./pages/MCQTest";
import Result from "./pages/Result";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/exam/:id" element={<MCQTest user={user} />} />
        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
