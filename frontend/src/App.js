import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

function App() {
  // State management for form inputs and generated question
  const [jobRole, setJobRole] = useState('');
  const [skills, setSkills] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState('');

  // Ref for handling video stream
  const videoRef = useRef(null);

  // Function to get video and audio from user's device
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing media devices', err);
      }
    };

    getUserMedia();
  }, []);

  // Function to handle form submission and question generation
  const handleGenerateQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/generate-question', {
        job_role: jobRole,
        skills: skills,
      });
      setGeneratedQuestion(response.data.question);
    } catch (error) {
      console.error('Error generating question', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>InterviBot Interview Simulation</h1>

        {/* Video stream */}
        <video ref={videoRef} autoPlay playsInline></video>

        {/* Form for generating interview questions */}
        <form onSubmit={handleGenerateQuestion}>
          <label>
            Job Role:
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </label>
          <br />
          <label>
            Skills:
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Generate Question</button>
        </form>

        {/* Display generated question */}
        {generatedQuestion && (
          <div>
            <h2>Generated Interview Question</h2>
            <p>{generatedQuestion}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
