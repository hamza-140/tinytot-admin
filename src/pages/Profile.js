import React from 'react';
import '../App.css';
import SideBar from '../components/Sidebar';
import sidebar_menu from '../constants/sidebar-menu';
const Profile = () => {
  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-body">User Profile Screen</div>
    </div>
  );
};

export default Profile;
