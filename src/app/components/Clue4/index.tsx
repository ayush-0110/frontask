/**
 *
 * Clue4
 *
 */
import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import img from './img.jpg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';
interface Props {}

export const Clue4 = memo((props: Props) => {
  const [viewOrg, setViewOrg] = useState(false);
  const [text, setText] = useState('Round 4: JigSaw Puzzle');
  const { setLastCompletedClueIndex } = useAuth();
  let { lastCompletedClueIndex } = useAuth();
  const [startTime, setStartTime] = React.useState(Date.now());
  const { score, setScore, setTotalTimeTaken, totalTimeTaken } = useAuth();
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   setStartTime(Date.now());
  // }, []);
  React.useEffect(() => {
    if (lastCompletedClueIndex > 4) {
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
    setText('Congratulations! You did it. Please Wait.');
    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // time in seconds
    setTotalTimeTaken(totalTimeTaken + timeTaken);
    // const updatedLastCompletedClueIndex = lastCompletedClueIndex + 1;
    setLastCompletedClueIndex(5);
    const updatedScore = score + 100;
    setScore(updatedScore);
    setTimeout(async () => {
      navigate('/clue5');
    }, 3000);
  };
  const handleBigImage = () => {
    setViewOrg(true);
    setTimeout(() => {
      setViewOrg(false);
    }, 5000);
  };
  const set = () => {};
  return (
    <Div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(210, 210, 226, 0.259)',
        height: '100vh',
      }}
    >
      <h1 className="tag">{text}</h1>
      <div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              width: '65vw',
              backgroundColor: 'white',
              height: '65vh',
            }}
          >
            <JigsawPuzzle
              imageSrc={img}
              rows={6}
              columns={6}
              onSolved={handleSubmit}
            />
          </div>
          <div
            style={{ marginLeft: '5px', cursor: 'pointer' }}
            onClick={handleBigImage}
          >
            <VisibilityIcon />
          </div>
          {viewOrg && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                transition: '2s',
                background: 'rgba(55, 52, 52, 0.569)',
                zIndex: '5',
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={img}
                  alt=""
                  style={{ height: '85vh', width: '70vw' }}
                />
                <div
                  onClick={() => {
                    setViewOrg(false);
                  }}
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    right: '-30px',
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Div>
  );
});

const Div = styled.div``;
