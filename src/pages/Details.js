import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './Details.css'; // Importing the CSS file for styling

const calculateProgress = (subject = {}) => {
  const totalLessons = Object.keys(subject).length;
  const completedLessons = Object.values(subject).filter(
    lesson => lesson.isCompleted,
  ).length;
  return {completed: completedLessons, total: totalLessons};
};

const Details = () => {
  const location = useLocation();
  const {parent} = location.state || {}; // Accessing the parent object from location state

  useEffect(() => {
    console.log('data', parent);
  }, [parent]);

  if (!parent) {
    // Handle case where parent data is not available
    return <div className="no-data">No parent data available</div>;
  }

  const mathProgress = calculateProgress(parent.math);
  const englishProgress = calculateProgress(parent.english);
  const islamiyatProgress = calculateProgress(parent.islamiyat);

  return (
    <div className="details-container">
      <div className="details-card">
        <h2 className="details-title">Parent Details</h2>
        <p>
          <span className="details-label">Name:</span> {parent.name}
        </p>
        <p>
          <span className="details-label">ID:</span> {parent.id}
        </p>
        <p>
          <span className="details-label">Email:</span> {parent.email}
        </p>
        <h2 className="details-title">Kid Info</h2>
        <p>
          <span className="details-label">Name:</span>{' '}
          {parent.kidInfo?.name || 'N/A'}
        </p>
        <p>
          <span className="details-label">Age:</span>{' '}
          {parent.kidInfo?.age || 'N/A'}
        </p>
        <h2 className="details-title">Progress</h2>
        <div className="progress-section">
          <p>
            <span className="details-label">Math Progress:</span>{' '}
            {mathProgress.completed} out of {mathProgress.total} lessons
            completed
          </p>
          <p>
            <span className="details-label">English Progress:</span>{' '}
            {englishProgress.completed} out of {englishProgress.total} lessons
            completed
          </p>
          <p>
            <span className="details-label">Islamiyat Progress:</span>{' '}
            {islamiyatProgress.completed} out of {islamiyatProgress.total}{' '}
            lessons completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
