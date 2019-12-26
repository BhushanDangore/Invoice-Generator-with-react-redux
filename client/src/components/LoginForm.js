import React, { Component } from 'react';
import { Container, Button, Card, Avatar, Typography, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    root: {
        minWidth: 250,
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        margin: "5px",
        justifyContent: "center",
        alignItems: "center"
    },
    link: {
        height: "3.5em",
        margin: "10px 5px",
        minWidth: "90%",
        display: "flex",
    },
    button: {
        height: "100%",
        width: "100%",
    },
    avatar: {
        width: "30%",
        height: "auto",
        margin: "25px 10px"
    }
}

class LoginForm extends Component {
    render() {
        const { classes } = this.props;
        return (<React.Fragment>
            <Container maxWidth="sm">
                <Card className={classes.root}>
                    <Avatar src="/icons/icons8-user-96.png" className={classes.avatar} />
                    <Typography color='primary' variant='h4'>Login With</Typography>
                    <Link href="/api/login/facebook" className={classes.link}>
                        <Button variant="outlined" color="primary" className = {classes.button}>
                            Facebook
                        </Button>
                    </Link>
                    <Link href="/api/login/google" className={classes.link}>
                        <Button variant="outlined" color="secondary" className = {classes.button}>
                            Google
                        </Button>
                    </Link>
                </Card>
            </Container>
        </React.Fragment>);
    }
}

export default withStyles(styles)(LoginForm);