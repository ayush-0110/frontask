/**
 *
 * Clue2
 *
 */
import React, { memo, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CardMedia from '@mui/material/CardMedia';
import pic from './pic.webp';
import styled from 'styled-components/macro';

interface Props {}

export const Clue2 = memo((props: Props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isCardDisabled, setIsCardDisabled] = useState(false);
  const [userAnswer, setUserAnswer] = React.useState<string>('');
  const [startTime, setStartTime] = React.useState(Date.now());
  const answer = 'love';
  const [isTextfieldDisabled, setIsTextfieldDisabled] = useState(true);
  const { score, setScore } = useAuth();
  const {
    lastCompletedClueIndex,
    totalTimeTaken,
    setTotalTimeTaken,
    setLastCompletedClueIndex,
  } = useAuth();
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   setStartTime(Date.now());
  // }, []);
  // React.useEffect(() => {
  //   if (lastCompletedClueIndex > 2) {
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

  //   updateCompletedClueIndex();
  // }
  // }, [lastCompletedClueIndex]);
  const handleSubmit = async () => {
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000); // time in seconds
      setTotalTimeTaken(totalTimeTaken + timeTaken);
      setLastCompletedClueIndex(3);
      const updatedScore = score + 100;
      setScore(updatedScore);
      await updateCompletedClueIndex();
      navigate('/clue3');
    } else {
      navigate('/failed');
    }
  };
  const handleClick = () => {
    setIsButtonDisabled(true);
  };
  const displayTextField = () => {
    setIsTextfieldDisabled(!isTextfieldDisabled);
    setIsCardDisabled(true);
  };
  return (
    <Div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
      }}
    >
      <div
        style={{
          margin: 'auto',
          height: '58vh',
          width: '80vw',
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
                Well Done!
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
                  You have reached Level 2 now. For this level, Click on the
                  Button below, you'll get a link. Open the link. It will
                  redirect you to some page. Search the whole page and guess the
                  theme of the page.
                </Typography>
              </div>
            </CardContent>

            <div
              style={{
                marginTop: '10px',
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
                      backgroundColor: '#860d9e',
                      borderColor: '#a900ca',
                      opacity: isButtonDisabled ? 0 : 1,
                      pointerEvents: isButtonDisabled ? 'none' : 'auto',
                      cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                      transition: 'opacity 1s',
                    }}
                    size="large"
                    sx={{ '&.active': { backgroundColor: '#860d9e' } }}
                    onClick={handleClick}
                  >
                    Click Here
                  </Button>
                </CardActions>
              </div>
              <div>
                <Card
                  className="card"
                  sx={{
                    opacity: isButtonDisabled ? 1 : 0,
                    backgroundColor: 'rgba(151, 6, 6, 0.5)',
                    display: isCardDisabled ? 'none' : 'flex',
                    transition: 'opacity 3s',
                    alignItems: 'center',
                  }}
                  style={{
                    border: '2px solid white',
                    borderRadius: '15px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent
                      sx={{ flex: '1 0 auto' }}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{ fontSize: 20 }}
                      >
                        <a
                          href="https://shorturl.at/uFJQR"
                          target="_blank"
                          style={{ textDecoration: 'none', color: 'yellow' }}
                          onClick={displayTextField}
                          rel="noreferrer"
                        >
                          The Link is HERE
                        </a>
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: 1,
                        pb: 1,
                      }}
                    ></Box>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, height: 200 }}
                    image={pic}
                    alt="Live from space album cover"
                  />
                </Card>
              </div>

              <div
                style={{
                  width: '60vw',
                  marginTop: '10px',
                  display: isTextfieldDisabled ? 'none' : 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  onChange={e => {
                    setUserAnswer(e.target.value);
                  }}
                  label="What's that one word that describes this page?"
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
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                  style={{ marginTop: '15px' }}
                  size="medium"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Box>
        </Card>
      </div>
    </Div>
  );
});

const Div = styled.div``;
