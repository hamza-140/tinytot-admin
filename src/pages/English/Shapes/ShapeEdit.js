import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {firestore} from '../../../firebase.config';
import {doc, getDoc, setDoc, deleteDoc} from 'firebase/firestore';

function ShapeEdit() {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [svg, setSvg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShapeData = async () => {
      try {
        const docRef = doc(firestore, 'shapes', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setSvg(data.svg);
        } else {
          console.error(`No such document with id: ${id}`);
        }
      } catch (error) {
        console.error(`Error fetching document with id: ${id}`, error);
      }
      setLoading(false);
    };

    fetchShapeData();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // Fetch existing document data
      const oldDocRef = doc(firestore, 'shapes', id);
      const oldDocSnap = await getDoc(oldDocRef);
      const oldData = oldDocSnap.data();

      // Create new document with new title as ID
      const newDocRef = doc(firestore, 'shapes', title);
      await setDoc(newDocRef, {title, svg});

      // Delete old document
      await deleteDoc(oldDocRef);

      // Navigate back to shapes list
      navigate('/english/shapes');
    } catch (error) {
      console.error('Error updating shape:', error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Delete document
      const docRef = doc(firestore, 'shapes', id);
      await deleteDoc(docRef);

      // Navigate back to shapes list
      navigate('/english/shapes');
    } catch (error) {
      console.error('Error deleting shape:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Edit Shape</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
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
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Update Shape
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete Shape
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShapeEdit;
