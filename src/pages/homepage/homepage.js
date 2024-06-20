import React from 'react';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import './homepage.css';
import english from '../../assets/images/englishbook.png';
import math from '../../assets/images/mathbook.png';
import islamiyat from '../../assets/images/islambook.png';
import workbook from '../../assets/images/workbook.png';
import {Link} from 'react-router-dom';

function Homepage() {
  return (
    <div className="container">
      <SideBar menu={sidebar_menu}></SideBar>
      <div className="body">
        <div className="content-wrapper">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* English Card */}
            <Link to="/english">
              <div className="group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:cursor-pointer hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-1 rounded-md overflow-hidden relative">
                <div className="px-8 py-10">
                  <div className="w-[100px] h-[100px] rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-lime-900 transition-all">
                    <img alt="img" src={english}></img>
                  </div>
                  <div className="text-white uppercase font-bold text-xl">
                    English
                  </div>
                </div>
                <div className="h-4 w-full bg-gradient-to-r from-transparent via-lime-500 to-transparent group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0 duration-300"></div>
                <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-lime-900 group-hover:via-lime-500 w-[70%] m-auto rounded transition-all hover:duration-300"></div>
              </div>
            </Link>

            {/* Math Card */}
            <div className="group bg-gradient-to-tl hover:cursor-pointer from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-1 rounded-md overflow-hidden relative">
              <div className="px-8 py-10">
                <div className="w-[100px] h-[100px] rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-lime-900 transition-all">
                  <img alt="img" src={math}></img>
                </div>
                <div className="text-white uppercase font-bold text-xl">
                  Math
                </div>
              </div>
              <div className="h-4 w-full bg-gradient-to-r from-transparent via-lime-500 to-transparent group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0 duration-300"></div>
              <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-lime-900 group-hover:via-lime-500 w-[70%] m-auto rounded transition-all hover:duration-300"></div>
            </div>

            {/* Islamiyat Card */}
            <Link to="/islam">
              <div className="group hover:cursor-pointer bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-1 rounded-md overflow-hidden relative">
                <div className="px-8 py-10">
                  <div className="w-[100px] h-[100px] rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-lime-900 transition-all">
                    <img alt="img" src={islamiyat}></img>
                  </div>
                  <div className="text-white uppercase font-bold text-xl">
                    Islamiyat
                  </div>
                </div>
                <div className="h-4 w-full bg-gradient-to-r from-transparent via-lime-500 to-transparent group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0 duration-300"></div>
                <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-lime-900 group-hover:via-lime-500 w-[70%] m-auto rounded transition-all hover:duration-300"></div>
              </div>
            </Link>

            {/* Workbook Card */}
            <Link to="/workbook">
              <div className="group hover:cursor-pointer bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-1 rounded-md overflow-hidden relative">
                <div className="px-8 py-10">
                  <div className="w-[100px] h-[100px] rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-lime-900 transition-all">
                    <img alt="img" src={workbook}></img>
                  </div>
                  <div className="text-white uppercase font-bold text-xl">
                    Workbook
                  </div>
                </div>
                <div className="h-4 w-full bg-gradient-to-r from-transparent via-lime-500 to-transparent group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0 duration-300"></div>
                <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-lime-900 group-hover:via-lime-500 w-[70%] m-auto rounded transition-all hover:duration-300"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
