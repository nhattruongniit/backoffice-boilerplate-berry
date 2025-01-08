import { useList } from '@refinedev/core';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// components
import MainCard from '@/components/card/main-card';
import { Button } from '@mui/material';

function Portfolio() {
  const { data, isLoading, isError, refetch } = useList({
    resource: '/todos',
    queryOptions: {
      enabled: false,
    },
    pagination: {
      pageSize: 5,
      current: 1,
    },
    successNotification: () => {
      return {
        message: `Successfully fetched.`,
        description: 'Success with no errors',
        type: 'success',
      };
    },
  });
  const todos = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  function loadData() {
    refetch();
  }

  return (
    <>
      <MainCard>
        <Button variant="contained" onClick={loadData}>
          Load
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.completed ? 'Completed' : 'Not Completed'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </>
  );
}

export default Portfolio;
