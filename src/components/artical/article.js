import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { Alert, Button, Paper, Stack, TextField, MenuItem, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PublishIcon from '@mui/icons-material/Publish';
import JoditEditor from "jodit-react";
import Add from '@mui/icons-material/Add';

export default function CreateArticle(){

    const [data, setData] = useState();
    const [error, setError]=useState("");
    const [success, setSuccess]=useState("");
    const [category, setCategory]=useState("");
    const [categories, setCategories]=useState("");
    const [subject, setSubject]=useState("");
    const [subjects, setSubjects]=useState("");
    const [title, setTitle]=useState("");
    const [flag, setFlag]=useState(true);
      
    useEffect(() => {

        if(flag){
            fetch('http://localhost:5000/retrive_all_categories', {
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

        if(category){
            fetch(`http://localhost:5000/retrive_subject/${category}`, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                if(data.error){
                    setError(data.error);
                }else{
                    console.log(data);
                    setSubjects(data);
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

    },[error, success, categories, flag, category]);

    function Publish() {
        fetch('http://localhost:5000/articlepublish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                category: category,
                subject: subject,
                title: title,
                content: data,
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
    
    const editor = useRef(null)
	
	const config = {
		readonly: false
	}

    const classes = useStyles();
    return (
        <div align="center" justify="center" style={{ padding: '2%' }}>
            <br/><br/>
            <Paper className={classes.papers}>
                <Stack spacing={2}>
                    <b><i><u><Typography variant="h5">My Artiles</Typography></u></i></b> <br/>
                    <TextField label="Category" select variant="outlined" color="warning" type="text" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <Link to="/addcategory"><Button variant="outlined" color="info" startIcon={<Add />} sx={{width: '100%'}}>Add New Category</Button></Link>
                    {categories && categories.map((option) => (
                        <MenuItem key={option.category} value={option.category}>
                        {option.category}
                        </MenuItem>
                    ))}
                    </TextField>
                    {subjects &&
                        <TextField label="Subject" select variant="outlined" color="warning" type="text" value={subject} onChange={(e)=>setSubject(e.target.value)}>
                        <Link to="/addsubject"><Button variant="outlined" color="info" startIcon={<Add />} sx={{width: '100%'}}>Add New Subject</Button></Link>
                        {subjects.map((option) => (
                            <MenuItem key={option.subject} value={option.subject}>
                            {option.subject}
                            </MenuItem>
                        ))}
                        </TextField>
                    }
                    <TextField label="Title" variant="outlined" color="warning" type="text" onChange={(e)=>setTitle(e.target.value)}/>
                    <br/>
                    <div align="left" justify="left">
                        <JoditEditor
                            ref={editor}
                            value={data}
                            config={config}
                            tabIndex={1}
                            onBlur={newContent => setData(newContent)}
                            onChange={newContent => {}}
                        />
                    </div>
                    <Button variant="outlined" color="warning" endIcon={<PublishIcon/>} onClick={()=>Publish()}>Publish</Button>
                </Stack>
                <br/>
                {error!=="" &&
                    <Alert variant="outlined" severity="error">{error}!</Alert>
                }
                {success!=="" &&
                    <Alert variant="outlined" severity="success">{success}!</Alert>
                }
            </Paper>
        </div>
    );
}

const useStyles = makeStyles({
    papers: {
        width: '90%',
        padding: '2%',
        '@media (min-width:600px)': {
            width: '70%',
            padding: '2%',
        }
    }
})