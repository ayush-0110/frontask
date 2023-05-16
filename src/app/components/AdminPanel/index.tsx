/**
 *
 * AdminPanel
 *
 */
import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface User {
  username: string;
  lastCompletedClueIndex: number;
  score: number;
  highScore: number;
}
interface Props {}

export const AdminPanel = memo((props: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    fetchUsers();
  }, []);
  const sortUsers = users => {
    return users.sort((a, b) => {
      if (b.highScore !== a.highScore) {
        return b.highScore - a.highScore;
      } else {
        return a.bestTime - b.bestTime;
      }
    });
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/all-users`,
        {
          withCredentials: true,
        },
      );
      const sortedUsers = sortUsers(response.data);
      setUsers(sortedUsers);
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    { field: 'username', headerName: 'Username', flex: 1 },
    // { field: 'lastCompletedClueIndex', headerName: 'Last Completed Clue Index', flex: 1 },
    { field: 'score', headerName: 'Recent Score', flex: 1 },
    { field: 'highScore', headerName: 'High Score', flex: 1 },
    { field: 'lastTime', headerName: 'Last time taken(in seconds)', flex: 1 },
    { field: 'bestTime', headerName: 'Best Time Taken(in seconds)', flex: 1 },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayRows = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
          borderBottom: '2px solid grey',
        }}
      >
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          style={{ textAlign: 'center', marginTop: '10px' }}
        >
          Admin Panel
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '80vh',
          marginTop: '10px',
        }}
      >
        <div style={{ height: 600, width: '80%' }}>
          <DataGrid
            rows={displayRows.map((user, index) => ({ id: index, ...user }))}
            columns={columns}
          />
          <Stack spacing={2} justifyContent="center" marginTop={2}>
            <Pagination
              count={Math.ceil(users.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
});
