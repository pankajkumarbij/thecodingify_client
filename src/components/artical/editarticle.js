import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PublishIcon from '@mui/icons-material/Publish';
import JoditEditor from "jodit-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Retrive_Article_By_Id } from '../../services/article';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function CreateArticle(){

  const { id } = useParams();

  const [data, setData] = useState();
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");
  const [category, setCategory]=useState("");
  const [subject, setSubject]=useState("");
  const [title, setTitle]=useState("");
  
  let history = useHistory();

  useEffect(() => {

    Retrive_Article_By_Id(id)
    .then(data => {
      if(data[0].userId!==localStorage.getItem('userId')){
        history.push("/");
      }
      setCategory(data[0].category);
      setSubject(data[0].subject);
      setTitle(data[0].title);
      setData(data[0].content);
    })

    const timeout=setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
    return () => clearTimeout(timeout);

  },[error, success, category, id, history]);

  function Publish() {

    axios.post(serverUrl+'update_article/'+id, {
      userId: localStorage.getItem('userId'),
      name: localStorage.getItem('name'),
      category: category,
      subject: subject,
      title: title,
      content: data,
    })
    .then(data => {
      if(data.error){
        setError(data.error);
      }
      if(data.success){
        setSuccess(data.success);
        // history.push("/dashboard");
      }
    })
    .catch(error => {
      console.log(error);
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
          <TextField label="Category" variant="outlined" color="warning" type="text" value={category}> </TextField>
          <TextField label="Subject" variant="outlined" color="warning" type="text" value={subject}> </TextField>
          <TextField label="Title" variant="outlined" color="warning" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
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
          <Button variant="outlined" color="warning" endIcon={<PublishIcon/>} onClick={()=>Publish()}>Update</Button>
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