/**
 *
 * Clue3
 *
 */
import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import cinema from './movie3.gif';

interface Props {}

export const Clue3 = memo((props: Props) => {
  const [isTextfieldDisabled, setIsTextfieldDisabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [startTime, setStartTime] = React.useState(Date.now());
  const { score, setScore } = useAuth();
  const [userAnswer, setUserAnswer] = React.useState<string>('');
  const { setLastCompletedClueIndex, setTotalTimeTaken, totalTimeTaken } =
    useAuth();
  let { lastCompletedClueIndex } = useAuth();
  const answer = 'neurosis';
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   setStartTime(Date.now());
  // }, []);
  React.useEffect(() => {
    if (lastCompletedClueIndex > 3) {
      // Ensures the effect runs only after the second clue is completed
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
                lastCompletedClueIndex: lastCompletedClueIndex,
                score: score,
              }),
              credentials: 'include',
            },
          );
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };

      updateCompletedClueIndex();
    }
  }, [lastCompletedClueIndex]);
  const handleSubmit = () => {
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
      // const updatedLastCompletedClueIndex = lastCompletedClueIndex + 1;
      const timeTaken = Math.floor((Date.now() - startTime) / 1000); // time in seconds
      setTotalTimeTaken(totalTimeTaken + timeTaken);
      setLastCompletedClueIndex(4);
      const updatedScore = score + 100;
      setScore(updatedScore);
      setTimeout(async () => {
        navigate('/clue4');
      }, 2000);
    } else {
      navigate('/failed');
    }
  };
  const handleClick = () => {
    setIsTextfieldDisabled(false);
    setIsButtonDisabled(true);
  };
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${cinema})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundPosition: 'center',
      }}
    >
      <Card
        sx={{
          height: '45%',
          width: '60%',
          border: '3px solid white',
          borderRadius: '10px',
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'relative',
          color: 'white',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            transform: 'translateY(-50%)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <CardContent
            sx={{ textAlign: 'center' }}
            style={{
              width: '100%',
            }}
          >
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              sx={{ textAlign: 'center' }}
            >
              Turning the Tables
            </Typography>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography variant="body1" sx={{ fontSize: 20 }}>
                Woah! You made this Far!! Commendable. Now, time to raise the
                bar. Click the button below, watch the clip and answer the
                question
              </Typography>
            </div>
          </CardContent>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <CardActions>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#1b6207',
                    borderColor: '#f7f7f7',
                    display: isButtonDisabled ? 'none' : 'flex',
                  }}
                  size="large"
                  sx={{ '&.active': { backgroundColor: '#53ae03' } }}
                  onClick={handleClick}
                >
                  <a
                    href="https://youtu.be/Ig4iLd__-XM"
                    target="_blank"
                    style={{ textDecoration: 'none', color: 'white' }}
                    rel="noreferrer"
                  >
                    Click Here
                  </a>
                </Button>
              </CardActions>
            </div>

            <div
              style={{
                width: '30vw',
                marginTop: '10px',
                display: isTextfieldDisabled ? 'none' : 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: 25,
                  textAlign: 'center',
                  width: '50vw',
                  marginBottom: '20px',
                  // color: 'yellow',
                }}
              >
                Type of Mental Illness where the patient is aware of the
                problems and seeks remedy:
              </Typography>
              <TextField
                required
                id="outlined-required"
                label="Answer"
                onChange={e => {
                  setUserAnswer(e.target.value);
                }}
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
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                  },
                  width: '100%',
                }}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
                defaultValue=""
              />
              <div>
                <Button
                  variant="contained"
                  // color="success"
                  style={{ marginTop: '15px' }}
                  onClick={handleSubmit}
                  size="medium"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Card>
    </div>
  );
});

const Div = styled.div``;
