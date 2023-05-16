/**
 *
 * Failed
 *
 */
import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useAuth } from 'app/contexts/AuthContext';

interface Props {}

export const Failed = memo((props: Props) => {
  const { score, setScore } = useAuth();
  // const [finalScore, setFinalScore] = useState(0);
  const { setTotalTimeTaken } = useAuth();
  const resetUserProgress = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/reset`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (response.ok) {
        console.log('User progress reset successfully.');
      } else {
        console.log('Error resetting user progress.');
      }
    } catch (error) {
      console.log('Error resetting user progress:', error);
    }
  }, []);

  React.useEffect(() => {
    setTotalTimeTaken(0);
    resetUserProgress();
    return () => {
      setScore(0);
    };
  }, [setScore, resetUserProgress]);
  return (
    <Div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div>
        <video
          autoPlay
          controls
          loop
          // muted
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
          }}
        >
          <source src="./rick.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        style={{
          margin: 'auto',
          height: '40vh',
          width: '20vw',
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
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ textAlign: 'center' }}
          >
            Your Score:
          </Typography>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ textAlign: 'center' }}
          >
            {score}
          </Typography>
        </Card>
      </div>
    </Div>
  );
});

const Div = styled.div``;
