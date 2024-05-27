import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';

export default function AddKam() {
  const [gemstoneType, setGemstoneType] = React.useState<string>("");
  const [Price, setPrice] = React.useState<any>("0.00");

  const onClickAddMaterial = () => {
    axios.post("http://localhost:5000/api/item/action=add/item=gemstone", {gemstonetype: gemstoneType, gemstoneprice: Price}).then((res:any) => {})
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Тип драгоценного камня" value={gemstoneType} onChange={(e) => {setGemstoneType(e.target.value)}} variant="filled" />
      <TextField id="filled-basic" label="Стоимость" value={Price} onChange={(e) => {setPrice(e.target.value)}} variant="filled" />
      <Button variant="outlined" onClick={onClickAddMaterial}>Добавить</Button>
    </Box>
  );
}