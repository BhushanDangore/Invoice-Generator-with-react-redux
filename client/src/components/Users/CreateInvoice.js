import React, { Component } from 'react';
import {
    Container,
    Paper,
    Typography,
    createMuiTheme,
    Divider,
    TextField,
    Button,
    LinearProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from '../utils/Dialog';
import { createInvoice, resetInvoiceCreateMsg, getTaxes } from '../../action';
import MaterialTable from './ItemTable';

const theme = createMuiTheme();
const styles = {
    root: {
        display: 'flex',
        flexFlow: 'column',
        padding: theme.spacing(3, 2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing(2)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 220,
        marginBottom: 25,
    },
    textFieldSmall: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    button: {
        marginTop: '20px',
        padding: '10px'
    },
    customWidth: {
        width: "100%"
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0.8rem",
    },
    noBorder: {
        borderBottom: "0px"
    },
    footerFix: {
        display: "block",
    },
};

let prevMsg = "";

class CreateInvoice extends Component {
    
    constructor(props){
        super(props)
        this.interval = null;
    }

    state = {
        openDialog: false,
        nameOfCustomer: "",
        costomerAddressLine: "",
        customerCity: "",
        customerState: "",
        customerCountry: "",
        date: new Date().toISOString(),
        items: [],
        invoiceTax: [],
        invoiceTotalTax: 0,
        invoiceTotal: 0,
        invoiceRoundoff: 0,
        displayTime: new Date(new Date().getTime() + 19800000).toISOString().split('.')[0]
    }

    componentDidMount(){
        this.props.dispatch(getTaxes());
    }

    handleClose = () => {
        this.setState({ openDialog: false })
    }

    feedDataIntoStore = () => {
        let { nameOfCustomer, date, items, invoiceTotal, invoiceTax, invoiceTotalTax, invoiceRoundoff, customerCountry, customerState, customerCity, costomerAddressLine  } = this.state;
        const storeData = { nameOfCustomer, date, items, invoiceTotal, invoiceTotalTax, invoiceTax, invoiceRoundoff, customerCountry, customerState, customerCity, costomerAddressLine };
        if (!nameOfCustomer || items.length === 0 || !date || !invoiceTotal || !invoiceTax || !invoiceTotalTax ) this.setState({ openDialog: true });
        else {
            this.props.dispatch(createInvoice(storeData));
        }
    }

    handleItemListData = (data) => {
        setTimeout(() => this.setState({ invoiceTotal: data.total, invoiceTax: data.tax, invoiceRoundoff: data.roundoff, items: data.items, invoiceTotalTax: data.totaltax }), 500);
    }

    handleInputChange = (e) => {
        switch(e.target.placeholder){
            case "NameOfCustomer":
                this.setState({ nameOfCustomer: e.target.value }); 
                break;
            case "Address": 
                this.setState({ costomerAddressLine: e.target.value }); 
                break;
            case "City": 
                this.setState({ customerCity: e.target.value }); 
                break;
            case "State": 
                this.setState({ customerState: e.target.value }); 
                break;
            case "Country": 
                this.setState({ customerCountry: e.target.value }); 
                break;
            default: console.log("Cannot Find matching Event");
        }
    }
    
    handleDateChange = event => {
        event.persist();
        this.setState({
            date: event.target.value.split('.')[0]+"."+this.state.date.split('.')[1]
        })
    };

    static getDerivedStateFromProps(props){
        if(props.profile.taxes === false && prevMsg !== props.profile.getTaxesStatus){
            props.enqueueSnackbar(props.profile.getTaxesStatus, { variant: 'warning' });
            prevMsg = props.profile.getTaxesStatus;
            return null;
        }
        return null;
    }

    render() {
        const { classes } = this.props;
        if(this.props.invoices.invoiceSaveStatus){
            setTimeout(() => {
                let { invoiceSaveStatus } = this.props.invoices;
                this.props.enqueueSnackbar(invoiceSaveStatus, {
                    variant: invoiceSaveStatus.search("Error") === -1 ? "success" : "error"
                });
                this.props.dispatch(resetInvoiceCreateMsg())}, 600)
        }
        return (<React.Fragment>
            <Container>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Create Invoice
                    </Typography>
                    <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                    {       this.props.profile.taxes === null || this.props.user.name === null ?
                            <React.Fragment>
                                <LinearProgress />
                                <Typography variant="button">Loading Your Data...</Typography> 
                            </React.Fragment> : 
                            this.props.user.name === false ? <Typography variant="button">Looks Like You Are Not Logged In.</Typography> :
                            this.props.profile.taxes === false ? <Typography variant="button">Something Went Wrong</Typography> :
                            this.renderNext(classes)
                    }
                </Paper>
            </Container>
            <AlertDialog text={"You Need To Provide All The Data To Create Invoice, Fields Can't Be Kept Empty"} title={"Can't Create Invoice"} open={this.state.openDialog} handleClose={this.handleClose} />
        </React.Fragment>);
    }
    renderNext = ( classes ) => {
        return (<React.Fragment>
            <TextField
                id="standard-full-width"
                label="Name"
                style={{ margin: 8 }}
                placeholder="NameOfCustomer"
                margin="normal"
                value={this.state.nameOfCustomer}
                onChange={this.handleInputChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="standard-full-width"
                label="Address of Customer"
                style={{ margin: 8 }}
                placeholder="Address"
                margin="normal"
                value={this.state.costomerAddressLine}
                onChange={this.handleInputChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <form noValidate autoComplete="off">
                <TextField id="standard-basic" placeholder="City" label="City" className={classes.textFieldSmall} value = {this.state.customerCity} onChange={this.handleInputChange}/>
                <TextField id="standard-basic" placeholder="State" label="State" className={classes.textFieldSmall} value = {this.state.customerState} onChange={this.handleInputChange}/>
                <TextField id="standard-basic" placeholder="Country" label="Country" className={classes.textFieldSmall} value = {this.state.customerCountry} onChange={this.handleInputChange}/>
            </form>
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    label="Date And Time"
                    type="datetime-local"
                    defaultValue = {this.state.displayTime}
                    className = {classes.textField}
                    onChange = { this.handleDateChange }
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
            
            <MaterialTable tax={this.state.invoiceTax} total={this.state.invoiceTotal} roundoff={this.state.invoiceRoundoff} handleItemListData={this.handleItemListData} taxes={this.props.profile.taxes}/>

            <AlertDialog text={"Please Enter All Data....."} title={"Invalid Input"} open={this.state.openDialog} handleClose={this.handleClose} />

            <Button variant="contained" color="primary" className={classes.button} onClick={this.feedDataIntoStore}>
                Create Invoice
            </Button>
        </React.Fragment>)
    }
}


const mapStateToProps = store => {
    return store;
};

export default connect(mapStateToProps)(withSnackbar(withStyles(styles)(CreateInvoice)));