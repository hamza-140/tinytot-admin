import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './Details.css'; // Importing the CSS file for styling
import FeedbackForm from './Form';

// Register Chart.js components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const calculateProgress = (subject = {}) => {
  const totalLessons = Object.keys(subject).length;
  const completedLessons = Object.values(subject).filter(
    lesson => lesson.isCompleted,
  ).length;
  return {completed: completedLessons, total: totalLessons};
};

const getChartData = (progress, label) => {
  return {
    labels: ['Completed', 'Incomplete'],
    datasets: [
      {
        label,
        data: [progress.completed, progress.total - progress.completed],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };
};

const getChartOptions = progress => {
  const completionPercentage = (
    (progress.completed / progress.total) *
    100
  ).toFixed(2);
  return {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          if (label === 'Completed') {
            return `${completionPercentage}%`;
          }
          return null;
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: '16',
        },
      },
    },
  };
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

  const mathChartData = getChartData(mathProgress, 'Math Progress');
  const englishChartData = getChartData(englishProgress, 'English Progress');
  const islamiyatChartData = getChartData(
    islamiyatProgress,
    'Islamiyat Progress',
  );

  const mathChartOptions = getChartOptions(mathProgress);
  const englishChartOptions = getChartOptions(englishProgress);
  const islamiyatChartOptions = getChartOptions(islamiyatProgress);

  return (
    <div className="details-container">
      <div className="details-card">
        <h2 className="details-title underline">Parent Details</h2>
        <p>
          <span className="details-label">Name:</span> {parent.name}
        </p>
        <p>
          <span className="details-label">ID:</span> {parent.id}
        </p>
        <p>
          <span className="details-label">Email:</span> {parent.email}
        </p>
        <h2 className="details-title underline">Kid Info</h2>
        <p>
          <span className="details-label">Name:</span>{' '}
          {parent.kidInfo?.name || 'N/A'}
        </p>
        <p>
          <span className="details-label">Age:</span>{' '}
          {parent.kidInfo?.age || 'N/A'}
        </p>
        <h2 className="details-title underline">Progress</h2>
        <div className="progress-section">
          <div className="chart-container">
            <h3>Math Progress</h3>
            <Doughnut data={mathChartData} options={mathChartOptions} />
          </div>
          <div className="chart-container">
            <h3>English Progress</h3>
            <Doughnut data={englishChartData} options={englishChartOptions} />
          </div>
          <div className="chart-container">
            <h3>Islamiyat Progress</h3>
            <Doughnut
              data={islamiyatChartData}
              options={islamiyatChartOptions}
            />
          </div>
        </div>
      </div>
      <FeedbackForm parentEmail={parent.email} parentName={parent.name} />
    </div>
  );
};

export default Details;
