import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpensesTable from '../components/Table'
import FloatingAddButton from '../components/FloatingAddButton'
import axios from 'axios';
import { baseUrl } from '../api';

export default function View() {
  const[allExpenses,setAllExpenses]=useState([]);
  const fetchAllExpenses=async()=>{
    try {
      const res=await axios.get(`${baseUrl}/api/expense/view-all`);
      // console.log(res.data);
      if (res.data.success) {
        setAllExpenses(res.data.expenses);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(arrowFunction,dependency)
     useEffect(()=>{
      fetchAllExpenses();
     },[]);
    //  console.log(allExpenses);
  return (
    <Box>
        <Box>
        <Typography variant="h4">Expenses List</Typography>
        </Box>
        <Box sx={{p:2}}>
            <ExpensesTable allExpenses={allExpenses}fetchAllExpenses={fetchAllExpenses}/>
        </Box>
        <FloatingAddButton/>
    </Box>
  )
}
