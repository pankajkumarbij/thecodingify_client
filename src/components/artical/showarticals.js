import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Box, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider, Typography, Drawer, TextField, Rating, Button, Alert, } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TopicIcon from '@mui/icons-material/Topic';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

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
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(-1);
    const [feedback, setFeedback] = useState("");
    const [feedbacks, setFeedbacks] = useState(0);
    // const [numPages, setNumPages] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);

    // function onDocumentLoadSuccess({ numPages }) {
    //     setNumPages(numPages);
    // }

    useEffect(() => {

        const userId = localStorage.getItem('userId');

        fetch(`https://thecodingifyserver.herokuapp.com/retrive_article_by_subject/${subject}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            setData(data);
            if(title==="Loading..." && data[0].title){
                setContent(data[0].content)
                setTitle(data[0].title)
            }
        })
        .catch(err => {
            console.log(err);
        })

        fetch(`https://thecodingifyserver.herokuapp.com/retrive_feedback/${userId}/${subject}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if(data.length!==0){
                setFeedbacks(data[0].rating);
            }
            else{
                setFeedbacks(0);
            }
        })
        .catch(err => {
            console.log(err);
        })

    },[data, content, title, subject, feedbacks])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    function AddFeedback() {

        fetch('https://thecodingifyserver.herokuapp.com/addfeedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                rating: rating,
                feedback: feedback,
                subject: subject,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err=>console.log(err));
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
                    data.map((item, index) => (
                        <ListItem button key={index} onClick={()=> {setContent(item.content);setTitle(item.title);}}>
                            <ListItemIcon>
                                <TopicIcon color="warning" />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))
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
                    <u><h2>{title}</h2></u>
                </div>
                {/* <div style={{marginTop:'30px', marginBottom: '10px'}} align="center" justify="center">
                    <Document file="../course/p.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} width='1000'/>
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                    {pageNumber>1 && 
                        <Button variant="outlined" color="warning" onClick={()=>setPageNumber(pageNumber-1)}>Prev</Button>
                    }
                    {pageNumber<numPages && 
                        <Button variant="outlined" color="warning" onClick={()=>setPageNumber(pageNumber+1)}>Next</Button>
                    }
                </div> */}
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