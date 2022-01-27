import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PublishIcon from '@mui/icons-material/Publish';
import JoditEditor from "jodit-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Retrive_Article_By_Id } from '../../services/article';
import { user } from '../../utils/user';
import { headers } from '../../utils/header';

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
      if(data[0].userId!==user.id){
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

    axios.put(serverUrl+'update_article/'+id, {
      userId: user.id,
      name: user.fName+" "+user.lName,
      category: category,
      subject: subject,
      title: title,
      content: data,
    },{
      headers
    })
    .then(data => {
      if(data.data.error){
        setError(data.data.error);
      }
      if(data.data.success){
        setSuccess(data.data.success);
        history.push("/dashboard");
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