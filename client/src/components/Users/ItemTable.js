import React from 'react';
import MaterialTable, { MTableEditField, MTableCell } from 'material-table';
import AlertDialog from '../utils/Dialog';
import {
    Box,
    TableCell,
    Typography,
    Divider,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
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
    roundoff: {
        padding: "4px 22px"
    },
})

export default function MaterialTableDemo(props) {

    let { total, roundoff, handleItemListData, taxes } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        columns: [
            { title: 'Item', field: 'item' },
            { title: 'Quantity', field: 'quantity', type: 'numeric' },
            { title: 'Cost/Item', field: 'cost', type: 'numeric' },
            { title: 'total', field: 'total', type: 'numeric', editable: 'never' },
        ],
        data: [],
        openDialog: false
    });

    function handleClose(){
        setState(prevState => {
            setState({...prevState, openDialog: false});
        })
    }

    return (<React.Fragment>
        <MaterialTable
            title="Items"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                if (!newData.cost || !newData.quantity || !newData.item) {
                                    setState({ ...prevState, openDialog: true });
                                }
                                else {
                                    newData.cost = parseFloat(newData.cost);
                                    newData.quantity = parseFloat(newData.quantity);
                                    newData.total = parseFloat((newData.cost * newData.quantity).toFixed(2));
                                    data.push(newData);
                                    handleItemListData(calculateValues(data, taxes));
                                    setState({ ...prevState, data });
                                }
                                return { ...prevState, data };
                            });
                        }, 200);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    if (!newData.cost || !newData.quantity || !newData.item) {
                                        setState({ ...prevState, openDialog: true });
                                    }
                                    else{
                                        const data = [...prevState.data];
                                        newData.cost = parseFloat(newData.cost);
                                        newData.quantity = parseFloat(newData.quantity);
                                        newData.total = parseFloat((newData.cost * newData.quantity).toFixed(2));
                                        data[data.indexOf(oldData)] = newData;
                                        handleItemListData(calculateValues(data, taxes));
                                        return { ...prevState, data };
                                    }
                                });
                            }
                        }, 200);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                handleItemListData(calculateValues(data, taxes));
                                return { ...prevState, data };
                            });
                        }, 200);
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
                            {taxes.map((taxed, i)=> {
                                return <Typography key = {i} variant="subtitle1" component="span" align={"center"}>{taxed.taxName}&ensp; {taxed.taxValue}% &emsp; {taxed.totalTax}</Typography>
                            })}
                        </Box>
                        
                        <Divider variant="middle" />

                        <Typography variant="button" className = {classes.roundoff} component="div" align={"right"}>Round Off &emsp;{roundoff}</Typography>

                        <Divider variant="middle" />

                        <Box component="span" m={1} className={classes.flex}>
                            <Typography variant="h6" component="span" align={"center"}>Total Ammount: </Typography>
                            <Typography variant="h5" component="span" align={"center"}>{total}</Typography>
                        </Box>
                    </TableCell>
                ),
            }}
        />
        <AlertDialog text={"Please enter all data in items list"} title={"Invalid Input"} open={state.openDialog} handleClose={handleClose} />
        </React.Fragment>
    );

}
function calculateValues(data, taxes) {
    let newtotal = 0, newtax = 0, newroundoff = 0;
    data.forEach((item) =>  newtotal = newtotal + item.total );
    taxes.map(tax => {
        return tax.totalTax = parseFloat(((newtotal / 100) * tax.taxValue).toFixed(2))
    })
    taxes.forEach(tax => {
        newtax = newtax + tax.totalTax;
    });
    newroundoff = parseFloat((Math.round(newtotal + newtax) - (newtotal + newtax)).toFixed(2));
    newtotal = parseInt(Math.round(newtotal + newtax));
    return { total: newtotal, tax: taxes, roundoff: newroundoff, items: data, totaltax: newtax };
}
