import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider, Typography, Drawer, TextField, Rating, Button, Alert, } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TopicIcon from '@mui/icons-material/Topic';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Retrive_Article_By_Subject } from '../../services/article';
import { Retrieve_Feedback_By_Subject_By_userId } from '../../services/feedback';
import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const drawerWidth = 300;

const labels = {
  1: '😥  Very Dissatisfied',
  2: '😞 Dissatisfied',
  3: '🙂 Neutral',
  4: '😄 Satisfied',
  5: '😅 Very Satisfied',
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {

  const { subject } = useParams();

  const [open, setOpen] = useState(true);
  const [data, setData] = useState();
  const [content, setContent] = useState("Loading...");
  const [title, setTitle] = useState("Loading...");
  const [name, setName] = useState("Loading...");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState(0);

  useEffect(() => {

    const userId = localStorage.getItem('userId');

    if(subject){
      Retrive_Article_By_Subject(subject)
      .then(result => {
        setData(result);
        if(title==="Loading..." && result[0].title){
          setContent(result[0].content);
          setTitle(result[0].title);
          setName(result[0].name);
        }
      })
    }

    if(subject && userId){
      Retrieve_Feedback_By_Subject_By_userId()
      .then(result => {
        if(result.length!==0){
          setFeedbacks(result[0].rating);
        }
        else{
          setFeedbacks(0);
        }
      })
    }

  },[data, content, title, subject, feedbacks])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  function AddFeedback() {
    axios.post(serverUrl+'addfeedback', {
      userId: localStorage.getItem('userId'),
      rating: rating,
      feedback: feedback,
      subject: subject,
    })
    .then(data => {
      console.log(data);
    })  
    .catch(error => {
      console.log(error);
    }); 
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Box sx={{ display: 'flex' }}>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          marginTop: '65px',
          backgroundColor: '#060238',
          color: 'white',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
    <DrawerHeader>
      <Typography justifyContent='flex-start'> {subject} </Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon color="warning" />
      </IconButton>
    </DrawerHeader>
    <Divider color="error" />
    <List>
      {data ? 
        data.map((item, index) => {
          return (
            <ListItem button key={index} onClick={()=> {setContent(item.content);setTitle(item.title);setName(item.name)}}>
              <ListItemIcon>
                <TopicIcon color="warning" />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          )
        })
        :
        <LoadingButton
          color="secondary"
          loading={true}
          loadingPosition="start"
          variant="contained"
        >
        Save
        </LoadingButton>
      }
    </List>
  </Drawer>
  <Main open={open}>
    <Paper style={{paddingLeft: '5%', paddingRight: '5%', paddingTop: '2%', paddingBottom: '5%', marginTop: '50px'}} elevation={10}>
      <div style={{display: 'flex'}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }),}}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ display: 'flex', width:'100%', justifyContent: 'space-between' }}>
          <Typography variant="h4" style={{color: '#f4511e'}}><u>{title}</u></Typography>
          <Typography variant="h6" style={{color: '#060238'}}><u>Written By: {name}</u></Typography>
        </div>
      </div>
      <Typography paragraph>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Typography>
    </Paper>
    <br/>
    <Paper elevation={10} style={{padding : '2%'}}>
      <Typography variant="h5">
        <i><u>Course Feedback ({subject})</u></i>
      </Typography>
      <br/>
      {feedbacks ? 
      <Alert severity="success">Thanks for giving your valuable feedback!</Alert>   
      :
      <>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Rating
            name="hover-feedback"
            size="large"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {rating !== null && (
            <Box sx={{ ml: 2, mt: 1 }}>{labels[hover !== -1 ? hover : rating]}</Box>
          )}
        </Box>
        <br/>
        <TextField multiline minRows={3} label="Feedback" type="text" style={{width: '100%'}} onChange={(e)=>setFeedback(e.target.value)} />
        <br/>
        <br/>
        <Button variant="outlined" color="warning" style={{width:'100%'}} onClick={()=>AddFeedback()} >Submit Feedback</Button>
      </>
      } 
      </Paper>
    </Main>
    </Box>
    </div>
  );
}