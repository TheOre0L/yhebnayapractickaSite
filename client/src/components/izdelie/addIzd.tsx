import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import axios from 'axios';
import { set } from 'mobx';

export default function AddIzd() {
  const [optionsMat, setOptionMat] = React.useState<any>([]);
  const [optionsKam, setOptionKam] = React.useState<any>([]);
  const [valueMat, setValueMat] = React.useState<any>(optionsMat[0]);
  const [valueKam, setValueKam] = React.useState<any>(optionsKam[0]);
  const [Load, setLoad] = React.useState<boolean>(true);
  const [inputValueMat, setInputValueMat] = React.useState('');
  const [inputValueKam, setInputValueKam] = React.useState('');
  const [type, setType] = React.useState('');
  const [weight, setWeight] = React.useState<any>();
  React.useEffect(() => {
    if(Load){
      axios.post('http://localhost:5000/api/jewelry/action=get', {type: 'material'}).then((res:any) => {
        setOptionMat(res.data);
        setLoad(false);
      })
      axios.post('http://localhost:5000/api/jewelry/action=get', {type: 'gemstone'}).then((res:any) => {
        setOptionKam(res.data);
        setLoad(false);
      })
    }
  })

  const onClickAddIzdelie = () => {
    axios.post('http://localhost:5000/api/item/action=add/item=jewelry', {type: type, weight: weight, materialid: valueMat, gemstoneid: valueKam}).then((res:any) => {})
  }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
    >
     <Autocomplete
  value={valueMat}
  onChange={(event: any, newValue: any) => {
    setValueMat(newValue.materialid);
  }}
  inputValue={inputValueMat}
  onInputChange={(event, newInputValue) => {
    setInputValueMat(newInputValue);
  }}
  id="controllable-states-demo"
  options={optionsMat}
  getOptionLabel={(option) => option.materialtype} // предположим, что в объекте материала есть поле name
  sx={{ width: 300 }}
  renderInput={(params) => <TextField variant="filled" {...params} label="Материал" />}
/>

<Autocomplete
  value={valueKam}
  onChange={(event: any, newValue: any) => {
    setValueKam(newValue.gemstoneid);
  }}
  inputValue={inputValueKam}
  onInputChange={(event, newInputValue) => {
    setInputValueKam(newInputValue);
  }}
  id="controllable-states-demo"
  options={optionsKam}
  getOptionLabel={(option) => option.gemstonetype} // предположим, что в объекте драгоценного камня есть поле name
  sx={{ width: 300 }}
  renderInput={(params) => <TextField variant="filled" {...params} label="Драгоценный камень" />}
/>

      <TextField id="outlined-basic" label="Вес" value={weight} onChange={(e) => {setWeight(e.target.value)}} variant="filled" />
      <TextField id="filled-basic" label="Тип" value={type} onChange={(e) => {setType(e.target.value)}} variant="filled" />
      <Button variant="outlined" onClick={() => {onClickAddIzdelie()}}>Добавить</Button>
    </Box>
  );
}