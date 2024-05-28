import React, {useState} from 'react';
import {firestore} from '../../../firebase.config';
import {doc, setDoc} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';

function ShapeAdd() {
  const [title, setTitle] = useState('');
  const [svg, setSvg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = doc(firestore, 'shapes', title);
      await setDoc(docRef, {title, svg});
      navigate('/english/shapes');
    } catch (error) {
      console.error('Error adding shape:', error);
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
          <h1 className="text-3xl font-bold mb-6">Add New Shape</h1>
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
            <label htmlFor="svg" className="block text-gray-700 font-bold mb-2">
              SVG
            </label>
            <input
              type="text"
              id="svg"
              value={svg}
              onChange={e => setSvg(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Shape
          </button>
        </form>
      )}
    </div>
  );
}

export default ShapeAdd;
