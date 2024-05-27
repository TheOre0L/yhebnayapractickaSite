import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';

export default function AddClient() {
    const [Name, setName] = React.useState<any>();
    const [Contact, setContact] = React.useState<any>();
    const [Clients, setClients] = React.useState<any>([]);
    const onClickAddClient = () => {
        axios.post("http://localhost:5000/api/client/action=addclient", {name: Name, contact: Contact, type: "addClient"}).then((res:any) => {
          setClients(res.data)
        })
    }
  
    return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="ФИО"
      value={Name} onChange={(e) => setName(e.target.value)}  variant="filled" />
      <TextField id="filled-basic" label="Контактная информация"
      value={Contact} onChange={(e) => setContact(e.target.value)} variant="filled" />
      <Button variant="outlined" onClick={onClickAddClient}>Добавить</Button>
    </Box>
  );
}