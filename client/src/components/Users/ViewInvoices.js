import React, { Component } from 'react';
import { Container, Paper, Typography, createMuiTheme, Divider, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { withSnackbar } from 'notistack';
import Dialog from '../utils/Dialog';
import { getInvoices } from './../../action/index';

const theme = createMuiTheme();
const styles = {
    root: {
        padding: theme.spacing(3, 2),
    },
    table: {
        minWidth: 700,
    },
}

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: { 
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

class ViewInvoices extends Component {
    state = {
        openDialog: false,
        invoices: [],
        openItems: false,
        itemsArray: [],
    }

    handleClose = () => {
        this.setState({ openDialog: false, openItems: false })
    }
    openItemsDialog = (index) => {
        this.setState({openItems: true, itemsArray: this.props.invoices.invoiceList[index].items})
    }
    printInvoice = (index) => {
        console.log(index," is requesting for print");
        let linkHref = `/api/user/printinvoice/${index}`;
        window.open(linkHref, '_blank');
    }

    componentDidMount(){
        this.props.dispatch(getInvoices());
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.invoices.invoiceList.length === this.state.invoices.length) return false;
        return true;
    }
    
    render() { 
        const { classes } = this.props;    
        return ( <React.Fragment>
            <Container>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Invoice
                    </Typography>
                    <Divider style = { {marginTop: 15, marginBottom: 15} }/>
                    { this.props.user == null ? null : this.getProfile(this.props.user, classes) }
                </Paper>
                <Dialog open = {this.state.openDialog} title = "Items" text = "Something" handleClose = {this.handleClose} />
                <Dialog open = {this.state.openItems} title = "Items" handleClose = {this.handleClose} array = {this.state.itemsArray}/>
            </Container>
        </React.Fragment> );
    }
    getProfile = (user, classes) => {
        if(!user.name) { return <Typography component="p">It seems like you are not logged in</Typography> }
        else{
            if(this.props.invoices.getInvoiceFailed){
                this.props.enqueueSnackbar(this.props.invoices.getInvoiceFailed, { variant: "error" })
            }
            else {
                const { invoiceList } = this.props.invoices;
                return ( <React.Fragment>    
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name of Customer</StyledTableCell>
                                    <StyledTableCell align="right">Date</StyledTableCell>
                                    <StyledTableCell align="right">Items</StyledTableCell>
                                    <StyledTableCell align="right">Tax</StyledTableCell>
                                    <StyledTableCell align="right">Total</StyledTableCell>
                                    <StyledTableCell align="right">Print</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {invoiceList.map((row, index) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">{row.nameOfCustomer}</StyledTableCell>
                                    <StyledTableCell align="right">{(new Date(row.date).toString()).split("GMT")[0]}</StyledTableCell>
                                    <StyledTableCell align="right"><Button onClick = { (e) => { this.openItemsDialog(index)} }>Items</Button></StyledTableCell>
                                    <StyledTableCell align="right">{row.invoiceTotalTax}</StyledTableCell>
                                    <StyledTableCell align="right">{row.invoiceTotal}</StyledTableCell>
                                    <StyledTableCell align="right"><Button onClick = { (e) => { this.printInvoice(index)} }>Print</Button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment> )
            }
        }
    }
}

const mapStateToProps = store => store;

export default withStyles(styles)(withSnackbar((connect(mapStateToProps)(ViewInvoices))));