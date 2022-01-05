import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Login from './components/user/login';
import Register from './components/user/register';
import Footer from './components/footer/footer';
import CreateArticle from './components/artical/article';
import AddCategory from './components/category-subjects/category';
import AddSubject from './components/category-subjects/subject';
import Showarticals from './components/artical/showarticals';
import Explore from './components/courses/explore';
import Dashboard from './components/dashboard/dashboard';
import Ppt from './components/ppt/ppt';
import Admin from './components/admin/login';
import AdminDashboard from './components/admin/dashboard';
import EditArticle from './components/artical/editarticle';
import ViewArticle from './components/artical/viewarticle';

const theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'navitem' },
                    style: {
                        color: 'white',
                        textTransform: 'none',
                    },
                },
            ],
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: `'Playfair Display', serif`,
                }
            }
        }
    },
});

function App() {

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Navbar />
                    {localStorage.getItem('token') ?
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                                <Footer />
                            </Route>
                            <Route path="/createarticle">
                                <CreateArticle />
                                <Footer />
                            </Route>
                            {localStorage.getItem('name')==="Codingify" &&
                                <Route path="/admindashboard">
                                    <AdminDashboard />
                                    <Footer />
                                </Route>   
                            }  
                            <Route path="/dashboard">
                                <Dashboard />
                                <Footer />
                            </Route>
                            <Route path="/showarticals/:subject">
                                <Showarticals />
                            </Route>
                            <Route path="/editarticle/:id">
                                <EditArticle />
                            </Route>
                            <Route path="/viewarticle/:id">
                                <ViewArticle />
                            </Route>
                            <Route path="/addcategory">
                                <AddCategory />
                                <Footer />
                            </Route>
                            <Route path="/addsubject">
                                <AddSubject />
                                <Footer />
                            </Route>
                            <Route path="/explore/:cat">
                                <Explore />
                                <Footer />
                            </Route>
                            <Route path="/ppt">
                                <Ppt />
                                <Footer />
                            </Route>
                        </Switch>
                    :
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                                <Footer />
                            </Route>
                            <Route path="/login">
                                <Login />
                                <Footer />
                            </Route>
                            <Route path="/register">
                                <Register />
                                <Footer />
                            </Route>
                            <Route path="/showarticals/:subject">
                                <Showarticals />
                            </Route>
                            <Route path="/explore/:cat">
                                <Explore />
                                <Footer />
                            </Route>
                            <Route path="/ppt">
                                <Ppt />
                                <Footer />
                            </Route>
                            <Route path="/admin">
                                <Admin />
                                <Footer />
                            </Route>
                        </Switch>
                    }
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;

const useStyles = makeStyles({
    container: {
        // backgroundColor:'black', 
        // color: 'white', 
        // opacity: '90%'
        // background: 'linear-gradient(to right, #cc2b5e, #753a88)',
    },
});