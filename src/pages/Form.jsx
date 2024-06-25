import React, {useEffect, useState} from 'react';
import emailjs from '@emailjs/browser';
import {useNavigate, useParams} from 'react-router-dom';
import {ToastContainer, toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = ({parentEmail, parentName}) => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('Tinytot');
  const [email, setEmail] = useState('sahamzashah19@gmail.com'); // Ensure a valid email format
  const [toName, setToName] = useState(parentName);
  const [toEmail, setToEmail] = useState(parentEmail);
  const {user_id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Toast notification for successful email send
  const notify = () =>
    toast.success(`Email has been sent successfully to ${toEmail}!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('yfld4bvQ6g_FFthB1');
  }, [parentEmail]);

  const handleChange = event => {
    const {name, value} = event.target;
    if (name === 'feedback') setFeedback(value);
    if (name === 'toName') setToName(value);
    if (name === 'toEmail') setToEmail(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    const templateId = 'template_0fjtc0u';
    const serviceId = 'service_gv9h5yc';

    if (!toEmail) {
      toast.error("The recipient's email address is empty", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      setLoading(false);
      return;
    }

    sendFeedback(serviceId, templateId, {
      message: feedback,
      from_name: name,
      reply_to: email,
      to_name: toName,
      email_to: toEmail,
    });
  };

  const sendFeedback = (serviceId, templateId, variables) => {
    emailjs
      .send(serviceId, templateId, variables)
      .then(res => {
        notify();
        console.log('Email successfully sent!');
      })
      .catch(err => {
        console.error('Failed to send email:', err);
        toast.error('Failed to send email. Please try again later.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request completes
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Send Feedback
        </h1>
        <div className="mb-4">
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-150"
            name="feedback"
            onChange={handleChange}
            placeholder="Enter your feedback"
            value={feedback}
            rows={5}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-150"
            name="toName"
            onChange={handleChange}
            placeholder="Recipient's Name"
            value={toName}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition ease-in-out duration-150"
            name="toEmail"
            onChange={handleChange}
            placeholder="Recipient's Email"
            value={toEmail}
            required
          />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <button
          type="submit"
          disabled={loading} // Disable the button while loading
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition ease-in-out duration-150 transform ${
            loading ? '' : 'hover:scale-105'
          }`}>
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 text-white animate-spin mr-2"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Sending...
            </div>
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loginForm: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
  },
  formField: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '16px',
    color: '#555555',
  },
  formInput: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #cccccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  formButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  formButtonHover: {
    backgroundColor: '#0056b3',
  },
  loadingButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingSpinner: {
    marginRight: '8px',
  },
};
