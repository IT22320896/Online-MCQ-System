import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions, submitAnswers } from "../api";

const MCQTest = ({ user }) => {
 const { id } = useParams();
 const [questions, setQuestions] = useState([]);
 const [answers, setAnswers] = useState({});
 const [isSubmitting, setIsSubmitting] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
   getQuestions(id).then((res) => setQuestions(res.data));
 }, [id]);

 const handleSelect = (qId, index) => {
   setAnswers((prev) => ({ ...prev, [qId]: index }));
 };

 const handleSubmit = async () => {
   setIsSubmitting(true);
   try {
     const formatted = Object.entries(answers).map(
       ([questionId, selectedOption]) => ({
         questionId,
         selectedOption,
       })
     );
     const res = await submitAnswers(id, { userId: user.id, answers: formatted });
     navigate(`/result/${res.data.resultId}`, {
       state: {
         score: res.data.score,
         answers: res.data.answers,
       },
     });
   } catch (error) {
     console.error("Submit failed:", error);
     setIsSubmitting(false);
   }
 };

 const getAnsweredCount = () => {
   return Object.keys(answers).length;
 };

 const getOptionLabel = (index) => {
   return String.fromCharCode(65 + index);
 };

 return (
   <div className="min-h-screen bg-gray-50 py-8 px-4">
     <div className="max-w-4xl mx-auto">
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
         <div className="flex items-center justify-between">
           <div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">MCQ Test</h2>
             <p className="text-gray-600">Answer all questions to complete the test</p>
           </div>
           <div className="text-right">
             <div className="text-sm text-gray-500 mb-1">Progress</div>
             <div className="text-lg font-semibold text-blue-600">
               {getAnsweredCount()}/{questions.length}
             </div>
           </div>
         </div>
         
         <div className="mt-4">
           <div className="w-full bg-gray-200 rounded-full h-2">
             <div 
               className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
               style={{ width: `${questions.length ? (getAnsweredCount() / questions.length) * 100 : 0}%` }}
             ></div>
           </div>
         </div>
       </div>

       <div className="space-y-6">
         {questions.map((q, i) => (
           <div key={q._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <div className="flex items-start mb-4">
               <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                 {i + 1}
               </div>
               <p className="text-lg font-medium text-gray-900 leading-relaxed">
                 {q.questionText}
               </p>
             </div>
             
             <div className="ml-12 space-y-3">
               {q.options.map((opt, idx) => (
                 <label 
                   key={idx} 
                   className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                     answers[q._id] === idx 
                       ? 'border-blue-500 bg-blue-50 text-blue-900' 
                       : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                   }`}
                 >
                   <input
                     type="radio"
                     name={q._id}
                     className="sr-only"
                     checked={answers[q._id] === idx}
                     onChange={() => handleSelect(q._id, idx)}
                   />
                   <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                     answers[q._id] === idx 
                       ? 'border-blue-500 bg-blue-500' 
                       : 'border-gray-300'
                   }`}>
                     {answers[q._id] === idx && (
                       <div className="w-3 h-3 bg-white rounded-full"></div>
                     )}
                   </div>
                   <div className="flex items-center">
                     <span className={`font-medium mr-3 ${
                       answers[q._id] === idx ? 'text-blue-600' : 'text-gray-500'
                     }`}>
                       {getOptionLabel(idx)}.
                     </span>
                     <span className="text-gray-900">{opt}</span>
                   </div>
                 </label>
               ))}
             </div>
           </div>
         ))}
       </div>

       <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <div className="flex items-center justify-between">
           <div>
             <p className="text-sm text-gray-600 mb-1">
               {getAnsweredCount() === questions.length 
                 ? "All questions answered! Ready to submit." 
                 : `${questions.length - getAnsweredCount()} questions remaining`
               }
             </p>
             <div className="flex items-center text-sm text-gray-500">
               <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               Make sure to review your answers before submitting
             </div>
           </div>
           
           <button
             onClick={handleSubmit}
             disabled={getAnsweredCount() !== questions.length || isSubmitting}
             className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
           >
             {isSubmitting ? (
               <>
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Submitting...
               </>
             ) : (
               <>
                 Submit Answers
                 <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </>
             )}
           </button>
         </div>
       </div>
     </div>
   </div>
 );
};

export default MCQTest;