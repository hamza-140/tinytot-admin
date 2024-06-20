import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {firestore} from '../../../firebase.config';
import {doc, getDoc, updateDoc} from 'firebase/firestore';

function LessonEdit() {
  const {letter} = useParams();
  const [url, setUrl] = useState('');
  const [svg, setSvg] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(firestore, 'alphabetVideos', letter);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUrl(data.url);
        setSvg(data.svg);
      }
      setLoading(false);
    };

    fetchDocument();
  }, [letter]);

  const handleUpdate = async () => {
    const docRef = doc(firestore, 'alphabetVideos', letter);
    await updateDoc(docRef, {url, svg});
    alert('Document updated successfully!');
    navigate('/english/lessons');
  };

  if (loading) {
    return <div>Loading...</div>;
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            SVG
          </label>
          <input
            type="text"
            value={svg}
            onChange={e => setSvg(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Update
        </button>
      </div>
    </div>
  );
}

export default LessonEdit;
