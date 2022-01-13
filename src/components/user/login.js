import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Stack, Grid, TextField, InputAdornment, FormControl, InputLabel, IconButton, OutlinedInput, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import { serverUrl } from '../utils/url';
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
        fetch(`${serverUrl}login`, {
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
                    {error!=="" &&
                        <>
                            <br/>
                            <Alert variant="outlined" severity="error">{error}!</Alert>
                        </>
                    }
                    {success!=="" &&
                        <>
                            <br/>
                            <Alert variant="outlined" severity="success">{success}!</Alert>
                        </>
                    }
                </Grid>
            </Grid>
            <br/>
            <br/>
        </>
    );
}

const useStyles = makeStyles({
    container: {
        paddingTop: '30px', 
    },
});