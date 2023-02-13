import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Generally we keep the package imports at the top and then the imported files
import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//function logger(obj)(next)(action);
// here logger funciton will simply console log the action type.
// const logger=function({dispatch,getState}){
//   return function(next){
//     return function(action){
//       console.log('ACTION_TYPE=', action.type);
//       next(action);
//     }
//   }
// }


// modified method of writing middleware code using currying method plus javascript logic.
//here logger funciton will simply console log the action type.
const logger = ({ dispatch, getState }) => (next) => (action) => {
  // middleware code
  if (typeof action !== 'function') {
    console.log('ACTION_TYPE=', action.type);
  }

  next(action);
};

//thunk is used when an action creator return a function instead of an object.

// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   // thunk code
//   if (typeof action === 'function') {
//     action(dispatch);
//     return;
//   }
//   next(action);
// };

const store = createStore(rootReducer, applyMiddleware(logger, thunk)); //thunk has been imported from redux thunk and it will work exactly like the code we have written above for thunk.
// console.log(store);
// console.log('Before State', store.getState());

// store.dispatch({             //in dispatch function we will pass an object as an argument.This object is the action object.
//   type: 'ADD_MOVIES',
//   movie: [{ name: 'Superman' }],
// });

// console.log('After State', store.getState());

// export const StoreContext = createContext();

// class Provider extends React.Component {
//   render() {
//     const { store } = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     );
//   }
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <StoreContext.Provider store={store}>
    <App store={store} />
    </StoreContext.Provider> */}
    {/* <Provider store={store}>
    <App/>
            {/* Here children is App*/} 
   
    <App store={store}/>
  </React.StrictMode>
);


