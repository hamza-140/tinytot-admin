import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {firestore} from '../../firebase.config';
import {doc, getDoc, updateDoc} from 'firebase/firestore';

function WorkbookEdit() {
  const {subject, quizIndex} = useParams();
  const [quizData, setQuizData] = useState({
    type: 'multipleChoice',
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const docRef = doc(firestore, 'quizzes', subject);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const quizzes = docSnap.data().quizzes;
          setQuizData(quizzes[quizIndex]);
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [subject, quizIndex]);

  const handleEditQuiz = async () => {
    try {
      const docRef = doc(firestore, 'quizzes', subject);
      const docSnap = await getDoc(docRef);
      const quizzes = docSnap.data().quizzes;
      quizzes[quizIndex] = quizData;
      await updateDoc(docRef, {quizzes});
      navigate('/workbook');
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  const handleDeleteQuiz = async () => {
    try {
      const docRef = doc(firestore, 'quizzes', subject);
      const docSnap = await getDoc(docRef);
      const quizzes = docSnap.data().quizzes;
      quizzes.splice(quizIndex, 1);
      await updateDoc(docRef, {quizzes});
      navigate('/workbook');
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Edit Quiz</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleEditQuiz();
        }}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Question</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={quizData.question}
            onChange={e => setQuizData({...quizData, question: e.target.value})}
            required
          />
        </div>
        {quizData.type === 'multipleChoice' && (
          <>
            {quizData.options.map((option, index) => (
              <div key={index} className="mb-2">
                <label className="block text-gray-700 mb-1">
                  Option {index + 1}
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={option}
                  onChange={e => {
                    const options = [...quizData.options];
                    options[index] = e.target.value;
                    setQuizData({...quizData, options});
                  }}
                  required
                />
              </div>
            ))}
          </>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Answer</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={quizData.answer}
            onChange={e => setQuizData({...quizData, answer: e.target.value})}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Save Changes
        </button>
        <button
          type="button"
          className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={handleDeleteQuiz}>
          Delete Quiz
        </button>
      </form>
    </div>
  );
}

export default WorkbookEdit;
