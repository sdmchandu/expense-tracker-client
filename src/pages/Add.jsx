import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

export default function Add() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    category: "",
  });
  const [isLoading,setIsLoading] = useState(false);
  const handleSubmit = async() => { 
  // console.log(formData);
  setIsLoading(true);
  try {
    const res=await axios.post(`http://localhost:7000/api/expense/insert`,formData);
    // console.log(res)
    if (res.data.success) {
      toast.success(res.data.message);
      setTimeout(()=>{

        navigate("/")
      },2000);
    } else {
      toast.error(res.data.message);
    }
    } catch (error) {
    console.log(error);
  }finally{
    setTimeout(()=>{

      setIsLoading(false);
    },2000);
  }
  };
  return (
    <Box><Box sx={{ textAlign: "center" }}>
      <Typography variant="h4">Add Expense Details</Typography>
    </Box>
      <Box sx={{
        backgroundColor: "lavender",
        p: 4, display: "flex", justifyContent: "center",
        alignContent: "center"
      }}>
        <Paper sx={{ width: "70%", p: 3 }}>
          <TextField value={formData.title} fullWidth onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text"
            label="Enter expense title"
            placeholder="Expense title here"
            sx={{ mb: 2 }} />
          <TextField value={formData.amount} fullWidth onChange={(e) => setFormData({ ...formData, amount: e.target.value })} type="number"
            label="Enter expense amount"
            placeholder="Expense title here"
            sx={{ mb: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select expense Category</InputLabel>
            <Select value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Select expense Category"
              // onChange={handleChange}
              sx={{ mb: 2 }}
            >
              <MenuItem value={"Transport"}>Transport</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
          <Button  onClick={handleSubmit} sx={{ mb: 1 }} color="secondary" variant="contained" fullWidth loading={isLoading}>Submit</Button>
          <Button component={Link} to={"/"} sx={{ mb: 1 }} color="secondary" variant="outlined" fullWidth>View Entries</Button>
        </Paper>
      </Box>
    </Box>
  )
}
