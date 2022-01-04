import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Button, Stack, Grid, TextField, Alert, } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function AddCategory() {

    const [category, setCategory]=useState("");
    const [error, setError]=useState("");
    const [success, setSuccess]=useState("");

    useEffect(() => {
        const timeout=setTimeout(() => {
            setError("");
            setSuccess("");
         }, 3000);
         return () => clearTimeout(timeout);
    },[error, success]);

    function AddCategory() {
        fetch('https://thecodingifyserver.herokuapp.com/addcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: category,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            if(data.error){
                setError(data.error);
            }
            if(data.success){
                setSuccess(data.success);
            }
        })
        .catch(err=>{
            console.log(err.message);
        }); 
    }

    const classes = useStyles();
    return (
        <>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={12} sm={12} align="center" justify="center">
                    <Paper elevation={24} className={classes.regcard}>
                        <Typography variant="h6" sx={{ color: '#f4511e' }}><b><u>Add Category</u></b></Typography>
                        <br/>
                        <Stack spacing={2}>
                            <TextField label="Category Name" variant="outlined" color="warning" type="text" onChange={(e)=>setCategory(e.target.value)} />
                            <Button variant="contained" color="warning" endIcon={<ArrowUpwardIcon />} onClick={()=>AddCategory()} >Register</Button>
                        </Stack>
                        <br/>
                        {error!=="" &&
                            <Alert variant="outlined" severity="error">{error}!</Alert>
                        }
                        {success!=="" &&
                            <Alert variant="outlined" severity="success">{success}!</Alert>
                        }
                    </Paper>
                </Grid>
            </Grid>
            <br/>
            <br/>
        </>
    );
}

const useStyles = makeStyles({
    container: {
        paddingTop: '10%', 
        '@media (min-width:600px)': {
            paddingTop: '4%', 
        }
    },
    regcard: {
        marginTop: '70px',
        width: '90%',
        paddingTop: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingBottom: '5px',
        '@media (min-width:600px)': {
            width: '50%',
            paddingTop: '10px',
            paddingLeft: '50px',
            paddingRight: '50px',
            paddingBottom: '50px',
        }
    }
});