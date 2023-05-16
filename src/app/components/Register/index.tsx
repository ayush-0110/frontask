/**
 *
 * Register
 *
 */
import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import bg from './bg1.jpg';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
interface Props {}

export const Register = memo((props: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const handleRegister = async e => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        },
      );

      if (!response.ok) {
        throw new Error(`Error registering user: ${response.statusText}`);
      }

      const data = await response.json();
      setRegister(true);
      console.log(data);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
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
      <Card
        sx={{
          height: '50%',
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
        {register ? (
          <Alert severity="success">
            Registered Successfully. Please wait...
          </Alert>
        ) : (
          <></>
        )}
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          style={{ textAlign: 'center', marginTop: '15px' }}
        >
          Register
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <form onSubmit={handleRegister}>
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
                type="email"
                placeholder="username"
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
                // label="password"
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
                  Register
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
});
// const Div = styled.div``;
// <div>
//   <h2>Register</h2>
//   <form onSubmit={handleRegister}>
//     <div>
//       <label>Username:</label>

//     </div>
//     <div>
//       <label>Password:</label>

//     </div>

//   </form>
// </div>
