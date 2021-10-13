import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { getOrder, selectOrder } from '../../features/order/orderSlice';
import Layout from '../../ui/Layout';
import Page from '../../ui/Page';

interface OrderProps {
  match: any
}

function SingleOrderPage(props: OrderProps) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const order = useAppSelector(selectOrder);

  useEffect(() => {
    dispatch(getOrder(id))
  }, [dispatch, id]);

  return (
    <Layout pageTitle='View Order'>
      <Container maxWidth="md" >
        {(order.id === id) && <Page order={order} />}
      </Container>
    </Layout>
  )
}

export default SingleOrderPage;