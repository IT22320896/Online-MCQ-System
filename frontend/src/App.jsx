import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ExamList from "./pages/ExamList";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
         <Route path="/exams" element={<ExamList />} />
      </Routes>
    </Router>
  );
}

export default App;
