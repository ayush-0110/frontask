/**
 *
 * Clue5
 *
 */
import React, { memo } from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../contexts/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import bg from './bg.jpg';
interface Props {}

export const Clue5 = memo((props: Props) => {
  const [question, setQuestion] = React.useState<string>('Error');
  const { setLastCompletedClueIndex } = useAuth();
  let { lastCompletedClueIndex } = useAuth();
  const [answer, setAnswer] = React.useState<string>('error');
  const [userAnswer, setUserAnswer] = React.useState<string>('');
  const [startTime, setStartTime] = React.useState(Date.now());
  const navigate = useNavigate();
  const {
    score,
    setScore,
    setTotalTimeTaken,
    totalTimeTaken,
    bestTime,
    setBestTime,
  } = useAuth();
  // React.useEffect(() => {
  //   setStartTime(Date.now());
  // }, []);
  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
      window.alert('Congratulations! You have won!');
      const timeTaken = Math.floor((Date.now() - startTime) / 1000); // time in seconds
      setTotalTimeTaken(totalTimeTaken + timeTaken);

      if (totalTimeTaken < bestTime) {
        setBestTime(totalTimeTaken);
      }
      const updatedLastCompletedClueIndex = lastCompletedClueIndex + 1;
      setLastCompletedClueIndex(updatedLastCompletedClueIndex);
      const updatedScore = score + 100;
      setScore(0);
      const updateCompletedClueIndex = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/complete-clue`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                lastCompletedClueIndex: 1,
                score: updatedScore,
                lastTime: totalTimeTaken,
                bestTime: bestTime,
                // highscore: updatedScore,
              }),
              credentials: 'include',
            },
          );
          const data = await response.json();
          console.log(data);
          console.log(updatedLastCompletedClueIndex);
        } catch (error) {
          console.error(error);
        }
      };
      updateCompletedClueIndex();
      navigate('/login');
    } else {
      navigate('/failed');
    }
  };
  const handleAPI = () => {
    axios({
      // Endpoint to send files
      // url: 'https://opentdb.com/api.php?amount=1&difficulty=medium&type=boolean',
      url: 'https://api.api-ninjas.com/v1/trivia?category=general',
      method: 'GET',
      headers: { 'X-Api-Key': ' Kt0axGt/zZsJMq0fmEeuSA==elnvOx5qhVGcOHMf' },
    })
      .then(res => {
        // console.log(res);
        setQuestion(res.data[0].question);
        setAnswer(res.data[0].answer);
        console.log(res.data[0].answer);
      })
      .catch(err => {});
  };
  React.useEffect(() => {
    handleAPI();
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          height: '50%',
          width: '50%',
          border: '3px solid white',
          borderRadius: '10px',
          position: 'relative',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            transform: 'translateY(-50%)',
            height: '50%',
            display: 'flex',
            // justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardContent
            sx={{ textAlign: 'center' }}
            style={{
              width: '100%',
              maxHeight: '70%',
            }}
          >
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ textAlign: 'center' }}
            >
              Final Showdown: Random Trivia
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxHeight: '70%',
                overflowY: 'auto',
              }}
            >
              <Typography variant="body1" sx={{ fontSize: 20 }}>
                {question}
              </Typography>
            </div>
          </CardContent>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '30vw',
            }}
          >
            <div style={{ width: '100%' }}>
              <TextField
                required
                id="outlined-required"
                onChange={e => {
                  setUserAnswer(e.target.value);
                }}
                label="Answer"
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& label.Mui-focused': {
                    color: 'white',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:hover:before': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  width: '100%',
                }}
                defaultValue=""
              />
            </div>
            <CardActions>
              <Button
                variant="contained"
                sx={{ marginTop: '10px' }}
                size="medium"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardActions>
          </div>
        </Box>
      </Card>
    </div>
  );
});
