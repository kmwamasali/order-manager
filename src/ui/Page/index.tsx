import { Box } from "@mui/material";
import Item from "../Item";

function Page({ order }: any) {
  const productsList = order.products.map((p: any, i: number) => 
    <li key={i}>{p.productName}</li>
  )
  console.log(order)
  return (
    order && (
      <Box sx={{ 
        p: 1,
        display: 'flex',
        flexDirection: 'row' 
      }}>
        <Box minHeight={200} bgcolor={'#F4F7FA'} borderRadius={8}
         sx={{ flexGrow: 1 }}
        />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Item>ID: {order.id}</Item>
            <Item>No: {order.number}</Item>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Item>Priority: {order.type}</Item>
            <Item>Delivery: {order.receptionType}</Item>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Item>Status: {order.status}</Item>
            <Item>Channel: {order.channel}</Item>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Item>Customer Name: {order['customer']['customerName']}</Item>
            <Item>Email: {order['customer']['customerEmail']}</Item>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Item>Products: <ul>{productsList}</ul></Item>
          </Box>
        </Box>
      </Box>
    )
  );
}

export default Page;