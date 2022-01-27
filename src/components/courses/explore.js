import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Button, Paper, TextField, MenuItem, Rating, IconButton, Avatar, Divider, ButtonGroup, Snackbar, Alert } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CategoryIcon from '@mui/icons-material/Category';
import { decoded } from '../../utils/user';
import { Retrieve_All_Categories } from '../../services/category';
import { Retrieve_All_Subjects } from '../../services/subject';
import { Retrieve_Feedback_By_Subject } from '../../services/feedback';
import { Retrieve_Bookmark_By_UserId } from '../../services/bookmark';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function Explore() {

  const { cat } = useParams();

  const [category, setCategory]=useState("All");
  const [categories, setCategories]=useState("");
  const [subjects, setSubjects]=useState("");
  const [allSubjects, setAllSubjects]=useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState("");
  const [open, setOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState();
  const [feedbacks, setFeedbacks] = useState();

  useEffect(() => {

    const userId=decoded.id;
    
    Retrieve_All_Categories()
    .then(result => {
      if(result.error){
        console.log(result.error);
      }
      else{
        setCategories(result);
      }
    })

    Retrieve_All_Subjects()
    .then(result => {
      if(result.error){
        console.log(result.error);
      }
      else{
        setAllSubjects(result);
      }
    })

    Retrieve_Feedback_By_Subject()
    .then(result => {
      if(result.error){
        console.log(result.error);
      }
      else{
        setFeedbacks(result);
      }
    })

    // if(userId){
    //   Retrieve_Bookmark_By_UserId(userId)
    //   .then(result => {
    //     if(result.error){
    //       console.log(result.error);
    //     }
    //     else{
    //       setBookmarks(result);
    //     }
    //   })
    // }

  },[categories, category, bookmarks, cat, feedbacks]);
  
  const handleClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

  };
  
  function copy(sub) {

    const el = document.createElement("input");
    el.value = "http://localhost:3000/showarticals/"+sub;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied("URL Copied, Now you can share !!");
    setOpen(true);

  }

  function addbookmark(subject){

    fetch(`${serverUrl}addbookmark`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: localStorage.getItem('userId'),
            subject: subject,
        })
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        setCopied("Bookmark added successfully !!");
        setOpen(true);
      }
      console.log(data);
    })
    .catch(err=>{
      console.log(err.message);
    }); 

  }

  function deletebookmark(subject){

    const userId=localStorage.getItem('userId');
    fetch(`${serverUrl}delete_bookmark/${userId}/${subject}`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      if(data.success){
        setCopied("Bookmark removed successfully !!");
        setOpen(true);
      }
      console.log(data);
    })
    .catch(err=>{
      console.log(err.message);
    }); 

  }

  const classes = useStyles();

  return (
    <div style={{marginTop: '100px',}}>
      <Grid container spacing={1} className={classes.courses}>
        <Grid item xs={12} sm={4} align="center" justify="center">
          <TextField select label="Choose Category" variant="outlined" color="warning" size="small" className={classes.coursecard} value={category} onChange={(e)=>setCategory(e.target.value)}>
            <MenuItem key="All" value="All">All</MenuItem>
            {categories && categories.map((option) => (
              <MenuItem key={option.category} value={option.category}>{option.category}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} align="center" justify="center">
          <TextField label="Search Subject..." variant="outlined" color="warning" size="small" className={classes.coursecard} onChange={(e)=>setSearchQuery(e.target.value)}/>
        </Grid>
        <Grid item xs={12} sm={4} align="center" justify="center">
          <Button variant="outlined" color="warning" className={classes.coursecard} startIcon={<FilterAltIcon />} >Filter</Button>
        </Grid>
      </Grid>
      <br/>
      {categories &&
        categories.map(catitem => {
          if(category==="All" || catitem.category===category)
          return(
            <>
              <Grid container spacing={1} className={classes.courses}>
                <Grid item xs={12} sm={12} align="center" justify="center">
                  <u><Typography variant="h5">{catitem.category} Courses</Typography></u>
                </Grid>
              </Grid>
              <br/>
              <Grid container spacing={5} className={classes.courses}>
                {allSubjects && allSubjects.map(item => {
                  if(item.category===catitem.category){
                    if(item.subject.toUpperCase().search(searchQuery.toUpperCase())!==-1){
                      return (
                        <Grid item xs={12} sm={3} align="center" justify="center">
                          <div className={classes.coursecard}>
                            <Paper elevation={24} className={classes.papers}>
                              <div style={{position: 'relative'}}>
                                <img src={item.image} alt="dsa" className={classes.img}/>
                                <div style={{ position: 'absolute', right: '0px', top: '0px', backgroundColor: '#060238' }}>
                                  <ButtonGroup orientation="vertical" variant="outlined">
                                    <IconButton>
                                      {bookmarks && bookmarks.find(({subject})=>subject===item.subject) ?
                                      <BookmarkIcon color="warning" onClick={()=>deletebookmark(item.subject)} />
                                      :
                                      <BookmarkBorderIcon color="warning" onClick={()=>addbookmark(item.subject)} />
                                      }
                                    </IconButton>
                                    <IconButton>
                                      <ShareIcon color="warning" onClick={ ()=>copy(item.subject) } />
                                    </IconButton>
                                  </ButtonGroup>
                                </div>
                              </div>
                              <u><Typography variant="h6" className={classes.coursestypo}>{item.subject}</Typography></u>
                              <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '12px', paddingRight: '12px' }}>
                                <div style={{ display: 'flex' }}>
                                  <CategoryIcon style={{marginTop: '11px', marginBottom: '15px'}} /> &nbsp;
                                  <Typography variant="p" style={{color: 'gray', marginTop: '13px', marginBottom: '15px'}}>{catitem.category}</Typography>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <MonetizationOnIcon style={{marginTop: '11px', marginBottom: '15px'}} /> &nbsp;
                                  <Typography variant="p" style={{color: 'gray', marginTop: '13px', marginBottom: '15px'}}>Free</Typography>
                                </div>
                              </div>
                              <Divider/>
                              <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '12px', paddingRight: '12px' }}>
                                <div style={{ display: 'flex' }}>
                                {feedbacks && feedbacks.map((fi)=>{
                                  if(fi._id===item.subject)
                                  {
                                    return (
                                      <>
                                        <Rating name="read-only" value={fi.avgrating} readOnly precision={0.5} sx={{marginTop: '15px'}} /> &nbsp;
                                        <p style={{color: 'gray', marginTop: '19px'}}>{fi.count} votes</p>
                                      </>
                                    )
                                  }
                                  return (
                                    <></>
                                  )
                                })}
                                </div>
                                <Link to={"/showarticals/"+item.subject}><Avatar sx={{ bgcolor: '#060238', marginTop: '10px', }}><ArrowRightAltIcon /></Avatar></Link>
                              </div>
                            </Paper>
                          </div>
                        </Grid>
                      ) 
                    }      
                  }
                  return(
                    <></>
                  )
                })}
              </Grid>
              <br/>
              <br/>
            </>
          )
        })
      }
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>{copied}</Alert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    paddingTop: '4%'
  },
  coursecard: {
    width: '90%',
  },
  courses: {
    '@media (min-width:600px)': {
      paddingLeft: '100px',
      paddingRight: '100px',
    }
  },
  img: {
    width: '100%',
  },
  papers: {
    backgroundColor: '#060238',
    paddingBottom: '20px',
  }
});