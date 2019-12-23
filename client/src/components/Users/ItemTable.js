import React from 'react';
import MaterialTable, { MTableEditField } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import AlertDialog from './../utils/Dialog';

const useStyles = makeStyles({
  customWidth: {
    width: "100%"
  },
});

export default function MaterialTableDemo(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        dialogOpen: false,
        columns: [
            { title: 'Item', field: 'item', },
            { title: 'Quantity', field: 'quantity', type: 'numeric', },
            { title: 'Cost/Item', field: 'cost', type: 'numeric', },
            { title: 'Total', field: 'total', editable: "never", type: 'numeric', },
        ],
        data: [],
    });
    const handleClose = () => {
        setState({dialogOpen: false, columns: state.columns, data: state.data});
    }
    return (
        <React.Fragment>
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
                                if(!newData.cost || !newData.quantity) 
                                setState({...prevState, dialogOpen: true})
                                else{    
                                    newData.total = newData.cost * newData.quantity;
                                    data.push(newData);
                                    props.handleDateChange(data);
                                    return { ...prevState, data };
                                }
                                return { ...prevState, data }
                            });
                        }, 200);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    if(!newData.cost || !newData.quantity) 
                                    setState({...prevState, dialogOpen: true})
                                    else{    
                                        newData.total = newData.cost * newData.quantity;
                                        data[data.indexOf(oldData)] = newData;
                                        props.handleDateChange(data);
                                        return { ...prevState, data };
                                    }
                                    return { ...prevState, data };
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
                                props.handleDateChange(data);
                                return { ...prevState, data };
                            });
                        }, 200);
                    }),
            }}
            options = {{
                rowStyle: {
                  backgroundColor: '#EEE',
                },
                actionsColumnIndex: 3,
                search: false,
                paging: false,
                minBodyHeight: 350,
                loadingType: "linear",
            }}
            components={{
                EditField: props => (
                    <MTableEditField {...props} className = {classes.customWidth} />
                )
            }}
        >
        </MaterialTable>
        <AlertDialog text = {"Please Enter All Data....."} title = {"Invalid Input"} open = {state.dialogOpen} handleClose = {handleClose}/>
        </React.Fragment>
    );
}