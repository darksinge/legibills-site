var React = require('react');
var ReactDOM = require('react-dom');

var path = require('path');

var App = require('./src/App.jsx');

window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
}

