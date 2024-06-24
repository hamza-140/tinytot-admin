import React, {useEffect, useState} from 'react';
import {firestore} from '../../../firebase.config';
import {collection, getDocs} from 'firebase/firestore';
import {Link} from 'react-router-dom';

function Shape() {
  const [shapeData, setShapeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShapeData = async () => {
      const data = [];
      try {
        const querySnapshot = await getDocs(collection(firestore, 'shapes'));
        querySnapshot.forEach(doc => {
          data.push({id: doc.id, ...doc.data()});
        });
      } catch (error) {
        console.error('Error fetching shapes:', error);
      }
      setShapeData(data);
      setLoading(false);
    };

    fetchShapeData();
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
      className="flex flex-col items-center py-10"
      style={{backgroundColor: '#f0f2f5', height: '100vh'}}>
      <h1 className="text-4xl font-bold mb-12">Shapes</h1>
      <Link
        to="/english/shapes/add"
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Add New Shape
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {shapeData.map(item => (
          <Link
            to={`/english/shapes/edit/${item.id}`}
            key={item.id}
            className="card p-6 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600">SVG: {item.svg}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Shape;
