
import React, {Component} from 'react';
import {Button, Text} from 'react-native-web';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

var history = createBrowserHistory();

import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import NotFound from './NotFound.jsx';
import LoginPage from './LoginPage.jsx';
import Footer from './Footer.jsx';
import SearchPage from './SearchPage.jsx';

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
                <div className="header">
                    <nav className="">
                        <div className="container">
                            <div className="nav-wrapper" >
                                <a href={"/"} className="brand-logo">RateMyBill</a>
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><Link to='/' className="">Home</Link></li>
                                    <li><Link to='/search' className="">Search</Link></li>
                                    <li><Link to='/about' className="">About</Link></li>
                                    <li><Link to='/login' className="">Login</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Switch className="main">
                        <Route exact path="/" component={HomePage} />
                        <Route path="/about" component={AboutPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/search" component={SearchPage} />
                        <Route component={NotFound} />
                    </Switch>
                    {/*<Footer className="page-footer" />*/}
                </div>
            </Router>
        );
    }
});


module.exports = AppRouter;