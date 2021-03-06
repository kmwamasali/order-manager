import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from '../../app/hooks';
import { selectOrders, fetchOrderData, sort } from '../../features/order/orderSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface Column {
  id: 'id' | 'number' | 'type' | 'receptionType' | 'requestedDate' | 'status' | 'channel' | 'customer' | 'customerEmail' | 'products';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'number', label: 'Order', minWidth: 50 },
  { id: 'type', label: 'Priority', minWidth: 100 },
  { id: 'receptionType', label: 'Delivery', minWidth: 100 },
  { id: 'status', label: 'status', minWidth: 100 },
  { id: 'channel', label: 'channel', minWidth: 100 },
  { id: 'customer', label: 'Customer Name', minWidth: 100 },
  { id: 'customerEmail', label: 'Customer Email', minWidth: 100 },
  { id: 'products', label: 'Products', minWidth: 100 }
];

export default function DataTable() {
  const dispatch = useDispatch();
  const data = useAppSelector(selectOrders);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    dispatch(fetchOrderData());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (type: string) => {
    if (type === 'type') return dispatch(sort());
  }

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
                  onClick={() => handleClick(column.id)}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.number}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === 'customer') value = row[column.id]['customerName']
                      if (column.id === 'customerEmail') value = row['customer']['customerEmail']
                      if (column.id === 'products') value = row[column.id][0].productName
                      return (// Refactor: table cells
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'id'
                            ? <Link to={`/orders/${value}`}>{value}</Link>
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
}
