import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddOrder from './addIzd';
import ZakazKlienta from './ZakazKlienta';
import Finka from './Finka';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

const Orders = ():any => {
        const [value, setValue] = React.useState(0);
        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
          setValue(newValue);
        };
      
        return (
          <Box className = "container mt-2" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Добавить заказ" {...a11yProps(0)} />
                <Tab label="Отчет по заказам клиента" {...a11yProps(1)} />
                <Tab label="Отчет по прибыли за период" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <AddOrder/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ZakazKlienta/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Finka/>
            </CustomTabPanel>
          </Box>
        );
      
};
export default observer(Orders);