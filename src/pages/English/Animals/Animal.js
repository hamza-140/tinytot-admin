import React, {useEffect, useState} from 'react';
import {firestore} from '../../../firebase.config';
import {collection, getDocs} from 'firebase/firestore';
import {Link} from 'react-router-dom';

function Animal() {
  const [animalsData, setAnimalsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimalsData = async () => {
      const data = [];
      const querySnapshot = await getDocs(collection(firestore, 'animals'));
      querySnapshot.forEach(doc => {
        data.push({id: doc.id, ...doc.data()});
      });
      setAnimalsData(data);
      setLoading(false);
    };

    fetchAnimalsData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-12">Animals</h1>
      <div className="mb-4">
        <Link
          to="/english/animals/add"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add New Animal
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {animalsData.map(animal => (
          <Link
            to={`/english/animals/edit/${animal.id}`}
            key={animal.id}
            className="card p-6 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
            style={{backgroundColor: animal.bg}}>
            <h2 className="text-2xl font-semibold mb-2">{animal.title}</h2>
            <p className="text-gray-600">Description: {animal.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Animal;
