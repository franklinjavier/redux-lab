import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// Just for your curiosity, here is how a middleware to log all actions that are dispatched, would
// look like:
function logMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
}

// Same below for a middleware to discard all actions that goes through (not very useful as is
// but with a bit of more logic it could selectively discard a few actions while passing others
// to next middleware or Redux):
function discardMiddleware ({ dispatch, getState }) {
    return function(next) {
        return function (action) {
            console.log('discardMiddleware action received:', action)
        }
    }
}

const finalCreateStore = applyMiddleware(
    //discardMiddleware,
    thunk,
    logMiddleware
)(createStore)

var reducer_final = combineReducers({
    speaker: function (state = {}, action) {
        console.log('speaker was called with state', state, 'and action', action)

        switch (action.type) {
            case 'SAY':
                return {
                    ...state,
                    message: action.message
                }
            default:
                return state
        }
    }
})

var store_0 = finalCreateStore(reducer_final)

var asyncSayActionCreator_1 = function (message) {
    return function (dispatch) {
        setTimeout(function () {
            console.log(new Date(), 'Dispatch action now:')
            dispatch({
                type: 'SAY',
                message
            })
        }, 2000)
    }
}

console.log("\n", new Date(), 'Running our async action creator:', "\n")

store_0.dispatch(asyncSayActionCreator_1('Hi'))
// Output:
//     Mon Aug 03 2015 00:01:20 GMT+0200 (CEST) Running our async action creator:
//     Mon Aug 03 2015 00:01:22 GMT+0200 (CEST) 'Dispatch action now:'
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }

// Our action is correctly dispatched 2 seconds after our call the async action creator!


export class App extends Component {
  render() {
    return (
      <div>
        <h1>Async dispatch</h1>
        <a href="https://github.com/happypoulp/redux-tutorial/blob/master/08_dispatch-async-action-1.js">Lesson</a>
      </div>
    );
  }
}
