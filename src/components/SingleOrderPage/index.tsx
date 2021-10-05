import { Container, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { getOrder, selectOrder } from '../../features/order/orderSlice';
import Layout from '../../ui/Layout';

interface OrderProps {
  match: any
}

function SingleOrderPage(props: OrderProps) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const order = useAppSelector(selectOrder);

  useEffect(() => {
    dispatch(getOrder(id))
  }, []);

  return (
    <Layout pageTitle='Dashboard'>
      <Container maxWidth="md" >
        <Paper elevation={3} >
        {order.id}
        </Paper>
      </Container>
    </Layout>
  )
}

export default SingleOrderPage;