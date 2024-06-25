import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Lesson2 from './pages/Lesson';
import Details from './pages/Details';
import Homepage from './pages/homepage/homepage';
import '../src/fonts/PFSquareSansPro-Bold-subset.otf';
import English from './pages/English/English';
import Lesson from './pages/English/Lessons/Lesson';
import Phonics from './pages/English/Phonics/Phonics';
import Shape from './pages/English/Shapes/Shape';
import LessonIslam from './pages/Islam/Lesson';
import Animal from './pages/English/Animals/Animal';
import LessonEdit from './pages/English/Lessons/LessonEdit';
import ShapeAdd from './pages/English/Shapes/ShapeAdd';
import ShapeEdit from './pages/English/Shapes/ShapeEdit';
import AnimalAdd from './pages/English/Animals/AnimalAdd';
import AnimalEdit from './pages/English/Animals/AnimalEdit';
import Workbook from './pages/Workbook/Workbook';
import WorkbookAdd from './pages/Workbook/WorkbookAdd';
import WorkbookEdit from './pages/Workbook/WorkbookEdit';
import LessonIslamEdit from './pages/Islam/LessonEdit';
import NotFoundPage from './Test';
import FeedbackForm from './pages/Form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/english" element={<English />} />
        <Route path="/english/lessons" element={<Lesson />} />
        <Route path="/english/lessons/edit/:letter" element={<LessonEdit />} />
        <Route path="/english/phonics" element={<Phonics />} />
        <Route path="/english/shapes" element={<Shape />} />
        <Route path="/english/shapes/add" element={<ShapeAdd />} />
        <Route path="/english/shapes/edit/:id" element={<ShapeEdit />} />
        <Route path="/english/animals" element={<Animal />} />
        <Route path="/english/animals/add" element={<AnimalAdd />} />
        <Route path="/english/animals/edit/:id" element={<AnimalEdit />} />
        <Route path="/workbook" element={<Workbook />} />
        <Route path="/workbook/add" element={<WorkbookAdd />} />
        <Route
          path="/workbook/edit/:subject/:quizIndex"
          element={<WorkbookEdit />}
        />
        <Route path="/english" element={<English />} />
        <Route path="/islam" element={<LessonIslam />} />
        <Route path="/islam/edit/:letter" element={<LessonIslamEdit />} />
        <Route path="/progress" element={<Dashboard />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details" element={<Details />} />
        <Route path="/details/:email/form" element={<FeedbackForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
