import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Table from '@mui/joy/Table';

export default function ZakazKlienta() {
  const [Load, setLoad] = React.useState<boolean>(true);
  const [Clients, setClients] = React.useState<any>([]);
  const [ClientId, setClientId] = React.useState<any>();
  const onClickOrderClient = () => {
      axios.post("http://localhost:5000/api/order/type=client", {id: ClientId}).then((res:any) => {
        setClients(res.data)
        setLoad(false)
      })
  }

  return (
    <>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="ID клиента" value={ClientId} onChange={(e) => setClientId(e.target.value)} variant="filled" />
      <Button variant="outlined" onClick={onClickOrderClient}>Сформировать</Button>
      
    </Box>
    <Table sx={{ '& thead th:nth-child(1)': { width: '40%' } }}>
      <thead>
        <tr>
        <th>ID заказа</th>
          <th>ID клиента</th>
          <th>ID изделия</th>
          <th>Сумма заказа</th>
          <th>Дата заказа</th>
        </tr>
      </thead>
      <tbody>
        {Clients.map((row:any) => (
          <tr key={row.orderid}>
            <td>{row.orderid}</td>
            <td>{row.clientid}</td>
            <td>{row.jewelryid}</td>
            <td>{row.summa}</td>
            <td>{row.orderdate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
}