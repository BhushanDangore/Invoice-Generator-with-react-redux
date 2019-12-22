import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const theme = createMuiTheme();

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    linkFix: {
        textDecoration: 'none',
        color: "white"
    }
}

class NavBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.props.toggleDrawer('left', true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Inovoice Generator
                        </Typography>
                            <LoginButton user = {this.props.user} classes/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const LoginButton = props => {
    if(props.user === null) return null;
    else if(props.user)
    return (<Link href="/api/logout" className = {props.classes.linkFix}>
            <Button variant="outlined" color="default" >Logout</Button>
        </Link>)
    else
    return (<Link href="/api/login/google" className = {props.classes.linkFix}>
            <Button variant="outlined" color="default" >Login</Button>
        </Link>)
} 

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => {
    return (store);
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(NavBar)));