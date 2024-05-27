import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';

export default function AddMat() {
  const [materialType, setMaterialType] = React.useState<string>("");
  const [materialPrice, setMaterialPrice] = React.useState<any>("0.00");

  const onClickAddMaterial = () => {
    axios.post("http://localhost:5000/api/item/action=add/item=material", {materialtype: materialType, price: materialPrice}).then((res:any) => {})
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
      <TextField id="outlined-basic" label="Тип материала" value={materialType} onChange={(e) => {setMaterialType(e.target.value)}} variant="filled" />
      <TextField id="filled-basic" label="Стоимость" value={materialPrice} onChange={(e) => {setMaterialPrice(e.target.value)}} variant="filled" />
      <Button variant="outlined" onClick={onClickAddMaterial}>Добавить</Button>
    </Box>
  );
}