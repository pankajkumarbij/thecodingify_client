import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { AppBar,Toolbar,Typography,Button, Stack, Grid, TextField } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

export default function Footer() {

  const classes = useStyles();

  return (
    <>
      <AppBar position="static" color="transparent" sx={{backgroundColor: '#060238'}}>
        <Toolbar>
          <Grid container spacing={5} className={classes.courses}>
            <Grid item xs={12} sm={3}>
              <div className={classes.coursecard}>
                <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }} className={classes.brand}> Glow Coding </Typography>
                <br/>
                <i><Typography className={classes.address}>2nd Floor, B-555</Typography>
                <Typography className={classes.address}>Sector-121, Piprali road, Sikar</Typography>
                <Typography className={classes.address}>Rajasthan, India - 432321</Typography></i>
                <br/>
                <Stack spacing={3}>
                  <Button variant="outlined" color="warning" href="https://www.youtube.com/channel/UClC6EkQmlW4MjbHTzG9-UuA">Video Lectures</Button>
                  <Button component={Link} to="/explore/all" variant="outlined" color="warning" sx={{width: '100%'}}>Explore Now</Button>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div className={classes.coursecard}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} className={classes.heads}><u>Company</u></Typography>
                <br/>
                <Stack spacing={1}>
                  <Link to="/"><Button startIcon={<InfoOutlinedIcon />} sx={{ color: 'white' }}>About us</Button></Link>
                  <Link to="/login"><Button startIcon={<WorkOutlineIcon />} sx={{ color: 'white' }}>Carrers</Button></Link>
                  <Link to="/login"><Button startIcon={<LanguageIcon />} sx={{ color: 'white' }}>BlogS</Button></Link>
                  <Link to="/register"><Button startIcon={<SecurityIcon />} sx={{ color: 'white' }}>Privacy Policy</Button></Link>
                  <Link to="/login"><Button startIcon={<GavelIcon />} sx={{ color: 'white' }}>Terms & Conditions</Button></Link>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div className={classes.coursecard}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} className={classes.heads}><u>Social Media</u></Typography>
                <br/>
                <Stack spacing={1}>
                  <Link to="/"><Button startIcon={<FacebookIcon />} sx={{ color: 'white' }}>Facebook</Button></Link>
                  <Link to="/"><Button startIcon={<YouTubeIcon />} sx={{ color: 'white' }}>You Tube</Button></Link>
                  <Link to="/"><Button startIcon={<LinkedInIcon />} sx={{ color: 'white' }}>Linkedin</Button></Link>
                  <Link to="/"><Button startIcon={<InstagramIcon />} sx={{ color: 'white' }}>Instagram</Button></Link>
                  <Link to="/"><Button startIcon={<TwitterIcon />} sx={{ color: 'white' }}>Twitter</Button></Link>
                </Stack>
              </div>
            </Grid>
            <Grid item xs={12} sm={3}>
              <div className={classes.coursecard}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} className={classes.heads}><u>Send a Message</u></Typography>
                <br/>
                <Stack spacing={1}>
                  <TextField label="Email" variant="outlined" color="warning" className={classes.inputs} />
                  <TextField label="Message" variant="outlined" color="warning" multiline rows={3} className={classes.inputs} />
                  <Button variant="outlined" color="warning" endIcon={<SendIcon />}>Send Message</Button>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="warning" style={{ padding: '10px' }}>
        <Typography variant="h6" align="center" justify="center"><i>Copyright © 2021. All rights reserve.</i></Typography>
      </AppBar>
    </>
  );
}

const useStyles = makeStyles({
  brand: {
    color: '#f4511e',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  heads: {
    color: '#f4511e',
  },
  coursecard: {
    width: '90%',
  },
  courses: {
    '@media (min-width:600px)': {
      padding: '30px'
    }
  },
  address: {
    color: 'white'
  },
  inputs: {
    backgroundColor: 'white',
  }
});