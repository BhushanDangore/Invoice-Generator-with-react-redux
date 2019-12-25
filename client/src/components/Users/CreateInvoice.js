import React, { Component } from 'react';
import {
    Container,
    Paper,
    Typography,
    createMuiTheme,
    Divider,
    TextField,
    Button,
    Box, 
    TableCell,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from '../utils/Dialog';
import { createInvoice } from '../../action';
import MaterialTable, { MTableEditField, MTableCell } from 'material-table';
import DisableFieldEditable from './ItemTable';

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

    state = {
        openDialog: false,
        nameOfCustomer: "",
        date: new Date(),
        items: [{ item: 'Mehmet', cost: 10, quantity: 7, total: null }],
        tax: 0,
        total: 0,
        roundoff: 0,
        columns: [
            { title: 'Item', field: 'item', },
            { title: 'Quantity', field: 'quantity', type: 'numeric', },
            { title: 'Cost/Item', field: 'cost', type: 'numeric', },
            { title: 'Total', field: 'total', type: 'numeric', editable: 'never' },
        ],
    }

    // componentDidUpdate(){
    //     // console.log(this.props.invoices)
    // }

    handleClose = () => {
        this.setState({ openDialog: false })
    }

    feedDataIntoStore = () => {
        const { nameOfCustomer, date, items } = this.state;
        const storeData = { nameOfCustomer, date, items };
        if (!nameOfCustomer || items.length === 0 || !date) this.setState({ openDialog: true });
        // console.log(storeData);
        this.props.dispatch(createInvoice(storeData));
    }

    handleItemListData = (data) => {
        this.setState({ items: data.items, total: data.total, tax: data.tax, roundoff: data.roundoff })
    }

    handleNameChange = (e) => {
        this.setState({ nameOfCustomer: e.target.value })
    }

    handleDateChange = newDate => {
        this.setState({
            date: newDate
        })
    };
    render() {
        const { classes } = this.props;
        return (<React.Fragment>
            <Container>
                <Paper className={classes.root}>

                    <Typography variant="h5" component="h3">
                        Create Invoice
                    </Typography>

                    <Divider style={{ marginTop: 15, marginBottom: 15 }} />

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

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    </MuiPickersUtilsProvider>
                    {console.log(this.state.items)}
                    <MaterialTable
                        title="Items"
                        enableRowDelete={true}
                        enableRowAdd={true}
                        columns={this.state.columns}
                        data={this.state.items}
                        editable={{
                            onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        const newItems = this.state.items;
                                        if (!newData.cost || !newData.quantity) {
                                            this.setState({dialogOpen: true });
                                            // handleDateChange({ items: state.items, total, tax, roundoff });
                                        }
                                        else {
                                            let newtotal = 0, newtax = 0, newroundoff = 0;
                                            newData.total = parseFloat((newData.cost * newData.quantity).toFixed(2));
                                            newItems.push(newData);
                                            newItems.forEach((item) => { newtotal = newtotal + parseFloat(item.total, 10) });
                                            newtotal.toFixed(2);
                                            newtax = parseFloat(((newtotal / 100) * 28).toFixed(2));
                                            newroundoff = parseFloat((Math.round(newtotal + newtax) - (newtotal + newtax)).toFixed(2));
                                            newtotal = parseInt(Math.round(newtotal + newtax));
                                            this.setState({ items: newItems, tax: newtax, roundoff: newroundoff, total: newtotal });
                                        }
                                    }, 500);
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            const newItems = this.state.items;
                                            if(!newData.cost || !newData.quantity) 
                                            this.setState({dialogOpen: true})
                                            else{    
                                                let newtotal = 0, newtax = 0, newroundoff = 0;
                                                newData.total = parseFloat((newData.cost * newData.quantity).toFixed(2));
                                                newItems[newItems.indexOf(oldData)] = newData;
                                                newItems.forEach((item) => { newtotal = newtotal + parseFloat(item.total, 10) });
                                                newtotal.toFixed(2);
                                                newtax = parseFloat(((newtotal / 100) * 28).toFixed(2));
                                                newroundoff = parseFloat((Math.round(newtotal + newtax) - (newtotal + newtax)).toFixed(2));
                                                newtotal = parseInt(Math.round(newtotal + newtax));
                                                this.setState({ items: newItems, tax: newtax, roundoff: newroundoff, total: newtotal });
                                            }
                                        }
                                    }, 500);
                                }),
                                onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                            const newItems = this.state.items;
                                            let newtotal = 0, newtax = 0, newroundoff = 0;
                                            newItems.splice(newItems.indexOf(oldData), 1);
                                            newItems.forEach((item) => { newtotal = newtotal + parseFloat(item.total, 10) });
                                            newtotal.toFixed(2);
                                            newtax = parseFloat(((newtotal / 100) * 28).toFixed(2));
                                            newroundoff = parseFloat((Math.round(newtotal + newtax) - (newtotal + newtax)).toFixed(2));
                                            newtotal = parseInt(Math.round(newtotal + newtax));
                                            this.setState({ items: newItems, tax: newtax, roundoff: newroundoff, total: newtotal });
                                    }, 500);
                                }),
                        }}
                        options={{
                            rowStyle: {
                                backgroundColor: '#EEE',
                            },
                            actionsColumnIndex: 3,
                            search: false,
                            minBodyHeight: 300,
                            loadingType: "linear",
                        }}
                        components={{
                            Cell: props => (
                                <MTableCell {...props} className={classes.noBorder} />
                            ),
                            EditField: props => (
                                <MTableEditField {...props} className={classes.customWidth} />
                            ),
                            Pagination: props => (
                                <TableCell colSpan={3} className={classes.footerFix}>
                                    <Box component="span" m={1} className={classes.flex}>
                                        <Typography variant="h6" component="span" align={"center"}>Tax Ammount: </Typography>
                                        <Typography variant="h6" component="span" align={"center"}>{this.state.tax}</Typography>
                                    </Box>
                                    <Divider variant="middle" />
                                    <Box component="span" m={1} className={classes.flex}>
                                        <Typography variant="h5" component="span" align={"center"}>Total Ammount: </Typography>
                                        <span style={{ display: "flex", flexDirection: "column", height: "3em", alignItems: "flex-end" }}>
                                            <Typography variant="button" component="span" align={"center"}><span>Round off.</span> <span>{this.state.roundoff}</span></Typography>
                                            <Typography variant="h5" component="span" align={"center"}>{this.state.total}</Typography>
                                        </span>
                                    </Box>
                                </TableCell>
                            ),
                        }}
                    />

                    <DisableFieldEditable />
                    <AlertDialog text = {"Please Enter All Data....."} title = {"Invalid Input"} open = {this.state.openDialog} handleClose = {this.handleClose}/>

                    <Button variant="contained" color="primary" className={classes.button} onClick={this.feedDataIntoStore}>
                        Create Invoice
                    </Button>
                </Paper>
            </Container>
                    <AlertDialog text={"You Need To Provide All The Data To Create Invoice, Fields Can't Be Kept Empty"} title={"Can't Create Invoice"} open={this.state.openDialog} handleClose={this.handleClose} />
        </React.Fragment>);
    }
}


const mapStateToProps = store => store;
        
export default connect(mapStateToProps)(withStyles(styles)(CreateInvoice));