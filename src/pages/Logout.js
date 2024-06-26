import {createClient} from '@supabase/supabase-js';
import React, {Component, useEffect, useState} from 'react';
import sidebar_menu from '../constants/sidebar-menu';
import SideBar from '../components/Sidebar';
import {useNavigate} from 'react-router-dom';
const supabase = createClient(
  'https://zgsejcpidljcdejqxxzt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnc2VqY3BpZGxqY2RlanF4eHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MTk1MjYsImV4cCI6MjAzNDk5NTUyNn0.Ltd6rV8howsUQwlGY55Inf1aXoZOqFXktUBfPLIjlQU',
);
function Logout() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    navigate('/');
  } else {
    return (
      <div className="container">
        <SideBar menu={sidebar_menu}></SideBar>
        <div className="body">
          {' '}
          <button
            onClick={() => {
              supabase.auth.signOut();
              navigate('/');
            }}>
            Sign out
          </button>
        </div>
      </div>
    );
  }
}

export default Logout;
