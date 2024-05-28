import React, { useState, useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import './Dashboard.css'; // Import your CSS file for Dashboard styles
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import '../../App.css';

// Function to fetch all parents from Firestore
const fetchAllParents = async () => {
  const parentsList = [];
  const querySnapshot = await getDocs(collection(getFirestore(), 'parents'));
  querySnapshot.forEach(doc => {
    parentsList.push({ id: doc.id, ...doc.data() });
  });
  return parentsList;
};

// Skeleton component for loading state
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-item"></div>
    <div className="skeleton-item"></div>
    <div className="skeleton-item"></div>
  </div>
);

const Dashboard = () => {
  let navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    // Fetch all parents when the component mounts
    const fetchData = async () => {
      const parentsList = await fetchAllParents();
      setParents(parentsList);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render
  const dummyData = {
    title: "Title",
    total: "123",
    rate: "+10%",
    levelUp: true,
    levelDown: false
  };
  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-body">
        {/* <DashboardHeader /> */}
        <div className="content-wrapper">
    
        <h2 className="text-2xl font-bold m-10 leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          List of Parents
        </h2>          {loading ? (
            <SkeletonLoader /> // Render skeleton loader when data is being fetched
          ) : (
            <ul className="parent-list">
              {parents.map(parent => (
                <li key={parent.id} className="parent-item">
                  <div
                    className="parent-details"
                    onClick={() => {
                      navigate('/details', { state: { parent } });
                      console.log({ parent });
                    }}>
                    <div>
                      <strong>Name:</strong> {parent.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {parent.email}
                    </div>
                    {/* Add more fields as needed */}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
