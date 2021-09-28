import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { fetchData } from '../../features/order/orderAPI';

interface Column {
  id: 'order' | 'priority' | 'delivery' | 'status' | 'channel';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'order', label: 'Order', minWidth: 100 },
  { id: 'priority', label: 'Priority', minWidth: 100 },
  { id: 'delivery', label: 'Delivery', minWidth: 100 },
  { id: 'status', label: 'status', minWidth: 100, align: 'right' },
  { id: 'channel', label: 'channel', minWidth: 100, align: 'right' }
];

interface Data {
  order: string;
  priority: string;
  delivery: string;
  status: string;
  channel: string;
}

function createData(
  order: string,
  priority: string,
  delivery: string,
  status: string,
  channel: string
): Data {
  return { order, priority, delivery, status, channel };
}

const rows = [
  createData('0', 'delivery', 'PICKUP', 'Confirmed', 'IOS'),
  createData('1', 'ASAP', 'HUB', 'IN_PROCESS', 'HUB'),
  createData('2', 'ASAP', 'DELIVER', 'IN_DELIVERY', 'ANDROID'),
  createData('3', 'ASAP', 'IN_HUB', 'CANCEL', 'ANDROID'),
  createData('4', 'ASAP', 'CONFIRMED', '_', 'HUB')
];

export default function DataTable() {
  const newFunc = async () => await fetchData().then(data => console.log(data.data));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  newFunc();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.priority}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
}
