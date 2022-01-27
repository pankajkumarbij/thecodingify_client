import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Snackbar, Alert, Button } from '@mui/material';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import { user } from '../../utils/user';
import { Retrive_All_Articles } from '../../services/article';
import axios from 'axios';
import { headers } from '../../utils/header';

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default function AdminDashboard() {

    const [data, setData] = useState();
    const [message, setMessage] = useState();
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        if(user.id) {
            Retrive_All_Articles()
            .then(result => {
                setData(result);
            })
        }
    }, [data]);

    function updateStatus(id, status) {
        axios.put(serverUrl+'update_article_status/'+id, {
            status: status
        },{
            headers
        })
        .then(data => {
            setMessage(data.data.message);
            setOpen(true);
        })
        .catch(err=>{
            console.log(err.error);
        }); 
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <div className={classes.container} align="center" justify="center">
            <b><i><u><Typography variant="h5">Pending Articles</Typography></u></i></b> <br/>
            <br/>
            <TableContainer>
                <Table sx={{ width: '70%', border: '1px solid #060238' }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#060238' }} >
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>S.N.</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Title</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Subject</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Category</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>View</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data && data.map((row, index) => {
                        if(row.status==="Pending"){
                            return (
                                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell> {index+1} </TableCell>
                                    <TableCell align="center"> {row.title} </TableCell>
                                    <TableCell align="center">{row.subject}</TableCell>
                                    <TableCell align="center">{row.category}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="info" component={Link} to={"viewarticle/"+row._id} ><RemoveRedEye /></IconButton> &nbsp;
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="success" onClick={()=>updateStatus(row._id, "Approved")}>Approve</Button> &nbsp;
                                        <Button variant="outlined" color="error" onClick={()=>updateStatus(row._id, "Rejected")}>Reject</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        return "";
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
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