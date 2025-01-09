import MainCard from '@/components/card/main-card';
import { useTable } from '@refinedev/core';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

export default function UserList() {
  const { tableQuery, setCurrent, setPageSize } = useTable<any>({
    resource: 'user',
    dataProviderName: 'tonyapi',
    pagination: {
      pageSize: 5,
      current: 1,
    },
    queryOptions: {
      retry: 0,
    },
  });
  const data: any = tableQuery?.data?.data;
  const users = data?.data ?? [];

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrent(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrent(1);
  };

  return (
    <MainCard title="User List">
      <h1>Table User</h1>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.total}
        rowsPerPage={Number(data?.limit || 5)}
        page={data?.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
}
