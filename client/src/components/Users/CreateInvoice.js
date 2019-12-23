import React, { Component } from 'react';
import {
    Container,
    Paper,
    Typography,
    createMuiTheme,
    Divider,
    TextField,
    Button
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ItemTable from './ItemTable';
import AlertDialog from '../utils/Dialog';
import { createInvoice } from '../../action';

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

}


class CreateInvoice extends Component {

    state = {
        openDialog: false,
        nameOfCustomer: "",
        date: new Date(),
        items: []
    }

    componentDidUpdate(){
        console.log(this.props.invoices)
    }
    handleClose = () => {
        this.setState({openDialog: false})
    }

    feedDataIntoStore = () => {
        const {nameOfCustomer, date, items} = this.state;
        const storeData = {nameOfCustomer, date, items};
        if(!nameOfCustomer || items.length === 0 || !date) this.setState({openDialog: true});
        // console.log(storeData);
        this.props.dispatch(createInvoice(storeData));
    }

    handleItemListData = (data) => {
        setTimeout(() => this.setState({items: data}),400);
    }

    handleNameChange = (e) => {
        this.setState({nameOfCustomer: e.target.value})
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
                        value= {this.state.nameOfCustomer}
                        onChange = {this.handleNameChange}
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

                    <ItemTable handleDateChange = {this.handleItemListData}/>
                    
                    <Button variant="contained" color="primary" className = {classes.button} onClick = {this.feedDataIntoStore}>
                        Create Invoice
                    </Button>
                </Paper>
            </Container>
            <AlertDialog text = {"You Need To Provide All The Data To Create Invoice, Fields Can't Be Kept Empty"} title = {"Can't Create Invoice"} open = {this.state.openDialog} handleClose = {this.handleClose}/>
        </React.Fragment>);
    }
}

const mapStateToProps = store => store;

export default connect(mapStateToProps)(withStyles(styles)(CreateInvoice));