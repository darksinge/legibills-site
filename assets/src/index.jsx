
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

var history = createBrowserHistory();

import HomePage from './components/HomePage.jsx';
import AboutPage from './components/AboutPage.jsx';
import NotFound from './components/NotFound.jsx';
import LoginPage from './components/LoginPage.jsx';
// import Footer from './components/Footer.jsx';
import SearchPage from './components/SearchPage.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import BillPage from './components/BillPage.jsx';
import ListPage from './components/ListPage.jsx';

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

class AppRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <div className="header">
                    <nav className="">
                        <div className="container">
                            <div className="nav-wrapper" >
                                <a href={"/"} className="brand-logo">RateMyBill</a>
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/search'>Search</Link></li>
                                    <li><Link to='/about'>About</Link></li>
                                    <li><Link to="/list">Bill List</Link></li>
                                    <li><Link to='/login'>Login</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Switch className="main">
                        <Route exact path="/" component={HomePage} />
                        <Route path="/about" component={AboutPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/search" component={SearchPage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route path="/bill" component={BillPage} />
                        <Route path="/list" component={ListPage} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<AppRouter/>, document.getElementById('app'));

export default AppRouter;