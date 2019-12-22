import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import Drawer from "./components/Drawer";
import LoginForm from './components/LoginForm';
import Dashboard from './components/Users/Dashboard';
import Profile from './components/Users/Profile'
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { getUser } from './action'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: false,
            left: false
        };
    }
    componentDidMount(){
        this.props.dispatch(getUser());
    }

    toggleDrawer = (side, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ ...this.state, [side]: open });
    };
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Drawer toggleDrawer={this.toggleDrawer} left={this.state.left} />
                    <NavBar toggleDrawer={this.toggleDrawer} />
                    <Route exact path="/login"> <LoginForm /> </Route>
                    <Route exact path="/dashboard"> <Dashboard /> </Route> 
                    <Route exact path="/profile"> <Profile /> </Route>
                </Router>
            </React.Fragment>
        );
    }
}

function mapStateToProps(store) {
    return store;
}

export default connect(mapStateToProps)(App);
