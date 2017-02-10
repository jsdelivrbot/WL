import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './App';
import './style.scss';

function reducer(state = [], action) {

    if (action.type === 'ADD_FILM') {
        return state;

    } else if (action.type === 'DELETE_FILM') {

        return state.filter((film) => {
            return film['_id'] !== action.payload;
        });


    } else if (action.type === 'FIND_FILM') {
        return [...action.payload];
    } else if (action.type === 'SORT_STORE') {
        return [...action.payload];
    } else {
        return state;
    }

}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
