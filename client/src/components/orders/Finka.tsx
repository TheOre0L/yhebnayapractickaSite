import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/joy/Typography';
import axios from 'axios';

export default function Finka() {
  const [start, setStart] = React.useState<any>();
  const [end, setEnd] = React.useState<any>();
  const [finka, setFinka] = React.useState<any>([{"reportprofitforperiod": "0.00"}]);
  const onClickOrderClient = () => {
      axios.post("http://localhost:5000/api/order/type=finans", {start: start, end: end}).then((res:any) => {
        setFinka(res.data)
        console.log(res.data)
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
       <Typography level="h1">Заработок за указаный период составил: {finka[0].reportprofitforperiod}</Typography>
      <TextField id="outlined-basic" label="Начало"
      value={start} onChange={(e) => setStart(e.target.value)} placeholder='20-02-2024'  variant="filled" />
      <TextField id="filled-basic" label="Конец"
      value={end} onChange={(e) => setEnd(e.target.value)} placeholder='20-03-2024' variant="filled" />
      <Button variant="outlined" onClick={onClickOrderClient}>Сформировать</Button>
    </Box>
  );
}