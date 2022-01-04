import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, ButtonGroup, Grid, Button } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';

export default function Dashboard() {

    const [data, setData] = useState();

    const userId=localStorage.getItem('userId');

    useEffect(()=>{
        if(localStorage.getItem('userId')) {
            fetch(`https://thecodingifyserver.herokuapp.com/retrive_article_by_userId/${userId}`, {
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
            <b><i><u><Typography variant="h5">My Artiles</Typography></u></i></b> <br/>
            <Link to="/createarticle"><Button variant="outlined" sx={{ width: '70%'}} color="warning" startIcon={ <Edit /> } >Write an Article</Button></Link>
            <br/>
            <br/>
            <TableContainer>
                <Table sx={{ width: '70%', border: '1px solid #060238' }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#060238' }} >
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>Title</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Subject</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Category</TableCell>
                            <TableCell align="center" sx={{ color: 'white' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data && data.map((row) => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                            <TableCell> {row.title} </TableCell>
                            <TableCell align="center">{row.subject}</TableCell>
                            <TableCell align="center">{row.category}</TableCell>
                            <TableCell align="center">
                                <ButtonGroup variant="contained" color="inherit">
                                    <IconButton color="info"><RemoveRedEye /></IconButton> &nbsp;
                                    <IconButton color="warning"><Edit /></IconButton> &nbsp;
                                    <IconButton color="error"><DeleteOutline /></IconButton>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
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