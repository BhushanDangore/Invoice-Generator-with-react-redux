import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        fullWidth={true}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent dividers={ true }>
            { !props.array ? props.text : <TableContainer component={Paper}>
                <Table size="medium" aria-label="simple table">
                    <TableHead>
                            <TableRow>
                                <TableCell>Index</TableCell>
                                <TableCell align="right">Item Name</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Cost</TableCell>
                                <TableCell align="right">Total Bill</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.array.map( (row, index) => (
                                <TableRow key={row._id}>
                                <TableCell component="th" scope="row">{index+1}</TableCell>
                                <TableCell align="right">{row.item}</TableCell>
                                <TableCell align="right">{row.quantity}</TableCell>
                                <TableCell align="right">{row.cost}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}