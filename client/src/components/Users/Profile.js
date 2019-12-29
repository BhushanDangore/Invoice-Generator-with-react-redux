import React, { Component } from 'react';
import { Container, Paper, Typography, createMuiTheme, Divider, TextField, Box, MenuItem, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getProfileConfig, setProfileConfig, resetProfile } from './../../action/index';
import { withSnackbar } from 'notistack';

const theme = createMuiTheme();

const styles = {
    root: {
        padding: theme.spacing(3, 2),
        '& > *': {
            margin: theme.spacing(1),
        },
        flexFlow: "wrap"
    },
    saveBtn: {
        display: "block",
        margin: "auto",
        padding: "1em 3em",
        [theme.breakpoints.down('md')]: {
            width: "100%",
        },
    },
    box: {
        padding: "15px 5px",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
        },
    }
}

class Profile extends Component {
    isMessageDisplayed = false;
    state = {
        currency: "INR",
        shopName: "",
        addressLine1: "",
        addressLine2: "",
        config: {},
        isMessageDisplayed: false,
    }
    currencies = [{ value: 'USD', label: '$' }, { value: 'INR', label: '₹' }, { value: 'EUR', label: '€' }]

    componentDidMount() {
        console.log("Mounted");
        this.props.dispatch(getProfileConfig())
    }

    handleInputChange = e => {
        switch(e.target.name){
            case "shopName":
                this.setState({shopName: e.target.value});
                break;
            case "addressLine1":
                this.setState({addressLine1: e.target.value});
                break;
            case "addressLine2":
                this.setState({addressLine2: e.target.value});
                break;
            case "currency":
                this.setState({currency: e.target.value}); 
                break;   
            default:
                console.log("No Target For Input Found");
        }
    }

    saveInputs = () => {
        const {shopName, addressLine1, addressLine2, currency} = this.state;
        const data = {shopName, addressLine1, addressLine2, currency};
        this.props.dispatch(resetProfile());
        if(data.shopName && data.addressLine1 && data.addressLine2){
            this.props.dispatch(setProfileConfig(data));
        }
        else this.props.enqueueSnackbar("Fill All The Data Fields", {variant: "warning"});
    }

    static getDerivedStateFromProps(props, state) {
        const profile = props.profile;
        console.log("Current Props -- ",profile)
        if (profile.config) {
            const config = profile.config;
            if (config.shopName) {
                const { shopName, addressLine1, addressLine2 } = config;
                if(shopName !== state.shopName && addressLine2 !== state.addressLine2 && addressLine1 !== state.addressLine1){
                    props.dispatch(resetProfile());
                    return { shopName, addressLine1, addressLine2 };
                }
            }
            else if(profile.saveStatus){
                props.enqueueSnackbar(profile.saveStatus, {variant: 'success'})
                props.dispatch(resetProfile());
            }
            return null;
        } else {
            if(profile.config === null ){
                props.enqueueSnackbar(profile.statusMessage, {variant: "warning"})
                props.dispatch(resetProfile());
                return null
            }
            if(profile.config === false ){
                if(profile.statusMessage){
                    props.enqueueSnackbar(profile.statusMessage, {variant: "error"});
                    props.dispatch(resetProfile());
                    return null;
                }
                if(profile.saveStatus){
                    props.enqueueSnackbar(profile.saveStatus, {variant: 'info'});
                    props.dispatch(resetProfile());
                    return null;
                }
            }
        }
        return null;
    }

    render() {
        const classes = this.props.classes;
        return (<React.Fragment>
            <Container>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Profile
                    </Typography>
                    <Divider />
                    {this.props.user == null ? null : this.getProfile(this.props.user, classes)}
                </Paper>
            </Container>
        </React.Fragment>);
    }

    getProfile = (user, classes) => {
        if (user.name === null) {
            return <CircularProgress />;
        }
        if(user.name === false) {
            return <Typography component="p" align="center" gutterBottom variant="h5">Looks Like You Are Not Logged In</Typography>;
        }
        return (<React.Fragment>
            <Box className={classes.box}>
                <Typography component="p" align="center" gutterBottom variant="h5">{"Welcome, " + user.name}</Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <Typography component="p" gutterBottom variant="h6">Configure Your Profile</Typography>
                    <TextField id="outlined-basic" name="shopName" label="Shop Name" variant="outlined" fullWidth value={this.state.shopName} onChange = {this.handleInputChange}/>
                    <TextField id="outlined-basic" name="addressLine1" label="Address Line" variant="outlined" fullWidth value={this.state.addressLine1} onChange = {this.handleInputChange}/>
                    <TextField id="outlined-basic" name="addressLine2" label="Address Line 2" variant="outlined" fullWidth value={this.state.addressLine2} onChange = {this.handleInputChange}/>
                    <TextField
                        id="outlined-select-currency"
                        name="currency"
                        select
                        label="Select"
                        value={this.state.currency}
                        onChange={this.handleInputChange}
                        helperText="Please select your currency"
                        variant="outlined"
                    >
                        {this.currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="outlined" color="primary" className={classes.saveBtn} onClick = {this.saveInputs}>Save</Button>
                </form>
            </Box>
        </React.Fragment>)
    }
}

const mapStateToProps = (store) => store;

export default withStyles(styles)(withSnackbar(connect(mapStateToProps)(Profile)));