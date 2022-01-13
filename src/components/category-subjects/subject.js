import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Typography, Button, Stack, Grid, TextField, Alert, MenuItem, Backdrop, CircularProgress, } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useHistory } from 'react-router-dom';
import {serverUrl} from '../utils/url';

export default function AddSubject() {

    const history=useHistory();
    const [category, setCategory]=useState("");
    const [subject, setSubject]=useState("");
    const [image, setImage]=useState();
    const [url, setUrl]=useState("");
    const [categories, setCategories]=useState();
    const [error, setError]=useState("");
    const [success, setSuccess]=useState("");
    const [flag, setFlag]=useState(true);
    const [backdrop, setBackdrop]= useState(false);

    useEffect(() => {

        if(flag){
            fetch(`${serverUrl}retrive_all_categories`, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    setError(data.error);
                }else{
                    setCategories(data);
                    setFlag(false);
                }
            })
            .catch(err=>{
                console.log(err.message);
            }); 
        }

        if(url){
            fetch(`${serverUrl}addsubject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: category,
                    subject: subject,
                    image: url,
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                if(data.error){
                    setError(data.error);
                }
                if(data.success){
                    setUrl("");
                    setSuccess(data.success);
                    history.push('/');
                }
            })
            .catch(err=>{
                console.log(err.message);
            }); 
        }

        const timeout=setTimeout(() => {
            setError("");
            setSuccess("");
         }, 3000);
         return () => clearTimeout(timeout);

    },[error, success, categories, flag, url, category, subject, history]);

    function AddSubject() {

        if(!url){
            setBackdrop(true);
        }

        const fileData=new FormData();
        fileData.append('file', image);
        fileData.append('upload_preset','glow-coding');
        fileData.append('cloud_name','pankajkumarbijarniyacloud');

        fetch('	https://api.cloudinary.com/v1_1/pankajkumarbijarniyacloud/image/upload', {
            method:"post",
            body:fileData
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url);
        })
        .catch(err=>console.log(err));

    }

    const classes = useStyles();
    return (
        <>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={12} sm={12} align="center" justify="center">
                    <Paper elevation={24} className={classes.regcard}>
                        <Typography variant="h6" sx={{ color: '#f4511e' }}><b><u>Add Subject</u></b></Typography>
                        <br/>
                        <Stack spacing={2}>
                            <TextField label="Category" select variant="outlined" color="warning" type="text" value={category} onChange={(e)=>setCategory(e.target.value)}>
                            {categories && categories.map((option) => (
                                <MenuItem key={option._id} value={option.category}>
                                {option.category}
                                </MenuItem>
                            ))}
                            </TextField>
                            <TextField label="Subject Name" variant="outlined" color="warning" type="text" onChange={(e)=>setSubject(e.target.value)} />
                            <input type="file" className={classes.file} onChange={(e)=>setImage(e.target.files[0])} />
                            <Button variant="contained" color="warning" endIcon={<ArrowUpwardIcon />} onClick={()=>AddSubject()} >Register</Button>
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
                onClick={()=>setBackdrop(false)}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
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
    },
    file: {
        border: '1px solid orange',
        padding: '15px',
        borderRadius: '4px',
        color: 'orange',
    }
});