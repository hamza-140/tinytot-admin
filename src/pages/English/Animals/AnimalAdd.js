import React, {useState} from 'react';
import {firestore} from '../../../firebase.config';
import {doc, setDoc} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';

function AnimalAdd() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bg, setBg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(firestore, 'animals', title);
      await setDoc(docRef, {title, description, bg});
      navigate('/english/animals');
    } catch (error) {
      console.error('Error adding animal:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Add New Animal</h1>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bg" className="block text-gray-700 font-bold mb-2">
              Background Color
            </label>
            <input
              type="text"
              id="bg"
              value={bg}
              onChange={e => setBg(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Animal
          </button>
        </form>
      )}
    </div>
  );
}

export default AnimalAdd;
