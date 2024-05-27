import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/joy/Table';
import { Button } from '@mui/material';
import axios from 'axios';

export default function AllClients() {
  const [Load, setLoad] = React.useState<boolean>(true);
  const [Clients, setClients] = React.useState<any>([]);
  React.useEffect(() => {
    if(Load){
      axios.post("http://localhost:5000/api/client/action=getall", {type: "getAll"}).then((res:any) => {
        setClients(res.data)
        setLoad(false)
      })
        
    }

  })
  return (
    <Box
    >
<Table sx={{ '& thead th:nth-child(1)': { width: '40%' } }}>
      <thead>
        <tr>
        <th>ID</th>
          <th>ФИО</th>
          <th>Контактная информация</th>
        </tr>
      </thead>
      <tbody>
        {Clients.map((row:any) => (
          <tr key={row.clientid}>
            <td>{row.clientid}</td>
            <td>{row.name}</td>
            <td>{row.contactinfo}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Box>
  );

}