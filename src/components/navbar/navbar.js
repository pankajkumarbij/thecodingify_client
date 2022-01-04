import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { AppBar,Toolbar,Typography,Button, Stack, Menu, MenuItem, IconButton, Drawer, Divider } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from "@mui/icons-material/Menu";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DeleteIcon from '@mui/icons-material/Delete';
import Notifications from '@mui/icons-material/Notifications';

const drawerWidth = 200;

export default function Navbar() {

    const [bookmarks, setBookmarks] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileView, setMobileView] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const open = Boolean(anchorEl2);

    useEffect(() => {

        if(localStorage.getItem('userId')){
            const userId=localStorage.getItem('userId');
            fetch(`https://thecodingifyserver.herokuapp.com/retrive_bookmark/${userId}`,{
                method: 'GET',
            })
            .then(res => res.json())
            .then(data => {
                setBookmarks(data);
            })
        }

        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setMobileView(true)
                : setMobileView(false)
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, [bookmarks]);

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
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
    }

    function deletebookmark(subject){
        const userId=localStorage.getItem('userId');
        fetch(`https://thecodingifyserver.herokuapp.com/delete_bookmark/${userId}/${subject}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            // if(data.error){
            //     setError(data.error);
            // }
            // if(data.success){
            //     setSuccess(data.success);
            // }
            console.log(data);
        })
        .catch(err=>{
            console.log(err.message);
        }); 
    }

    const classes = useStyles();
    const displayDesktop = () => {
        return (
            <>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }} className={classes.brand}> Codingify </Typography>
                    <Stack spacing={3} direction="row">
                        <Button component={Link} to="/" variant="navitem">Home</Button>
                        <Button variant="navitem" onClick={handleMenu} endIcon={<KeyboardArrowDownIcon/>}>Courses</Button>
                        <Button component={Link} to="/ppt" variant="navitem">Blogs</Button>
                        <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                            <MenuItem component={Link} to="/explore/all" onClick={handleClose}>Explore All</MenuItem>
                            <MenuItem component={Link} to="/explore/dsa" onClick={handleClose}>DSA</MenuItem>
                            <MenuItem component={Link} to="/explore/web" onClick={handleClose}>Web Dev</MenuItem>
                            <MenuItem component={Link} to="/explore/mobile" onClick={handleClose}>Mobile Dev</MenuItem>
                        </Menu>
                        {localStorage.getItem('email') ?
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
                                <Button component={Link} to="/dashboard" variant="outlined" color="warning" startIcon={<AccountCircleRoundedIcon />}>Dashboard</Button>
                                <Button variant="contained" color="warning" startIcon={<LogoutRoundedIcon />} onClick={()=>Logout()} >Logout</Button>
                            </>
                            :
                            <>
                                <Button component={Link} to="/login" variant="outlined" color="warning" startIcon={<LoginIcon />}>Login</Button>
                                <Button component={Link} to="/register" variant="contained" color="warning" startIcon={<PersonAddIcon />}>Register</Button>
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
                        <Link to="/"><Button variant="navitem" onClick={handleDrawerClose}>Home</Button></Link>
                        <Link to=""><Button variant="navitem" onClick={handleMenu} endIcon={<KeyboardArrowDownIcon/>}>Courses</Button></Link>
                        <Link to="/login"><Button variant="navitem" onClick={handleDrawerClose}>Blogs</Button></Link>
                        <Menu id="menu-appbar" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                            <Link to="/explore/all"><MenuItem onClick={handleClose}>Explore All</MenuItem></Link>
                            <Link to="/explore/dsa"><MenuItem onClick={handleClose}>DSA</MenuItem></Link>
                            <Link to="/explore/web"><MenuItem onClick={handleClose}>Web Dev</MenuItem></Link>
                            <Link to="/explore/mobile"><MenuItem onClick={handleClose}>Mobile Dev</MenuItem></Link>
                        </Menu>
                        {localStorage.getItem('email') ?
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
                                                <Link to={"/showarticals/"+item.subject}><MenuItem onClick={handleClose2}>{index+1+". "+item.subject}</MenuItem></Link>
                                                <Divider/>
                                            </>
                                        )
                                    })}
                                </Menu>
                                <Link to="/dashboard"><Button variant="outlined" color="warning" startIcon={<AccountCircleRoundedIcon />}>Dashboard</Button></Link>
                                <Link to=""><Button variant="contained" color="warning" startIcon={<LogoutRoundedIcon />} onClick={()=>Logout()} >Logout</Button></Link>
                            </>
                            :
                            <>
                                <Link to="/login"><Button variant="outlined" color="warning" startIcon={<LoginIcon />}>Login</Button></Link>
                                <Link to="/register"><Button variant="contained" color="warning" startIcon={<PersonAddIcon />}>Register</Button></Link>
                            </>
                        }
                    </Stack>
                </Drawer>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }} className={classes.brand}> Glow Coding </Typography>
            </Toolbar>
        );
    };

    return (
        <header>
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