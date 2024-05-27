import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Client from '../components/client/client';
import Izdelie from '../components/izdelie/izdelie';
import Orders from '../components/orders/orders';

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
  

const Home = ():any => {
       useEffect(() => {
        document.title = 'АХАХХААХААХХАХАХАХХАХАХА';
    }, [])
    
        const [value, setValue] = React.useState(0);
      
        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
          setValue(newValue);
        };
      
        return (
          <Box className = "container mt-20" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Работа с клиентами" {...a11yProps(0)} />
                <Tab label="Работа с изделиями" {...a11yProps(1)} />
                <Tab label="Работа с заказами" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Client/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Izdelie/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Orders/>
            </CustomTabPanel>
          </Box>
        );
      
};
export default observer(Home);