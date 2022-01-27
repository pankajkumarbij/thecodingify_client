import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';
import Footer from '../components/footer/footer';
import CreateArticle from '../components/artical/article';
import AddCategory from '../components/category-subjects/category';
import AddSubject from '../components/category-subjects/subject';
import Showarticals from '../components/artical/showarticals';
import Explore from '../components/courses/explore';
import Dashboard from '../components/dashboard/dashboard';
import Admin from '../components/admin/login';
import AdminDashboard from '../components/admin/dashboard';
import EditArticle from '../components/artical/editarticle';
import ViewArticle from '../components/artical/viewarticle';
import { user } from '../utils/user';

export default function Routes() {

  return (
    <>
      <Router>
        <Navbar />
        {user!=="no user" ?
          <Switch>
            <Route path="/" exact>
              <Home />
              <Footer />
            </Route>
            <Route path="/createarticle">
              <CreateArticle />
              <Footer />
            </Route>
            {user.email==="codingify.tech@gmail.com" &&
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
          </Switch>
        :
          <Switch>
            <Route path="/" exact>
              <Home />
              <Footer />
            </Route>
            <Route path="/showarticals/:subject">
              <Showarticals />
            </Route>
            <Route path="/explore/:cat">
              <Explore />
              <Footer />
            </Route>
            <Route path="/admin">
              <Admin />
              <Footer />
            </Route>
          </Switch>
        }
      </Router>
    </>
  );
}