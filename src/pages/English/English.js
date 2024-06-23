import React from 'react';
import {Link} from 'react-router-dom';

function English() {
  return (
    <div
      className="flex flex-col items-center h-screen py-10"
      style={{backgroundColor: '#FFD700'}}>
      <h1 className="text-4xl font-bold mb-12">English Modules</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
        {/* Lessons Card */}
        <Link
          to="/english/lessons"
          className="card p-6 bg-blue-400 hover:bg-blue-500 shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-white mb-2">Lessons</h2>
          <p className="text-gray-200">Explore lessons related to alphabets.</p>
        </Link>
        {/* Phonics Card */}
        <Link
          to="/english/phonics"
          className="card p-6 bg-green-400 hover:bg-green-500 shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-white mb-2">Phonics</h2>
          <p className="text-gray-200">Learn phonics sounds and rules.</p>
        </Link>
        {/* Shapes Card */}
        <Link
          to="/english/shapes"
          className="card p-6 bg-purple-400 hover:bg-purple-500 shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-white mb-2">Shapes</h2>
          <p className="text-gray-200">Discover shapes vocabulary.</p>
        </Link>
        {/* Animals Card */}
        <Link
          to="/english/animals"
          className="card p-6 bg-yellow-400 hover:bg-yellow-500 shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold text-white mb-2">Animals</h2>
          <p className="text-gray-200">Explore animal names and sounds.</p>
        </Link>
      </div>
    </div>
  );
}

export default English;
