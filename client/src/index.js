import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware  from 'redux-thunk';
import { SnackbarProvider } from 'notistack';

import App from './App';
import { reducers } from './reducers'
import * as serviceWorker from './serviceWorker';


const store = createStore(reducers, applyMiddleware(ThunkMiddleware));

ReactDOM.render( 
    <Provider store = {store}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
        preventDuplicate: true,
    }}>
            <App />
        </SnackbarProvider>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
