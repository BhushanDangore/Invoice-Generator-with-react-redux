import React, { Component } from 'react';
import { Container, Paper, Typography, createMuiTheme, Divider, TextField, Box, MenuItem, Button, LinearProgress, DialogActions, DialogContentText, DialogContent, DialogTitle, Dialog, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, ButtonGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getProfileConfig, setProfileConfig, resetProfile } from './../../action/index';
import { withSnackbar } from 'notistack';

const theme = createMuiTheme();

const styles = {
    root: {
        padding: theme.spacing(2, 1),
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
    },
    table: {
        maxWidth: 350,
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
        taxName: "",
        taxValue: 1,
        taxesArr:[],
        taxDialogOpen: false,
        taxAddErr: "",
    }
    currencies = [{ value: 'USD', label: '$' }, { value: 'INR', label: '₹' }, { value: 'EUR', label: '€' }]

    componentDidMount() {
        console.log("Mounted");
        this.props.dispatch(getProfileConfig())
    }

    handleTaxDialogClose = () => {
        this.setState({ taxDialogOpen: false});
    }

    handleInputChange = e => {
        switch (e.target.name) {
            case "shopName":
                this.setState({ shopName: e.target.value });
                break;
            case "addressLine1":
                this.setState({ addressLine1: e.target.value });
                break;
            case "addressLine2":
                this.setState({ addressLine2: e.target.value });
                break;
            case "currency":
                this.setState({ currency: e.target.value });
                break;
            case "taxName":
                this.setState({taxName: e.target.value, taxAddErr: ""});
                break;
            case "taxValue":
                this.setState({taxValue: e.target.value, taxAddErr: ""});
                break;
            default:
                console.log("No Target For Input Found");
        }
    }

    addTaxes = () => {
        this.setState({ taxDialogOpen: true })
    }

    clearAllTax = () => {
        console.log(this.state.taxesArr);
        this.setState({
            taxDialogOpen: false,
            taxesArr: [],
            taxName: "",
            taxValue: 1,
        })
    }

    handleTaxDialogSave = () => {
        let taxesArr = this.state.taxesArr;
        const taxName = this.state.taxName;
        const taxValue = this.state.taxValue;
        if(this.state.taxName && this.state.taxValue){
            this.setState({ taxesArr: [...taxesArr, { taxName, taxValue }] , taxDialogOpen: false});
        }
        else{
            this.setState({taxAddErr: "Please Fill All Fields"});
        }
    }

    saveInputs = () => {
        const { shopName, addressLine1, addressLine2, currency, taxesArr } = this.state;
        const data = { shopName, addressLine1, addressLine2, currency, taxes : taxesArr };
        this.props.dispatch(resetProfile());
        if (data.shopName && data.addressLine1 && data.addressLine2) {
            if(taxesArr.length === 0){
                this.props.enqueueSnackbar("Please Add Taxes", { variant: "warning" });   
            }
            else    this.props.dispatch(setProfileConfig(data));
        }
        else this.props.enqueueSnackbar("Fill All The Data Fields", { variant: "warning" });
    }

    static getDerivedStateFromProps(props, state) {
        const profile = props.profile;
        if (profile.config) {
            const config = profile.config;
            if (config.shopName) {
                console.log(config);
                const { shopName, addressLine1, addressLine2, currency, taxes } = config;
                if (shopName !== state.shopName && addressLine2 !== state.addressLine2 && addressLine1 !== state.addressLine1  && JSON.stringify(taxes)  !== JSON.stringify(state.taxes)) {
                    props.dispatch(resetProfile());
                    return { shopName, addressLine1, addressLine2, currency, taxesArr: taxes };
                }
            }
            else if (profile.saveStatus) {
                props.enqueueSnackbar(profile.saveStatus, { variant: 'success' })
                props.dispatch(resetProfile());
            }
            return null;
        } else {
            if (profile.config === null) {
                props.enqueueSnackbar(profile.statusMessage, { variant: "warning" })
                props.dispatch(resetProfile());
                return null
            }
            if (profile.config === false) {
                if (profile.statusMessage) {
                    props.enqueueSnackbar(profile.statusMessage, { variant: "error" });
                    props.dispatch(resetProfile());
                    return null;
                }
                if (profile.saveStatus) {
                    props.enqueueSnackbar(profile.saveStatus, { variant: 'warning' });
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
            <Dialog open={this.state.taxDialogOpen} onClose={this.handleTaxDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add TAX</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter Tax Name And Its Value In Percentage
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.taxAddErr}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="taxName"
                            label="Tax Name"
                            value={this.state.taxName}
                            type="Text"
                            onChange = {this.handleInputChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="taxValue"
                            id="name"
                            label="Tax Percent"
                            value={this.state.taxValue}
                            type="number"
                            onChange = {this.handleInputChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleTaxDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleTaxDialogSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
        </React.Fragment>);
    }

    getProfile = (user, classes) => {
        if (user.name === null) {
            return <LinearProgress />;
        }
        if (user.name === false) {
            return <Typography component="p" align="center" gutterBottom variant="h5">Looks Like You Are Not Logged In</Typography>;
        }
        return (<React.Fragment>
            <Box className={classes.box}>
                <Typography component="p" align="center" gutterBottom variant="h5">{"Welcome, " + user.name}</Typography>
                
                <form className={classes.root} noValidate autoComplete="off">
                    <Typography component="p" gutterBottom variant="h6">Details of Shop</Typography>
                    <TextField id="outlined-basic" name="shopName" label="Shop Name" variant="outlined" fullWidth value={this.state.shopName} onChange={this.handleInputChange} />
                    <TextField id="outlined-basic" name="addressLine1" label="Address Line" variant="outlined" fullWidth value={this.state.addressLine1} onChange={this.handleInputChange} />
                    <TextField id="outlined-basic" name="addressLine2" label="Address Line 2" variant="outlined" fullWidth value={this.state.addressLine2} onChange={this.handleInputChange} />
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
                    <Typography component="p" gutterBottom variant="h6">Tax Details</Typography>
                    <TableContainer component={Box}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tax Name</TableCell>
                                    <TableCell align="right">Tax Ammount (%) </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.taxesArr.map(row => (
                                <TableRow key={row.taxName}>
                                    <TableCell component="th" scope="row">{row.taxName}</TableCell>
                                    <TableCell align="right">{row.taxValue}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box className={classes.box}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button variant="outlined" color="primary" onClick={this.clearAllTax}>Clear All TAX</Button>
                            <Button variant="outlined" color="primary" onClick={this.addTaxes}>Add TAX</Button>
                        </ButtonGroup>
                    </Box>
                    <Button variant="outlined" color="primary" className={classes.saveBtn} onClick={this.saveInputs}>Save</Button>
                </form>
            </Box>
        </React.Fragment>)
    }
}

const mapStateToProps = (store) => store;

export default withStyles(styles)(withSnackbar(connect(mapStateToProps)(Profile)));