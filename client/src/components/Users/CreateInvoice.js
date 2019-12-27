import React, { Component } from 'react';
import {
    Container,
    Paper,
    Typography,
    createMuiTheme,
    Divider,
    TextField,
    Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from '../utils/Dialog';
import { createInvoice, resetInvoiceCreateMsg } from '../../action';
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
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 220,
        marginBottom: 20,
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

class CreateInvoice extends Component {
    
    constructor(props){
        super(props)
        this.interval = null;
    }

    state = {
        openDialog: false,
        nameOfCustomer: "",
        date: new Date().toISOString(),
        items: [],
        invoiceTax: 0,
        invoiceTotal: 0,
        invoiceRoundoff: 0,
    }

    handleClose = () => {
        this.setState({ openDialog: false })
    }

    feedDataIntoStore = () => {
        let { nameOfCustomer, date, items, invoiceTotal, invoiceTax, invoiceRoundoff } = this.state;
        const storeData = { nameOfCustomer, date, items, invoiceTotal, invoiceTax, invoiceRoundoff };
        console.log((this.state.date).toString());
        if (!nameOfCustomer || items.length === 0 || !date || !invoiceTotal || !invoiceTax ) this.setState({ openDialog: true });
        else {
            this.props.dispatch(createInvoice(storeData));
        }
    }

    handleItemListData = (data) => {
        setTimeout(() => this.setState({ invoiceTotal: data.total, invoiceTax: data.tax, invoiceRoundoff: data.roundoff, items: data.items }), 500);
    }

    handleNameChange = (e) => {
        this.setState({ nameOfCustomer: e.target.value })
    }
    
    handleDateChange = event => {
        event.persist();
        console.log(event.target.value);
        console.log(this.state.date)
        this.setState({
            date: event.target.value.split('.')[0]+"."+this.state.date.split('.')[1]
        })
    };
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
                    {this.props.user === null ? null : this.checkUser(this.props.user, classes)}
                </Paper>
            </Container>
            <AlertDialog text={"You Need To Provide All The Data To Create Invoice, Fields Can't Be Kept Empty"} title={"Can't Create Invoice"} open={this.state.openDialog} handleClose={this.handleClose} />
        </React.Fragment>);
    }
    checkUser = (user, classes) => {
        if (user) {
            return (<React.Fragment>
                <TextField
                    id="standard-full-width"
                    label="Name"
                    style={{ margin: 8 }}
                    placeholder="Name of Customer"
                    margin="normal"
                    fullWidth
                    value={this.state.nameOfCustomer}
                    onChange={this.handleNameChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
    
                <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    label="Date And Time"
                    type="datetime-local"
                    defaultValue = {this.state.date.split('.')[0]}
                    className = {classes.textField}
                    onChange = { this.handleDateChange }
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </form>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        style={{ margin: 8, marginBottom: 20 }}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="dd/MM/yyyy"
                        value={this.state.date}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider> */}
    
                <MaterialTable tax={this.state.invoiceTax} total={this.state.invoiceTotal} roundoff={this.state.invoiceRoundoff} handleItemListData={this.handleItemListData} />
    
                <AlertDialog text={"Please Enter All Data....."} title={"Invalid Input"} open={this.state.openDialog} handleClose={this.handleClose} />
    
                <Button variant="contained" color="primary" className={classes.button} onClick={this.feedDataIntoStore}>
                    Create Invoice
                </Button>
            </React.Fragment>)
        }
        else {
            return "Please Login First";
        }
    }
}


const mapStateToProps = store => {
    return store;
};

export default connect(mapStateToProps)(withSnackbar(withStyles(styles)(CreateInvoice)));