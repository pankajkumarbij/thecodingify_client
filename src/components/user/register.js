import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Button, Stack, Grid, TextField, InputAdornment, FormControl, InputLabel, IconButton, OutlinedInput, Alert, } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {serverUrl} from '../utils/url';
export default function Register() {

    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const [showPassword, setShowPassword]=useState(false);
    const [showConfirmPassword, setShowConfirmPassword]=useState(false);
    const [error, setError]=useState("");
    const [success, setSuccess]=useState("");

    useEffect(() => {
        const timeout=setTimeout(() => {
            setError("");
            setSuccess("");
         }, 3000);
         return () => clearTimeout(timeout);
    },[error, success]);

    function Register() {
        fetch(`${serverUrl}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirm_password: confirmPassword,
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
                        <Typography variant="h6" sx={{ color: '#f4511e' }}><b><u>Register</u></b></Typography>
                        <br/>
                        <Stack spacing={2}>
                            <TextField label="Name" variant="outlined" color="warning" type="text" onChange={(e)=>setName(e.target.value)} />
                            <TextField label="Email" variant="outlined" color="warning" type="email" onChange={(e)=>setEmail(e.target.value)} />
                            <FormControl variant="outlined" color="warning">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>setShowPassword(!showPassword)}
                                                edge="end"
                                                >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    color="warning"
                                />
                            </FormControl>
                            <FormControl variant="outlined" color="warning">
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                                >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                    color="warning"
                                />
                            </FormControl>
                            <Button variant="contained" color="warning" endIcon={<ArrowUpwardIcon />} onClick={()=>Register()} >Register</Button>
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