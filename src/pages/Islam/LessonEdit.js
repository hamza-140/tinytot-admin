import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {firestore} from '../../firebase.config';
import {doc, getDoc, updateDoc, deleteDoc} from 'firebase/firestore';
import './LessonEdit.css';

function LessonEdit() {
  const {letter} = useParams();
  console.log(letter);

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(firestore, 'islamVideos', letter);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUrl(data.url);
      }
      setLoading(false);
    };

    fetchDocument();
  }, [letter]);

  const handleUpdate = async () => {
    const docRef = doc(firestore, 'islamVideos', letter);
    await updateDoc(docRef, {url});
    alert('Document updated successfully!');
    navigate('/islam');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this document?',
    );
    if (confirmDelete) {
      const docRef = doc(firestore, 'islamVideos', letter);
      await deleteDoc(docRef);
      alert('Document deleted successfully!');
      navigate('/islam');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8">
        Edit Document: {letter.toUpperCase()}
      </h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            URL
          </label>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default LessonEdit;
