import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {firestore} from '../../firebase.config';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

function WorkbookAdd() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizType, setQuizType] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'quizzes'));
        const subjectsList = [];
        querySnapshot.forEach(doc => {
          subjectsList.push(doc.id);
        });
        setSubjects(subjectsList);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleCreateQuiz = async () => {
    if (!selectedSubject || !quizType || !question || !answer) {
      alert('Please fill in all fields.');
      return;
    }

    const newQuiz = {question, answer, type: quizType};
    if (quizType === 'multipleChoice') {
      newQuiz.options = options;
    }

    try {
      const subjectRef = doc(firestore, 'quizzes', selectedSubject);
      await updateDoc(subjectRef, {
        quizzes: arrayUnion(newQuiz),
      });
      alert('Quiz created successfully');
      navigate('/workbook');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="container mx-auto py-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Add New Quiz</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Select Subject
          </label>
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="w-full p-2 border rounded-lg">
            <option value="">Select a subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Quiz Type</label>
          <select
            value={quizType}
            onChange={e => setQuizType(e.target.value)}
            className="w-full p-2 border rounded-lg">
            <option value="">Select quiz type</option>
            <option value="multipleChoice">Multiple Choice</option>
            <option value="blankSpace">Blank Space</option>
            <option value="trueFalse">True/False</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Question</label>
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        {quizType === 'multipleChoice' && (
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Options</label>
            {options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={e => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
                placeholder={`Option ${index + 1}`}
              />
            ))}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Answer</label>
          <input
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleCreateQuiz}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkbookAdd;
