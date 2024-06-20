import React, {useEffect, useState} from 'react';
import {firestore} from '../../firebase.config';
import {collection, doc, getDoc, setDoc, getDocs} from 'firebase/firestore';
import {Link} from 'react-router-dom';

function Lesson() {
  const [islamData, setIslamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const fetchSize = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(
          collection(firestore, 'islamVideos'),
        );
        setSize(querySnapshot.size);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collection size:', error);
        setLoading(false);
      }
    };

    fetchSize();
  }, []);

  useEffect(() => {
    const fetchIslamData = async () => {
      if (size === 0) return;

      setLoading(true);
      const data = [];
      for (let i = 1; i <= size; i++) {
        try {
          const docRef = doc(firestore, 'islamVideos', i.toString());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            data.push({id: i, ...docSnap.data()});
          } else {
            await setDoc(docRef, {url: ''});
            data.push({id: i, url: 'NA'});
          }
        } catch (error) {
          console.error(
            `Error fetching or creating document for lesson ${i}:`,
            error,
          );
          data.push({id: i, url: 'NA'});
        }
      }
      setIslamData(data);
      setLoading(false);
    };

    fetchIslamData();
  }, [size]);

  const addNewLesson = async () => {
    try {
      const newLessonId = size + 1;
      const newDocRef = doc(firestore, 'islamVideos', newLessonId.toString());
      await setDoc(newDocRef, {url: newUrl});
      setIslamData([...islamData, {id: newLessonId, url: newUrl}]);
      setSize(newLessonId);
      setModalVisible(false);
      setNewUrl('');
    } catch (error) {
      console.error('Error adding new lesson:', error);
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
    <div
      style={{backgroundColor: '#FFD700'}}
      className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-12">Islamic Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {islamData.map(item => (
          <Link
            to={`/islam/edit/${item.id}`}
            key={item.id}
            className="card p-6 shadow-lg rounded-lg cursor-pointer transition-shadow duration-300"
            style={{
              backgroundColor: '#2E86AB',
              transition: 'background-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#1D4E89';
              e.currentTarget.style.boxShadow =
                '0 10px 15px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#2E86AB';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}>
            <h2 className="text-2xl text-white font-semibold mb-2">
              {item.id}
            </h2>
            <p className="text-white">
              <span className="font-bold" style={{color: '#FFA500'}}>
                URL :
              </span>{' '}
              {item.url}
            </p>
          </Link>
        ))}
      </div>
      <button
        style={{borderRadius: 8, padding: 10, marginTop: 20}}
        onClick={() => setModalVisible(true)}>
        <span style={{fontWeight: 'bold'}}>Add New Lesson</span>
      </button>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add New Lesson</h2>
            <input
              type="text"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              placeholder="Enter video URL"
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={addNewLesson}>
                Add
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setModalVisible(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lesson;
