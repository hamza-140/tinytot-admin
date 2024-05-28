import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {firestore} from '../../firebase.config';
import {collection, getDocs} from 'firebase/firestore';

function Workbook() {
  const [quizzesData, setQuizzesData] = useState([]);
  const [activeSubject, setActiveSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = [];
      try {
        const querySnapshot = await getDocs(collection(firestore, 'quizzes'));
        querySnapshot.forEach(doc => {
          const docData = doc.data();
          data.push({subject: doc.id, quizzes: docData.quizzes || []});
        });
        setQuizzesData(data);
        setActiveSubject(data[0]?.subject || '');
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzesData.filter(
    subjectData =>
      subjectData.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subjectData.quizzes.some(quiz =>
        quiz.question.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="container  flex flex-col justify-center items-center mx-auto py-10">
      <h1 className="text-4xl font-bold w-auto text-center">Workbook</h1>
      <div className="bg-white w-[100%] text-center shadow-lg">
        <div className="  space-x-4 py-4">
          {quizzesData.map((subjectData, index) => (
            <button
              key={index}
              className={`px-4 py-2 font-semibold rounded transition-colors duration-200 ${
                activeSubject === subjectData.subject
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setActiveSubject(subjectData.subject)}>
              {subjectData.subject}
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => navigate('/workbook/add')}>
            Add New Quiz
          </button>
          <input
            type="text"
            placeholder="Search quizzes..."
            className="ml-4 px-3 py-2 border rounded-lg"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-24">
        {filteredQuizzes
          .filter(subjectData => subjectData.subject === activeSubject)
          .map((subjectData, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {subjectData.subject}
              </h2>
              <ul>
                {subjectData.quizzes.length > 0 ? (
                  subjectData.quizzes.map((quizItem, quizIndex) => (
                    <li
                      key={quizIndex}
                      className="mb-4 p-4 bg-white shadow rounded-lg cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/workbook/edit/${subjectData.subject}/${quizIndex}`,
                        )
                      }>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            {quizItem.question}
                          </h3>
                          {quizItem.type === 'multipleChoice' && (
                            <ul className="ml-4 list-disc">
                              {quizItem.options.map((option, optionIndex) => (
                                <li key={optionIndex}>{option}</li>
                              ))}
                            </ul>
                          )}
                          {quizItem.type === 'blankSpace' && (
                            <p>Answer: {quizItem.answer}</p>
                          )}
                          {quizItem.type === 'trueFalse' && (
                            <p>Answer: {quizItem.answer ? 'True' : 'False'}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">
                    No quizzes available for this subject.
                  </li>
                )}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Workbook;
