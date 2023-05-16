/**
 *
 * Clue1
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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
interface Props {}
export const Clue1 = memo((props: Props) => {
  const [riddle, setRiddle] = React.useState<string>('Error');
  const [answer, setAnswer] = React.useState<string>('e');
  const [userAnswer, setUserAnswer] = React.useState<string>('');
  const [attempts, setAttempts] = React.useState<number>(0);
  const [warning, setWarning] = React.useState('');
  const [displayWarning, setDisplayWarning] = React.useState(false);
  const [startTime, setStartTime] = React.useState(Date.now());
  const navigate = useNavigate();
  const { setLastCompletedClueIndex } = useAuth();
  const { lastCompletedClueIndex, totalTimeTaken, setTotalTimeTaken } =
    useAuth();
  const { score, setScore } = useAuth();
  React.useEffect(() => {
    setScore(0);
    // setStartTime(Date.now());
  }, []);
  React.useEffect(() => {
    if (lastCompletedClueIndex > 1) {
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
  const handleSubmit = async () => {
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
      // const updatedLastCompletedClueIndex = lastCompletedClueIndex + 1;
      const timeTaken = Math.floor((Date.now() - startTime) / 1000); // time in seconds
      setTotalTimeTaken(totalTimeTaken + timeTaken);
      setLastCompletedClueIndex(2);
      const updatedScore = score + 100;
      setScore(updatedScore);

      setTimeout(async () => {
        navigate('/clue2');
      }, 2000);
    } else {
      setAttempts(attempts + 1);

      if (attempts < 3) {
        const updatedScore = score - 15 * attempts;
        setScore(updatedScore);
        setWarning('Wrong answer. Try again.');
        setDisplayWarning(true);

        setTimeout(() => {
          setWarning('');
          setDisplayWarning(false);
        }, 2000);
      } else {
        setTimeout(async () => {
          setScore(0);
          navigate('/failed');
        }, 2000);
      }
    }
  };
  React.useEffect(() => {
    handleAPI();
    // console.log(answer);
  }, []);

  const handleAPI = () => {
    axios({
      // Endpoint to send files
      url: 'https://api.api-ninjas.com/v1/riddles',
      method: 'GET',
    })
      .then(res => {
        setRiddle(res.data[0].question);
        setAnswer(res.data[0].answer);
        console.log(res.data[0].answer);
      })
      .catch(err => {});
  };
  return (
    <Div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
        }}
      >
        <source src="./smoke.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        style={{
          margin: 'auto',
          height: '90vh',
          width: '60vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            height: '100%',
            width: '100%',
            border: '3px solid white',
            borderRadius: '10px',
            backgroundImage:
              'url(https://source.unsplash.com/1600x900/?nature)',
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
              height: '50%',
              display: 'flex',
              // justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <CardContent
              sx={{ textAlign: 'center' }}
              style={{
                width: '100%',
                maxHeight: '70%',
                // overflowY: 'auto',
              }}
            >
              <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ textAlign: 'center' }}
              >
                Solve the Riddle :
              </Typography>
              {displayWarning && (
                <div style={{ color: 'orange', marginBottom: '10px' }}>
                  {warning}
                </div>
              )}
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
                  {riddle}
                </Typography>
              </div>
            </CardContent>
            <div style={{ width: '90%' }}>
              <TextField
                required
                id="outlined-required"
                label="Answer"
                onChange={e => setUserAnswer(e.target.value)}
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
            <div style={{ marginTop: '10px' }}>
              <CardActions>
                <Button
                  variant="contained"
                  // color="success"
                  type="submit"
                  size="medium"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  // color="success"
                  size="medium"
                  // sx={{ marginLeft: '5px' }}
                  onClick={handleAPI}
                >
                  New Riddle
                </Button>
              </CardActions>
            </div>
          </Box>
        </Card>
      </div>
    </Div>
  );
});

const Div = styled.div``;
