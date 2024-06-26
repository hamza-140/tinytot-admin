import React, {useState} from 'react';
import {firestore, storage} from '../../../firebase.config';
import {doc, setDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useNavigate} from 'react-router-dom';

function AnimalAdd() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bg, setBg] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSoundChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSound(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageURL = '';
      let soundURL = '';

      if (image) {
        const imageRef = ref(storage, `animals/${title}.png`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
      }

      if (sound) {
        const soundRef = ref(storage, `sounds/${title}.mp3`);
        await uploadBytes(soundRef, sound);
        soundURL = await getDownloadURL(soundRef);
      }

      const docRef = doc(firestore, 'animals', title);
      await setDoc(docRef, {title, description, bg, imageURL, soundURL});

      navigate('/english/animals');
    } catch (error) {
      console.error('Error adding animal:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6">Add New Animal</h1>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bg" className="block text-gray-700 font-bold mb-2">
              Background Color
            </label>
            <input
              type="text"
              id="bg"
              value={bg}
              onChange={e => setBg(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg"
              accept="image/*"
            />
          </div>
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Preview" className="w-full h-auto" />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="sound"
              className="block text-gray-700 font-bold mb-2">
              Sound (MP3)
            </label>
            <input
              type="file"
              id="sound"
              onChange={handleSoundChange}
              className="w-full px-3 py-2 border rounded-lg"
              accept="audio/mpeg"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Add Animal
          </button>
        </form>
      )}
    </div>
  );
}

export default AnimalAdd;
