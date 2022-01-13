import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, ButtonGroup, Grid, Button, Snackbar, Alert, Tab, AppBar,Tabs } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import {serverUrl} from '../utils/url';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Dashboard() {

    const theme = useTheme();

    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [value, setValue] = useState(0);

    const userId=localStorage.getItem('userId');

    useEffect(()=>{
        if(localStorage.getItem('userId')) {
            fetch(`${serverUrl}retrive_article_by_userId/${userId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(result => {
                setData(result);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [data, userId]);

    function DeleteArticle(id){
        fetch(`${serverUrl}delete_article/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setMessage(result.success);
            setOpen(true);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const classes = useStyles();
    return (
        <div className={classes.container} align="center" justify="center">
            <b><i><u><Typography variant="h5">My Profile</Typography></u></i></b> <br/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} align="center" justify="center">
                    <Typography variant="h6" >Name: {localStorage.getItem('name')}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} align="center" justify="center">
                    <Typography variant="h6" >Email: {localStorage.getItem('email')}</Typography>
                </Grid>
            </Grid>
            <br/>
            <b><i><u><Typography variant="h5">My Articles</Typography></u></i></b> <br/>
            <Link to="/createarticle"><Button variant="outlined" sx={{ width: '70%'}} color="warning" startIcon={ <Edit /> } >Write an Article</Button></Link>
            <br/>
            <br/>
            <Box sx={{ bgcolor: 'background.paper', width: '70%' }}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="inherit" variant="fullWidth" aria-label="full width tabs example">   
                        <Tab label="Pending" {...a11yProps(0)} />
                        <Tab label="Approved" {...a11yProps(1)} />
                        <Tab label="Rejected" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <TableContainer>
                            <Table sx={{ width: '100%', border: '1px solid #060238' }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#060238' }} >
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }}>Title</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Subject</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Category</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {data && data.map((row) => {
                                    if(row.status==="Pending"){
                                        return (
                                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell> {row.title} </TableCell>
                                                <TableCell align="center">{row.subject}</TableCell>
                                                <TableCell align="center">{row.category}</TableCell>
                                                <TableCell align="center">{row.status}</TableCell>
                                                <TableCell align="center">
                                                    <ButtonGroup variant="contained" color="inherit">
                                                        <IconButton color="info" component={Link} to={"viewarticle/"+row._id} ><RemoveRedEye /></IconButton> &nbsp;
                                                        <IconButton color="warning" component={Link} to={"editarticle/"+row._id} ><Edit /></IconButton> &nbsp;
                                                        <IconButton color="error" onClick={() => DeleteArticle(row._id)}><DeleteOutline /></IconButton>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    return "";
                                })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <TableContainer>
                            <Table sx={{ width: '100%', border: '1px solid #060238' }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#060238' }} >
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }}>Title</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Subject</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Category</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {data && data.map((row) => {
                                    if(row.status==="Approved"){
                                        return (
                                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell> {row.title} </TableCell>
                                                <TableCell align="center">{row.subject}</TableCell>
                                                <TableCell align="center">{row.category}</TableCell>
                                                <TableCell align="center">{row.status}</TableCell>
                                                <TableCell align="center">
                                                    <ButtonGroup variant="contained" color="inherit">
                                                        <IconButton color="info" component={Link} to={"viewarticle/"+row._id} ><RemoveRedEye /></IconButton> &nbsp;
                                                        <IconButton color="warning" component={Link} to={"editarticle/"+row._id} ><Edit /></IconButton> &nbsp;
                                                        <IconButton color="error" onClick={() => DeleteArticle(row._id)}><DeleteOutline /></IconButton>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    return "";
                                })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <TableContainer>
                            <Table sx={{ width: '100%', border: '1px solid #060238' }} aria-label="simple table">
                                <TableHead sx={{ backgroundColor: '#060238' }} >
                                    <TableRow>
                                        <TableCell sx={{ color: 'white' }}>Title</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Subject</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Category</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
                                        <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {data && data.map((row) => {
                                    if(row.status==="Rejected"){
                                        return (
                                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell> {row.title} </TableCell>
                                                <TableCell align="center">{row.subject}</TableCell>
                                                <TableCell align="center">{row.category}</TableCell>
                                                <TableCell align="center">{row.status}</TableCell>
                                                <TableCell align="center">
                                                    <ButtonGroup variant="contained" color="inherit">
                                                        <IconButton color="info" component={Link} to={"viewarticle/"+row._id} ><RemoveRedEye /></IconButton> &nbsp;
                                                        <IconButton color="warning" component={Link} to={"editarticle/"+row._id} ><Edit /></IconButton> &nbsp;
                                                        <IconButton color="error" onClick={() => DeleteArticle(row._id)}><DeleteOutline /></IconButton>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    return "";
                                })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </SwipeableViews>
            </Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
                </Alert>
            </Snackbar>
            <br/>
            <br/>
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        marginTop: '100px',
    }
});