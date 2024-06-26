import React from 'react';
import SideBar from '../../components/Sidebar';
import sidebar_menu from '../../constants/sidebar-menu';
import './homepage.css';
import english from '../../assets/images/englishbook.png';
import math from '../../assets/images/mathbook.png';
import islamiyat from '../../assets/images/islambook.png';
import workbook from '../../assets/images/workbook.png';
import {Link} from 'react-router-dom';
import {createClient} from '@supabase/supabase-js';
const supabase = createClient(
  'https://zgsejcpidljcdejqxxzt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnc2VqY3BpZGxqY2RlanF4eHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MTk1MjYsImV4cCI6MjAzNDk5NTUyNn0.Ltd6rV8howsUQwlGY55Inf1aXoZOqFXktUBfPLIjlQU',
);
function Homepage() {
  console.log('homepage:', supabase.from('Users').select('*'));
  return (
    <div className="container">
      <SideBar menu={sidebar_menu}></SideBar>
      <div className="body">
        <div className="content-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/english">
              <div className="card">
                <div className="card-inner">
                  <img alt="English" src={english} className="card-image" />
                  <div className="card-text">English</div>
                </div>
              </div>
            </Link>
            <Link to="/math">
              <div className="card">
                <div className="card-inner">
                  <img alt="Math" src={math} className="card-image" />
                  <div className="card-text">Math</div>
                </div>
              </div>
            </Link>
            <Link to="/islam">
              <div className="card">
                <div className="card-inner">
                  <img alt="Islamiyat" src={islamiyat} className="card-image" />
                  <div className="card-text">Islamiyat</div>
                </div>
              </div>
            </Link>
            <Link to="/workbook">
              <div className="card">
                <div className="card-inner">
                  <img alt="Workbook" src={workbook} className="card-image" />
                  <div className="card-text">Workbook</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
