import React from 'react';
import {useLocation} from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const {parent} = location.state || {}; // Accessing the parent object from location state

  if (!parent) {
    // Handle case where parent data is not available
    return <div>No parent data available</div>;
  }

  return (
    <div style={{padding: 10}}>
      <h2>Details Page</h2>
      <p>Name: {parent.name}</p>
      <p>ID: {parent.id}</p>
      <p>Email: {parent.email}</p>
      <h2>Kid Info</h2>
      <p>Name: {parent.kidInfo.name}</p>
      <p>Age: {parent.kidInfo.age}</p>
    </div>
  );
};

export default Details;
