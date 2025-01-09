import MainCard from '@/components/card/main-card';
import Button from '@mui/material/Button/Button';
import { useCreate, useList } from '@refinedev/core';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function UserList() {
  const { data, refetch: refetchUser } = useList<any>({
    resource: 'api/user',
    dataProviderName: 'tonyapi',
    queryOptions: {
      retry: 0,
      enabled: false,
    },
  });
  const { mutate } = useCreate({
    resource: 'api/user/signup',
    dataProviderName: 'tonyapi',
    meta: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  function createUser() {
    mutate({
      values: {
        data: {
          avatar:
            'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/009d272e2b496aa0758a86a17eac5f7716a99133_full.jpg',
          firstName: 'Tony' + Date.now(),
          lastName: 'Nguyen' + Date.now(),
          email: `tony${Date.now()}@gmail.com`,
          role: 'operator',
          password: '123456',
        },
      },
      successNotification: () => {
        refetchUser();
        return {
          message: `Created Successfully.`,
          description: 'Success with no errors',
          type: 'success',
        };
      },
    });
  }
  const users = (data?.data as any)?.data ?? [];

  return (
    <MainCard title="User List">
      <Button variant="contained" color="primary" onClick={createUser}>
        Create User
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: any) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}
