import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
 const location = useLocation();
 const score = location.state?.score || 0;
 const answers = location.state?.answers || [];
 const navigate = useNavigate();

 const totalQuestions = answers.length;
 const correctAnswers = answers.filter(ans => ans.selectedOption === ans.correctOption).length;
 const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

 const getScoreColor = () => {
   if (percentage >= 80) return 'text-green-600';
   if (percentage >= 60) return 'text-yellow-600';
   return 'text-red-600';
 };

 const getScoreBgColor = () => {
   if (percentage >= 80) return 'from-green-500 to-emerald-600';
   if (percentage >= 60) return 'from-yellow-500 to-orange-600';
   return 'from-red-500 to-pink-600';
 };

 const getOptionLabel = (index) => {
   return String.fromCharCode(65 + index);
 };

 return (
   <div className="min-h-screen bg-gray-50 py-8 px-4">
     <div className="max-w-4xl mx-auto">
       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
         <div className="text-center">
           <div className="mb-6">
             <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${getScoreBgColor()} text-white mb-4`}>
               <span className="text-2xl font-bold">{percentage}%</span>
             </div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h2>
             <p className="text-gray-600">Here are your results</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-gray-50 rounded-xl p-4">
               <div className="text-2xl font-bold text-gray-900">{score}</div>
               <div className="text-sm text-gray-600">Total Score</div>
             </div>
             <div className="bg-gray-50 rounded-xl p-4">
               <div className={`text-2xl font-bold ${getScoreColor()}`}>{correctAnswers}/{totalQuestions}</div>
               <div className="text-sm text-gray-600">Correct Answers</div>
             </div>
             <div className="bg-gray-50 rounded-xl p-4">
               <div className={`text-2xl font-bold ${getScoreColor()}`}>{percentage}%</div>
               <div className="text-sm text-gray-600">Accuracy</div>
             </div>
           </div>
         </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
         <div className="flex items-center">
           {percentage >= 80 ? (
             <div className="flex items-center text-green-600">
               <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <div>
                 <h3 className="font-semibold">Excellent Performance!</h3>
                 <p className="text-green-700">You demonstrated strong knowledge of the subject.</p>
               </div>
             </div>
           ) : percentage >= 60 ? (
             <div className="flex items-center text-yellow-600">
               <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <div>
                 <h3 className="font-semibold">Good Effort!</h3>
                 <p className="text-yellow-700">You're on the right track. Keep practicing to improve.</p>
               </div>
             </div>
           ) : (
             <div className="flex items-center text-red-600">
               <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.872-.833-2.5 0L5.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
               </svg>
               <div>
                 <h3 className="font-semibold">Keep Learning!</h3>
                 <p className="text-red-700">Don't worry, practice makes perfect. Review the questions below.</p>
               </div>
             </div>
           )}
         </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
         <h3 className="text-xl font-bold text-gray-900 mb-6">Question Review</h3>
         
         <div className="space-y-6">
           {answers.map((ans, index) => (
             <div key={index} className="border border-gray-200 rounded-lg p-6">
               <div className="flex items-start mb-4">
                 <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-semibold text-sm mr-4">
                   {index + 1}
                 </div>
                 <p className="text-lg font-medium text-gray-900 leading-relaxed">
                   {ans.questionText}
                 </p>
               </div>

               <div className="ml-12 space-y-2">
                 {ans.options.map((opt, idx) => {
                   const isCorrect = idx === ans.correctOption;
                   const isSelected = idx === ans.selectedOption;
                   const isWrong = isSelected && !isCorrect;

                   return (
                     <div
                       key={idx}
                       className={`flex items-center p-3 rounded-lg border-2 ${
                         isCorrect 
                           ? 'border-green-500 bg-green-50' 
                           : isWrong 
                           ? 'border-red-500 bg-red-50' 
                           : 'border-gray-200 bg-gray-50'
                       }`}
                     >
                       <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                         isCorrect 
                           ? 'border-green-500 bg-green-500' 
                           : isWrong 
                           ? 'border-red-500 bg-red-500' 
                           : 'border-gray-300 bg-white'
                       }`}>
                         {isCorrect && (
                           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                           </svg>
                         )}
                         {isWrong && (
                           <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                           </svg>
                         )}
                       </div>
                       
                       <div className="flex items-center flex-grow">
                         <span className={`font-medium mr-3 ${
                           isCorrect ? 'text-green-600' : isWrong ? 'text-red-600' : 'text-gray-500'
                         }`}>
                           {getOptionLabel(idx)}.
                         </span>
                         <span className="text-gray-900">{opt}</span>
                         
                         <div className="ml-auto flex items-center space-x-2">
                           {isCorrect && (
                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                               Correct Answer
                             </span>
                           )}
                           {isSelected && (
                             <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                               isCorrect ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                             }`}>
                               Your Answer
                             </span>
                           )}
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
             </div>
           ))}
         </div>
       </div>

       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button
             className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
             onClick={() => navigate("/exams")}
           >
             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
             Take Another Exam
           </button>
           
           <button
             className="bg-gray-100 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
             onClick={() => window.print()}
           >
             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
             </svg>
             Print Results
           </button>
         </div>
       </div>
     </div>
   </div>
 );
};

export default Result;