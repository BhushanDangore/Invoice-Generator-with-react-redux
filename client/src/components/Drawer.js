import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

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
                <Link to="/dashboard" className={classes.linkFix}>
                    <ListItem button>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                <Link to="/createinvoice" className={classes.linkFix}>
                    <ListItem button >
                        <ListItemText primary="Create Invoice" />
                    </ListItem>
                </Link>
                <Link to="/viewinvoices" className={classes.linkFix}>
                    <ListItem button>
                        <ListItemText primary="View Invoices" />
                    </ListItem>
                </Link>
                <Link to="/profile" className={classes.linkFix}>
                    <ListItem button>
                        <ListItemText primary="Profile" />
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

const mapStateToProps = (store) => {
    return store;
}

export default connect(mapStateToProps)(withStyles(styles)(Drawer));