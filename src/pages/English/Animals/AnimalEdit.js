import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {firestore} from '../../../firebase.config';
import {doc, getDoc, setDoc, deleteDoc} from 'firebase/firestore';

function AnimalEdit() {
  const {id} = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bg, setBg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const docRef = doc(firestore, 'animals', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setBg(data.bg);
        } else {
          console.error(`No such document with id: ${id}`);
        }
      } catch (error) {
        console.error(`Error fetching document with id: ${id}`, error);
      }
      setLoading(false);
    };

    fetchAnimalData();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const oldDocRef = doc(firestore, 'animals', id);
      const oldDocSnap = await getDoc(oldDocRef);
      const oldData = oldDocSnap.data();

      const newDocRef = doc(firestore, 'animals', title);
      await setDoc(newDocRef, {title, description, bg});

      if (id !== title) {
        await deleteDoc(oldDocRef);
      }

      navigate('/english/animals');
    } catch (error) {
      console.error('Error updating animal:', error);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const docRef = doc(firestore, 'animals', id);
      await deleteDoc(docRef);

      navigate('/english/animals');
    } catch (error) {
      console.error('Error deleting animal:', error);
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
        <h1 className="text-3xl font-bold mb-6">Edit Animal</h1>
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
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Update Animal
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete Animal
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimalEdit;
