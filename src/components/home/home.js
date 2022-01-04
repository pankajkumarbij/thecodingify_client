import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button, Stack, IconButton, Paper } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Home() {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={12} sm={6} align="center" justify="center">
                    <div className={classes.headline}>
                        <Typography variant="h2" align="left" className={classes.heading} sx={{ color: '#ED6C02' }}>Learn Coding for</Typography>
                        <Typography variant="h2" align="left" className={classes.heading}>Your Future</Typography>
                        <Typography variant="h2" align="left" className={classes.heading} sx={{ color: '#00c853' }}>from Codingify</Typography>
                        <br/>
                        <Typography variant="h6" align="left" className={classes.subheading}>Learn all the computer science related subjects and technologies for your Placement and Higher studies for free.</Typography>
                        <br/>
                        <Stack direction="row" spacing={2}>
                            <Paper variant="outlined"><IconButton color="primary"><FacebookIcon /></IconButton></Paper>
                            <Paper variant="outlined"><IconButton color="error"><YouTubeIcon /></IconButton></Paper>
                            <Paper variant="outlined"><IconButton color="info"><LinkedInIcon /></IconButton></Paper>
                            <Paper variant="outlined"><IconButton color="error"><InstagramIcon /></IconButton></Paper>
                            <Paper variant="outlined"><IconButton color="primary"><TwitterIcon /></IconButton></Paper>
                        </Stack>
                        <br/><br/>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" color="warning" href="https://www.youtube.com/channel/UCeP_br3EsyThN5J2xvpg9WA">Video Lectures</Button>
                            <Button component={Link} to="/explore/all" variant="contained" color="warning">Explore Now</Button>
                        </Stack>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} align="center" justify="center">
                    <img src='images/home.png' alt="home" className={classes.img}/>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <u><Typography variant="h4" align="center" justify="center">We Provide Many Computer Science Courses</Typography></u>
            <br/>
            <br/>
            <Grid container spacing={5} className={classes.courses}>
                <Grid item xs={12} sm={3} align="center" justify="center">
                    <div className={classes.coursecard}>
                        <Paper elevation={24} style={{ backgroundColor: '#7b1fa2', padding: '5%', height: '16rem' }}>
                            <img src="images/dsa.png" alt="dsa" width="100"/>
                            <br/>
                            <Typography variant="h6" className={classes.coursestypo}>Data Structures & Algorithms</Typography>
                            <br/>
                           <Button component={Link} to="/explore/DSA" variant="outlined" color="warning" endIcon={<ArrowRightAltIcon />} sx={{ color: 'white', border: '1px solid white'}}>Explore Courses</Button>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12} sm={3} align="center" justify="center">
                    <div className={classes.coursecard}>
                        <Paper elevation={24} style={{ backgroundColor: '#f57c00', padding: '5%', height: '16rem' }}>
                            <img src="images/web.png" alt="web" width="135"/>
                            <br/>
                            <Typography variant="h6" className={classes.coursestypo}>Web Development (Frontend & Backend)</Typography>
                            <br/>
                            <Button component={Link} to="/explore/web dev" variant="outlined" color="warning" endIcon={<ArrowRightAltIcon />} sx={{ color: 'white', border: '1px solid white'}}>Explore Courses</Button>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12} sm={3} align="center" justify="center">
                    <div className={classes.coursecard}>
                        <Paper elevation={24} style={{ backgroundColor: '#c2185b', padding: '5%', height: '16rem' }}>
                            <img src="images/mobile.png" alt="mobile" width="115"/>
                            <br/>
                            <Typography variant="h6" className={classes.coursestypo}>Mobile App Development (Android & IOS)</Typography>
                            <br/>
                            <Button component={Link} to="/explore/mobile app" variant="outlined" color="warning" endIcon={<ArrowRightAltIcon />} sx={{ color: 'white', border: '1px solid white'}}>Explore Courses</Button>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12} sm={3} align="center" justify="center">
                    <div className={classes.coursecard}>
                        <Paper elevation={24} style={{ backgroundColor: '#00796b', padding: '5%', height: '16rem'}}>
                            <img src="images/ml.png" alt="ml" width="100"/>
                            <br/>
                            <Typography variant="h6" className={classes.coursestypo}>Data Science & Machine Learning</Typography> 
                            <br/>
                            <Button component={Link} to="/explore/ml" variant="outlined" color="warning" endIcon={<ArrowRightAltIcon />} sx={{ color: 'white', border: '1px solid white'}}>Explore Courses</Button>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
            <br/>
            <br/>
        </>
    );
}

const useStyles = makeStyles({
    container: {
        paddingTop: '4%'
    },
    img: {
        marginTop: '70px',
        width: '90%',
        '@media (min-width:600px)': {
            width: '80%',
        },
    },
    headline: {
        marginTop: '70px',
        paddingTop: '2%',
        width: '90%',
        '@media (min-width:600px)': {
            paddingTop: '5%',
            width: '70%',
        },
    },
    heading: {
        fontWeight: 900,
    },
    subheading: {
        color: '#616161',
        // color: 'yellow'  // for dark theme
    },
    coursecard: {
        width: '90%',
    },
    coursestypo: {
        color: 'white',
        fontSize: '15rem',
    },
    courses: {
        '@media (min-width:600px)': {
            paddingLeft: '100px',
            paddingRight: '100px',
        }
    }
});