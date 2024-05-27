import React, {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddClient from './add';
import AllClients from './allClients';

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
  

const Client = ():any => {
        const [value, setValue] = React.useState(0);
        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
          setValue(newValue);
        };
      
        return (
          <Box className = "container mt-2" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Добавить клиента" {...a11yProps(0)} />
                <Tab label="Отчет по клиентам" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <AddClient/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <AllClients/>
            </CustomTabPanel>
          </Box>
        );
      
};
export default observer(Client);