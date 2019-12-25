import React from 'react';
import MaterialTable, { MTableEditField, MTableCell } from 'material-table';
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
})

export default function MaterialTableDemo(props) {

    let { tax, total, roundoff, handleItemListData } = props;

    const classes = useStyles();

    const [state, setState] = React.useState({
        columns: [
            { title: 'Item', field: 'item' },
            { title: 'Quantity', field: 'quantity', type: 'numeric' },
            { title: 'Cost/Item', field: 'cost', type: 'numeric' },
            { title: 'total', field: 'total', type: 'numeric', editable: 'never' },
        ],
        data: [],
        dialogOpen: false
    });

    return (
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
                                console.log(data);
                                if (!newData.cost || !newData.quantity) {
                                    setState({ ...prevState, dialogOpen: true });
                                }
                                else {
                                    newData.cost = parseFloat(newData.cost);
                                    newData.quantity = parseFloat(newData.quantity);
                                    newData.total = parseFloat((newData.cost * newData.quantity).toFixed(2));
                                    data.push(newData);
                                    handleItemListData(calculateValues(data));
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
                                    if (!newData.cost || !newData.quantity) {
                                        setState({ ...prevState, dialogOpen: true });
                                    }
                                    else{
                                        const data = [...prevState.data];
                                        newData.cost = parseFloat(newData.cost);
                                        newData.quantity = parseFloat(newData.quantity);
                                        newData.total = (newData.cost * newData.quantity).toFixed(2);
                                        data[data.indexOf(oldData)] = newData;
                                        handleItemListData(calculateValues(data));
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
                                handleItemListData(calculateValues(data));
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
                            <Typography variant="h6" component="span" align={"center"}>{tax}</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box component="span" m={1} className={classes.flex}>
                            <Typography variant="h5" component="span" align={"center"}>Total Ammount: </Typography>
                            <span style={{ display: "flex", flexDirection: "column", height: "3em", alignItems: "flex-end" }}>
                                <Typography variant="button" component="span" align={"center"}><span>Round off.</span> <span>{roundoff}</span></Typography>
                                <Typography variant="h5" component="span" align={"center"}>{total}</Typography>
                            </span>
                        </Box>
                    </TableCell>
                ),
            }}
        />
    );

}
function calculateValues(data) {
    let newtotal = 0, newtax = 0, newroundoff = 0;
    data.forEach((item) =>  newtotal = newtotal + item.total );
    newtotal = parseFloat(newtotal.toFixed(2))
    newtax = parseFloat(((newtotal / 100) * 28).toFixed(2));
    newroundoff = parseFloat((Math.round(newtotal + newtax) - (newtotal + newtax)).toFixed(2));
    newtotal = parseInt(Math.round(newtotal + newtax));
    return { total: newtotal, tax: newtax, roundoff: newroundoff, items: data };
}
