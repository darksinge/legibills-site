
import React, {Component} from 'react';
import {Button, Text} from 'react-native-web';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

var history = createBrowserHistory();

var HomePage = require('./HomePage.jsx');
var AboutPage = require('./AboutPage.jsx');
var NotFound = require('./NotFound.jsx');

var listStyle = {
    display: 'inline',
    marginLeft: 20
}

var pages = [
    {name: 'home', link: '/'},
    {name: 'about', link: '/about'}
];

var links = pages.map((value) => {
    return (
        <li style={listStyle} key={value.name}>
            <Link to={value.link}>{value.name}</Link>
        </li>
    );
});

links = <ul>{links}</ul>;

var AppRouter = React.createClass({
    render: function() {
        return (
            <Router history={history}>
                <div>
                    <nav className={"default-primary-color"}>
                        <div className={"nav-wrapper"} >
                            <a href={"/"} className={"brand-logo"}>RateMyBill</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/about'>About</Link></li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/about" component={AboutPage} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
});


module.exports = AppRouter;