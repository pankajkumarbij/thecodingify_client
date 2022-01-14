import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Stack, Grid, TextField, InputAdornment, FormControl, InputLabel, IconButton, OutlinedInput, Alert, } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Register() {

    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [username, setUsername]=useState("");
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
                fName: firstName,
                lName: lastName,
                email: email,
                username: username,
                password: password,
                confirm_password: confirmPassword,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
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
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField style={{width: '100%'}} label="First Name" variant="outlined" color="warning" type="text" onChange={(e)=>setFirstName(e.target.value)} />
                            <TextField style={{width: '100%'}} label="Last Name" variant="outlined" color="warning" type="text" onChange={(e)=>setLastName(e.target.value)} />
                        </Stack>
                        <TextField label="Email" variant="outlined" color="warning" type="email" onChange={(e)=>setEmail(e.target.value)} />
                        <TextField label="Username" variant="outlined" color="warning" type="text" onChange={(e)=>setUsername(e.target.value)} />
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