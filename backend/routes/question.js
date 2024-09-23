// routes/question.js
const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

router.post('/generate-question', (req, res) => {
  const { job_role, skills } = req.body;

  // Spawn a Python process to run the question generation script
  const python = spawn('python', ['./nlp/question_generator.py', job_role, skills]);

  python.stdout.on('data', (data) => {
    res.send({ question: data.toString() });
  });

  python.stderr.on('data', (data) => {
    res.status(500).send({ error: data.toString() });
  });
});

module.exports = router;
