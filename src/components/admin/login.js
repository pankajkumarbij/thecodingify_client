import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Button, Stack, Grid, TextField, InputAdornment, FormControl, InputLabel, IconButton, OutlinedInput, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import {serverUrl} from '../utils/url';

export default function Login(props) {
    
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [showPassword, setShowPassword]=useState(false);
    const [error, setError]=useState("");
    const [success, setSuccess]=useState("");

    useEffect(() => {
        const timeout=setTimeout(() => {
            setError("");
            setSuccess("");
         }, 3000);
         return () => clearTimeout(timeout);
    },[error, success]);
     
    function Login() {
        fetch(`${serverUrl}admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            if(data.error){
                setError(data.error);
            }
            if(data.message.success){
                setSuccess(data.message.success);
                localStorage.setItem('name',data.name);
                localStorage.setItem('email',data.email);
                localStorage.setItem('token',data.token);
                localStorage.setItem('userId',data.id);
                window.location.reload(false);
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
                        <AdminPanelSettingsOutlinedIcon fontSize="large" color="error" /><Typography variant="h6" sx={{ color: '#f4511e' }}><b><u>Admin Login</u></b></Typography>
                        <br/>
                        <Stack spacing={2}>
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
                            <Button variant="contained" color="warning" endIcon={<LoginIcon />} onClick={()=>Login()} >Login</Button>
                        </Stack>
                        <br/>
                        {error!=="" &&
                            <Alert variant="outlined" severity="error">{error}!</Alert>
                        }
                        {success!=="" &&
                            <>
                                <Alert variant="outlined" severity="success">{success}!</Alert>
                                <Redirect to="/" />
                            </>
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