import React, {useEffect, useState} from 'react';
import {firestore} from '../../../firebase.config';
import {collection, doc, getDoc, setDoc} from 'firebase/firestore';
import {Link} from 'react-router-dom';

function Lesson() {
  const [alphabetData, setAlphabetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const alphabetRange = 'abcdefghijklmnopqrstuvwxyz'.split('');

  useEffect(() => {
    const fetchAlphabetData = async () => {
      const data = [];
      for (let letter of alphabetRange) {
        try {
          const docRef = doc(firestore, 'alphabetVideos', letter);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            data.push({id: letter, ...docSnap.data()});
          } else {
            // Create a new document with default values if it doesn't exist
            await setDoc(docRef, {url: 'NA', svg: 'NA'});
            data.push({id: letter, url: 'NA', svg: 'NA'});
          }
        } catch (error) {
          console.error(
            `Error fetching or creating document for letter ${letter}:`,
            error,
          );
          data.push({id: letter, url: 'NA', svg: 'NA'});
        }
      }
      setAlphabetData(data);
      setLoading(false);
    };

    fetchAlphabetData();
  }, []);

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
      <h1 className="text-4xl font-bold mb-12">Alphabet Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {alphabetData.map(item => (
          <Link
            style={{backgroundColor: '#2E86AB  '}}
            to={`/english/lessons/edit/${item.id}`}
            key={item.id}
            className="card p-6 shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl text-white font-semibold mb-2">
              {item.id.toUpperCase()}
            </h2>
            <p className="text-white">
              <span className="font-bold" style={{color: '#FFA500 '}}>
                URL :
              </span>{' '}
              {item.url}
            </p>
            <p className="text-white">
              <span className="font-bold" style={{color: '#FFA500 '}}>
                SVG :
              </span>{' '}
              {item.svg}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Lesson;
