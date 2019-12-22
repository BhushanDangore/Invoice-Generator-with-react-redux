import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: '230px',
        marginRight: '4px',
    },
    linkFix: {
        textDecoration: "none",
        color: "black",
    }
}
class Drawer extends Component {

    sideList = side => {
        const { classes } = this.props;
        return (<div
            className={classes.root}
            role="presentation"
            onClick={this.props.toggleDrawer(side, false)}
            onKeyDown={this.props.toggleDrawer(side, false)}
        >
            <List>
                <Link to="/profile" className={classes.linkFix}>
                    <ListItem button>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </Link>
                <Link to="/dashboard" className={classes.linkFix}>
                    <ListItem button>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
            </List>
        </div>);
    }

    render() {

        return (
            <div>
                <SwipeableDrawer
                    anchor="left"
                    open={this.props.left}
                    onClose={this.props.toggleDrawer('left', false)}
                    onOpen={this.props.toggleDrawer('left', true)}
                >
                    {this.sideList('left')}
                </SwipeableDrawer>
            </div>
        );
    }

}

export default withStyles(styles)(Drawer);