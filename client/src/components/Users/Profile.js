import React, { Component } from 'react';
import { Container, Paper, Typography, createMuiTheme, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

const styles = {
    root: {
        padding: theme.spacing(3, 2),
    },
}

class Profile extends Component {
    render() {
        const classes = this.props.classes;
        return (<React.Fragment>
            <Container>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Profile
                    </Typography>
                    <Divider style = { {marginTop: 15, marginBottom: 15} }/>
                    <Typography component="p">
                        { this.props.user == null ? null : getProfile(this.props.user) }
                    </Typography>
                </Paper>
            </Container>
        </React.Fragment>);
    }
}

function getProfile(user){
    if(!user.name) { return "Please Login First"; }
    else return ( "Welcome, " + user.name )
}

const mapStateToProps = (store) => store;

export default withStyles(styles)(connect(mapStateToProps)(Profile));