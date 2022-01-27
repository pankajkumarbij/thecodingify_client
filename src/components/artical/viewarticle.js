import { useState, useEffect } from 'react';
import { Paper, Typography, } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Retrive_Article_By_Id } from '../../services/article'
;
export default function PersistentDrawerLeft(props) {

  const { id } = useParams();

  const [content, setContent] = useState("Loading...");
  const [title, setTitle] = useState("Loading...");

  useEffect(() => {

    Retrive_Article_By_Id()
    .then(result => {
      setContent(result[0].content);
      setTitle(result[0].title);
    })

  },[id, content, title,])

  return (
    <div align="center">
      <Paper align="left" style={{paddingLeft: '5%', paddingRight: '5%', paddingTop: '2%', paddingBottom: '5%', marginTop: '100px', width: '80%'}} elevation={10}>
        <Typography variant="h4" style={{color: '#f4511e'}}><u>{title}</u></Typography>
        <Typography paragraph>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Typography>
      </Paper>
      <br />
    </div>
  );
}