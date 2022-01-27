import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { AppBar,Toolbar,Typography,Button, Stack, Menu, MenuItem, IconButton, Drawer, Divider, Modal, Box, Tabs, Tab } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DeleteIcon from '@mui/icons-material/Delete';
import Notifications from '@mui/icons-material/Notifications';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PropTypes from 'prop-types';
import Login from '../user/login';
import Register from '../user/register';
import { user } from '../../utils/user';
import { Retrieve_Bookmark_By_UserId } from '../../services/bookmark';
import axios from 'axios';
import { headers } from '../../utils/header';

const serverUrl = process.env.REACT_APP_SERVER_URL;
const drawerWidth = 200;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other} >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
  
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Navbar() {

  const [bookmarks, setBookmarks] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open = Boolean(anchorEl2);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(0);

  let history = useHistory();

  useEffect(() => {

    if(user.id){
      Retrieve_Bookmark_By_UserId(user.id)
      .then(result => {
        setBookmarks(result);
      })
    }

    const setResponsiveness = () => {
      return window.innerWidth < 900 ? setMobileView(true) : setMobileView(false)
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

  }, [bookmarks]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  function Logout(){
    localStorage.removeItem('token');
    history.push("/");
    window.location.reload(false);
  }

  function deletebookmark(subject){
    axios.get(serverUrl+'delete_bookmark/'+user.id+"/"+subject, {
      headers
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    pt: 4,
    pl: 4,
    pr: 4,
    '@media (min-width:900px)': {
      width: '40%',
    }
  };

  const classes = useStyles();
  const displayDesktop = () => {
    return (
      <>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }} className={classes.brand}> Codingify </Typography>
          <Stack spacing={3} direction="row">
            <Button component={Link} to="/" variant="navitem">Home</Button>
            <Button variant="navitem" onClick={handleMenu} endIcon={<KeyboardArrowDownIcon/>}>Courses</Button>
            <Button component={Link} to="/" variant="navitem">Blogs</Button>
            <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
              <MenuItem component={Link} to="/explore/all" onClick={handleClose}>Explore All</MenuItem>
              <MenuItem component={Link} to="/explore/dsa" onClick={handleClose}>DSA</MenuItem>
              <MenuItem component={Link} to="/explore/web" onClick={handleClose}>Web Dev</MenuItem>
              <MenuItem component={Link} to="/explore/mobile" onClick={handleClose}>Mobile Dev</MenuItem>
            </Menu>
            {user.email ?
              <>
                <IconButton>
                  <BookmarksIcon size="small" style={{color: 'white'}} onClick={handleClick}/>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl2}
                  open={open}
                  onClose={handleClose2}
                  MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  }}
                >
                  {bookmarks && bookmarks.map((item, index)=> {
                    return (
                      <>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <MenuItem component={Link} to={"/showarticals/"+item.subject} onClick={handleClose2}>{index+1+". "+item.subject}</MenuItem>
                          <IconButton onClick={()=>deletebookmark(item.subject)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                        <Divider/>
                      </>
                    )
                  })}
                </Menu>
                <IconButton>
                  <Notifications size="small" style={{color: 'white'}} onClick={handleClick}/>
                </IconButton>
                {user.email==="codingify.tech@gmail.com" &&
                  <Button component={Link} to="/admindashboard" variant="outlined" color="error" startIcon={<AdminPanelSettingsOutlinedIcon />}>Admin Panel</Button>
                }
                <Button component={Link} to="/dashboard" variant="outlined" color="warning" startIcon={<AccountCircleRoundedIcon />}>Dashboard</Button>
                <Button variant="contained" color="warning" startIcon={<LogoutRoundedIcon />} onClick={()=>Logout()} >Logout</Button>
              </>
              :
              <>
                <Button onClick={handleOpen1} variant="outlined" color="warning" startIcon={<LoginIcon />}>Login</Button>
                <Button onClick={handleOpen1} variant="contained" color="warning" startIcon={<PersonAddIcon />}>Register</Button>
              </>
            }
          </Stack>
        </Toolbar>
      </>
    );
  };

  const displayMobile = () => {

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    return (
      <Toolbar>
        <IconButton onClick={handleDrawerOpen} color="inherit">
          <MenuIcon color="warning" />
        </IconButton>
        <Drawer 
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#060238',
              padding: '5%',
            },
          }}
          open={drawerOpen} 
          anchor="left" 
          onClose={handleDrawerClose}
        >
          <Stack spacing={3}>
            <Button component={Link} to="/" variant="navitem" onClick={handleDrawerClose}>Home</Button>
            <Button variant="navitem" onClick={handleMenu} endIcon={<KeyboardArrowDownIcon/>}>Courses</Button>
            <Button component={Link} to="/"  onClick={handleDrawerClose} variant="navitem">Blogs</Button>
            <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
              <MenuItem component={Link} to="/explore/all" onClick={() => {handleClose(); handleDrawerClose();}}>Explore All</MenuItem>
              <MenuItem component={Link} to="/explore/dsa" onClick={() => {handleClose(); handleDrawerClose();}}>DSA</MenuItem>
              <MenuItem component={Link} to="/explore/web" onClick={() => {handleClose(); handleDrawerClose();}}>Web Dev</MenuItem>
              <MenuItem component={Link} to="/explore/mobile" onClick={() => {handleClose(); handleDrawerClose();}}>Mobile Dev</MenuItem>
            </Menu>
            {user.email ?
              <>
                <IconButton>
                  <BookmarksIcon style={{color: 'white'}} onClick={handleClick} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl2}
                  open={open}
                  onClose={handleClose2}
                  MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  }}
                >
                  {bookmarks && bookmarks.map((item, index)=> {
                    return (
                      <>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <MenuItem component={Link} to={"/showarticals/"+item.subject} onClick={handleClose2}>{index+1+". "+item.subject}</MenuItem>
                          <IconButton onClick={()=>deletebookmark(item.subject)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                        <Divider/>
                      </>
                    )
                  })}
                </Menu>
                <Button component={Link} to="/dashboard" variant="outlined" color="warning" startIcon={<AccountCircleRoundedIcon />}>Dashboard</Button>
                <Button variant="contained" color="warning" startIcon={<LogoutRoundedIcon />} onClick={()=>Logout()} >Logout</Button>
              </>
              :
              <>
                <Button onClick={() => {handleOpen1(); handleDrawerClose();}} variant="outlined" color="warning" startIcon={<LoginIcon />}>Login</Button>
                <Button onClick={() => {handleOpen1(); handleDrawerClose();}} variant="contained" color="warning" startIcon={<PersonAddIcon />}>Register</Button>
              </>
            }
          </Stack>
        </Drawer>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }} className={classes.brand}> Codingify </Typography>
      </Toolbar>
    );
  };

  return (
    <header>
      <Modal open={open1} onClose={handleClose1} >
        <Box sx={style}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>
        </Box>
      </Modal>
      <AppBar position="fixed" color="transparent" sx={{backgroundColor: '#060238'}}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}

const useStyles = makeStyles({
  brand: {
    color: '#f4511e',
    fontWeight: 'bold',
    fontStyle: 'italic',
  }
});