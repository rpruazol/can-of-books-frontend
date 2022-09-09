import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Welcome from './Welcome';
import { withAuth0 } from "@auth0/auth0-react";
//import Logout from './Logout';
import Profile from './Profile';

class App extends React.Component {
  render() {
    return (

      <Router>
        <Header />
        {this.props.auth0.isAuthenticated ?
          <>
            <Routes>
              <Route
                exact path="/"
                element={<BestBooks />}
              >
              </Route>
              {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
              <Route
                exact path="/about"
                element={<About />}
              >
              </Route>
              <Route
                exact path="/profile"
                element={<Profile />}
              >
              </Route>
            </Routes>
          </>
          :
          <Welcome />}
        <Footer />
      </Router>


    );
  }
}

export default withAuth0(App);
