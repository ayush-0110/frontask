/**
 *
 * Login
 *
 */
import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import bg from './bg1.jpg';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/AuthContext';
interface Props {}

export const Login = memo((props: Props) => {
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedIn, isLoggedIn } = useAuth();
  const { setLastCompletedClueIndex, setScore, setUser } = useAuth();
  const [error, setError] = useState('');
  const { isAdmin } = useAuth();
  const handleLogin = async e => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    const data = await response.json();

    if (response.ok) {
      console.log('Login successful:', data);
      setIsLoggedIn(true);
      setUser(data.user);
      if (data.user.isAdmin) {
        navigate('/admin');
      } else {
        const userResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user`,
          {
            credentials: 'include',
          },
        );
        const userData = await userResponse.json();
        // console.log('User data:', userData);
        setLastCompletedClueIndex(userData.lastCompletedClueIndex);
        setScore(userData.score);

        setTimeout(() => {
          navigate(`/clue${userData.lastCompletedClueIndex}`);
        }, 3000);
      }
    } else {
      console.log('Login failed:', data);
      setError(data.message);
      setDisplayError(true);

      setTimeout(() => {
        setDisplayError(false);
        setError('');
      }, 3000);
    }
  };
  const navigateRegister = () => {
    navigate('/register');
  };
  return (
    <Div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        gutterBottom
        variant="h3"
        component="div"
        style={{
          textAlign: 'center',
          color: '#b9f7ddfb',
          position: 'fixed',
          top: '65px',
        }}
      >
        Welcome to Feelingz: A game built around emotions
      </Typography>
      <Card
        sx={{
          height: '60%',
          width: '60%',
          border: '3px solid black',

          borderRadius: '10px',
          position: 'relative',
          color: 'white',
          backgroundColor: 'rgba(101, 101, 101, 0.701)',
        }}
        style={{
          border: '1px solid white',
        }}
      >
        {isLoggedIn ? (
          <Alert severity="success">Log in Successful. Redirecting...</Alert>
        ) : (
          <></>
        )}
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          style={{ textAlign: 'center', marginTop: '15px' }}
        >
          Login
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {displayError && <div style={{ color: 'red' }}>{error}</div>}

          <form onSubmit={handleLogin}>
            <div
              style={{
                margin: '30px',
                width: '50vw',
                // border: '2px solid black',
              }}
            >
              <TextField
                required
                id="outlined-required"
                // label="Username"
                placeholder="username"
                type="email"
                value={username}
                onChange={e => setUsername(e.target.value)}
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
            <div
              style={{
                margin: '30px',
                width: '50vw',
                // border: '2px solid black',
              }}
            >
              <TextField
                required
                id="outlined-required"
                // label="Password"
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                // onChange={e => setUserAnswer(e.target.value)}
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ margin: '10px', textAlign: 'center' }}>
                <Button variant="contained" size="medium" type="submit">
                  Login
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={navigateRegister}
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </Div>
  );
});

const Div = styled.div``;
