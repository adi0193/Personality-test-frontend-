import React, { useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, Radio, RadioGroup, FormControlLabel, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 


function Test() {
  const navigate = useNavigate(); 

  const questions = [
    { id: 1, text: "You find it easy to introduce yourself to other people.", options: ["Agree", "Neutral", "Disagree"] },
    { id: 2, text: "You often spend time exploring unrealistic yet intriguing ideas.", options: ["Agree", "Neutral", "Disagree"] },
    { id: 3, text: "Your mind is always buzzing with unexplored ideas and plans.", options: ["Agree", "Neutral", "Disagree"] },
    { id: 4, text: "You find being the center of attention is very comfortable for you.", options: ["Agree", "Neutral", "Disagree"] },
    { id: 5, text: "You often consider how your actions might impact others.", options: ["Agree", "Neutral", "Disagree"] },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [personalityType, setPersonalityType] = useState(null);

  const handleChange = (event) => {
    const questionId = questions[currentQuestionIndex].id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: event.target.value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/submit-test', answers, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('API Response:', response.data);
      setScore(response.data.score);
      setPersonalityType(response.data.personality_type);
    } catch (error) {
      console.error('Test submission failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        minHeight: '100vh',
        paddingTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Custom Header */}
      <AppBar position="static" sx={{ backgroundColor: '#3f51b5', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Personality Test
          </Typography>
          <Button color="inherit" onClick={() => window.location.reload()}>
            Restart Test
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Card Section */}
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f0f4ff', boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
            Personality Test
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: '#1a237e', fontSize: '1.25rem', fontWeight: 'medium' }}>
              {questions[currentQuestionIndex].text}
            </Typography>
            <RadioGroup
              aria-label="options"
              name={`question-${questions[currentQuestionIndex].id}`}
              value={answers[questions[currentQuestionIndex].id] || ''}
              onChange={handleChange}
              sx={{ mt: 2 }}
            >
              {questions[currentQuestionIndex].options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio sx={{ color: '#1a237e' }} />}
                  label={option}
                  sx={{ mt: 1 }}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={3}>
            {currentQuestionIndex > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
                sx={{ backgroundColor: '#3949ab', '&:hover': { backgroundColor: '#303f9f' }, padding: '10px 20px', fontWeight: 'bold' }}
              >
                Previous
              </Button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ backgroundColor: '#3949ab', '&:hover': { backgroundColor: '#303f9f' }, padding: '10px 20px', fontWeight: 'bold' }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                sx={{ backgroundColor: '#f50057', '&:hover': { backgroundColor: '#c51162' }, padding: '10px 20px', fontWeight: 'bold' }}
              >
                Submit
              </Button>
            )}
          </Box>
          {score !== null && (
            <Box mt={4} sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                Your Score: {score}
              </Typography>
              <Typography variant="h6" sx={{ color: '#f50057', fontWeight: 'medium' }}>
                Your Personality: {personalityType}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Test;

