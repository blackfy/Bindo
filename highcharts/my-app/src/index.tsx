import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Drag from './Drag';
// import PieChart from './text/PieChart'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App 
    // style={{width:'100px',height:'100px',backgroundColor:'green',position:'absolute'}}
    />, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
