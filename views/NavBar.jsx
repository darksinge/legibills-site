
import React, {Component} from 'react';
import {Button, Text} from 'react-native-web';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

var history = createBrowserHistory();

var HomePage = require('./HomePage.jsx');
var AboutPage = require('./AboutPage.jsx');

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

var NavBar = React.createClass({
    render: function() {
        return (
            <Router history={history}>
                <div>
                    <div className={"navbar navbar-default"}>
                        <div className={"container-fluid"}>
                            <div className={"navbar-header"}>
                                {/*<Text className={"navbar-toggle collapsed"}>RateMyBill</Text>*/}
                                <a href={"/"} className={"navbar-brand"}>RateMyBill</a>
                            </div>
                            <div className={"navbar-collapse collapse"}>
                                <ul className={"nav navbar-nav"}>
                                    <li className={"active"}><Link to='/'>Home</Link></li>
                                    <li className={"active"}><Link to='/about'>About</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                </div>
            </Router>
        );
    }
});

module.exports = NavBar;