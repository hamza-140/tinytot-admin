import React from 'react';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import './homepage.css';
import english from '../../assets/images/englishbook.png';
import math from '../../assets/images/mathbook.png';
import islamiyat from '../../assets/images/islambook.png';
import workbook from '../../assets/images/workbook.png';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

function Homepage() {
  return (
    <div
      className="container"
      style={{backgroundColor: '#FFF', height: '100vh'}}>
      <SideBar menu={sidebar_menu}></SideBar>
      <div className="body">
        {/* <Navbar></Navbar> */}

        <div className="flex justify-center items-center">
          <div className="content-wrapper">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/english">
                <div className="group card hover:cursor-pointer">
                  <div className="card-inner">
                    <div className="flex justify-center mx-auto">
                      <img
                        alt="English"
                        src={english}
                        className="card-image"></img>
                    </div>
                    <div className="card-text">English</div>
                  </div>
                </div>
              </Link>
              <Link to="/math">
                <div className="group card hover:cursor-pointer">
                  <div className="card-inner">
                    <div className="flex justify-center mx-auto">
                      <img alt="Math" src={math} className="card-image"></img>
                    </div>
                    <div className="card-text">Math</div>
                  </div>
                </div>
              </Link>
              <Link to="/islam">
                <div className="group card hover:cursor-pointer">
                  <div className="card-inner">
                    <div className="flex justify-center mx-auto">
                      <img
                        alt="Islamiyat"
                        src={islamiyat}
                        className="card-image"></img>
                    </div>
                    <div className="card-text">Islamiyat</div>
                  </div>
                </div>
              </Link>
              <Link to="/workbook">
                <div className="group card hover:cursor-pointer">
                  <div className="card-inner">
                    <div className="flex justify-center mx-auto">
                      <img
                        alt="Workbook"
                        src={workbook}
                        className="card-image"></img>
                    </div>
                    <div className="card-text">Workbook</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
