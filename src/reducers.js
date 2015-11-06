import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'


var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state, 
                name: action.name
            }
        default:
            return state;
    }
}

var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state, 
                action.item
            ]
        default:
            return state;
    }
}


var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})

var store_0 = createStore(reducer)
console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())


store_0.dispatch({
    type: 'AN_ACTION'
})

// ------------------------ //

console.log('store_0 state after AN_ACTION:', store_0.getState())

var setNameActionCreator = function (name) {
    return {
        type: 'SET_NAME',
        name: name
    }
}

store_0.dispatch(setNameActionCreator('bob'))

console.log('store_0 state after action SET_NAME:', store_0.getState())

// ------------------------ //


export class App extends Component {
  render() {
    return (
      <div>
        <h1>Reducers</h1>
        <a href="https://github.com/happypoulp/redux-tutorial/blob/master/06_combine-reducers.js">Lesson</a>
      </div>
    );
  }
}
