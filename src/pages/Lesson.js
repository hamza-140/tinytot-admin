import React, {useState} from 'react';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {db} from '../firebase.config';
import './Lesson.css'; // Import CSS file for styling
import sidebar_menu from './../constants/sidebar-menu';
import SideBar from './../components/Sidebar/index';
import '../App.css';
function Lesson2() {
  const [file, setFile] = useState(null);
  const [lessonId, setLessonId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDetail, setLessonDetail] = useState('');
  const [lessonType, setLessonType] = useState('');
  const [lessonCategory, setLessonCategory] = useState('');
  const [selectedEnglishCategory, setSelectedEnglishCategory] = useState('');
  const [uploadError, setUploadError] = useState(null);

  // Predefined titles for each category
  const titleOptions = {
    Phonics: ['Animals', 'Colors', 'Fruits', 'Numbers'],
    Vocabulary: ['Family', 'Food', 'Weather', 'Sports'],
    Quizzes: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
    Stories: ['Story 1', 'Story 2', 'Story 3'],
  };

  const handleFileUpload = async () => {
    const storage = getStorage();
    let storageRef;
    const filePath =
      lessonType === 'video'
        ? `lessons/${lessonCategory}/Numbers/${lessonDetail}`
        : `lessons/${lessonCategory}/${selectedEnglishCategory}/${lessonTitle}/${lessonDetail}`;

    try {
      storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, file);
      console.log('File uploaded successfully!');
      setUploadError(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Error uploading file. Please try again.');
    }
  };

  // Function to handle lesson type change
  const handleLessonTypeChange = e => {
    setLessonType(e.target.value);
    // Clear file state when lesson type changes
    setFile(null);
  };

  // Function to handle category change
  const handleCategoryChange = category => {
    setLessonCategory(category);
    setLessonTitle(''); // Reset lesson title
  };

  return (
    <div className="dashboard-container">
      <SideBar menu={sidebar_menu} />
      <div className="dashboard-body">
        <div className="lesson-container">
          <h2>Upload Lesson</h2>
          <div className="lesson-form">
            <select value={lessonType} onChange={handleLessonTypeChange}>
              <option value="">Select Lesson Type</option>
              <option value="text">Text</option>
              <option value="video">Video</option>
              <option value="photo">Photo</option>
            </select>
            <select
              style={{marginTop: 20}}
              value={lessonCategory}
              onChange={e => handleCategoryChange(e.target.value)}>
              <option value="">Select Lesson Category</option>
              <option value="English">English</option>
              <option value="Math">Math</option>
              <option value="Islamic">Islamic</option>
            </select>
            {lessonCategory === 'English' && (
              <select
                style={{marginTop: 20}}
                value={selectedEnglishCategory}
                onChange={e => setSelectedEnglishCategory(e.target.value)}>
                <option value="">Select English Category</option>
                <option value="Phonics">Phonics</option>
                <option value="Vocabulary">Vocabulary</option>
                <option value="Quizzes">Quizzes</option>
                <option value="Stories">Stories</option>
              </select>
            )}
            {lessonType === 'text' &&
            lessonCategory === 'English' &&
            selectedEnglishCategory === 'Phonics' ? (
              <select
                style={{marginTop: 20}}
                value={lessonTitle}
                onChange={e => setLessonTitle(e.target.value)}>
                <option value="">Select Lesson Title</option>
                {titleOptions['Phonics'].map((title, index) => (
                  <option key={index} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            ) : (
              <input
                style={{marginTop: 20}}
                type="file"
                onChange={e => setFile(e.target.files[0])}
              />
            )}
            <input
              type="text"
              placeholder="Lesson Detail"
              value={lessonDetail}
              onChange={e => setLessonDetail(e.target.value)}
            />
            <button style={{marginTop: 20}} onClick={handleFileUpload}>
              Upload Lesson
            </button>
          </div>
          {uploadError && <p className="error-message">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
}

export default Lesson2;
