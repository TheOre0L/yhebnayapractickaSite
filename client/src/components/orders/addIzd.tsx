import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import axios from 'axios';

export default function AddOrder() {
  const [optionsMat, setOptionMat] = React.useState<any>([]);
  const [optionsKam, setOptionKam] = React.useState<any>([]);
  const [valueMat, setValueMat] = React.useState<any>(optionsMat[0]);
  const [valueKam, setValueKam] = React.useState<any>(optionsKam[0]);
  const [Load, setLoad] = React.useState<boolean>(true);
  const [inputValueMat, setInputValueMat] = React.useState('');
  const [inputValueKam, setInputValueKam] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [price, setPrice] = React.useState<any>();
  React.useEffect(() => {
    if(Load){
      axios.post('http://localhost:5000/api/client/action=getjewelry', {type: 'jewelry'}).then((res:any) => {
        setOptionKam(res.data);
        setLoad(false);
      })
      axios.post('http://localhost:5000/api/client/action=getall', {type: 'client'}).then((res:any) => {
       setOptionMat(res.data);
        setLoad(false);
      })
    }
  })
  const onClickAddOrder = () => {
    axios.post('http://localhost:5000/api/order/type=add', {clientid: valueMat, jewelryid: valueKam, comment: comment, summa: price}).then((res:any) => {
      setOptionMat(res.data);
       setLoad(false);
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
      <Autocomplete
        value={valueMat}
        onChange={(event: any, newValue: any) => {
          setValueMat(newValue.clientid);
        }}
        inputValue={inputValueMat}
        onInputChange={(event, newInputValue) => {
          setInputValueMat(newInputValue);
        }}
        id="controllable-states-demo"
        options={optionsMat}
        getOptionLabel={(option) => option.name} // предположим, что в объекте материала есть поле name
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Клиент" />}
      />
       <Autocomplete
        value={valueKam}
        onChange={(event: any, newValue: any) => {
          setValueKam(newValue.jewelryid);
        }}
        inputValue={inputValueKam}
        onInputChange={(event, newInputValue) => {
          setInputValueKam(newInputValue);
        }}
        id="controllable-states-demo"
        options={optionsKam}
        getOptionLabel={(option) => option.type} // предположим, что в объекте драгоценного камня есть поле name
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Изделие" />}
      />
      <TextField id="outlined-basic" label="Комментарий" value={comment} onChange={(e) => {setComment(e.target.value)}} variant="filled" />
      <TextField id="filled-basic" label="Стоимость" value={price} onChange={(e) => {setPrice(e.target.value)}} variant="filled" />
      <Button variant="outlined" onClick={onClickAddOrder}>Добавить</Button>
    </Box>
  );
}