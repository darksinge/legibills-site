
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Cookie from 'react-cookie';

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

var hideLogout = {
    display: "none !important",
    marginLeft: "3000px"
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

    constructor() {
        super();
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.state = {
            userLink: '/login',
            userLinkName: 'Login',
            logoutText: ''
        }
        this.fetchUser = this.fetchUser.bind(this);
        this.showLogout = this.showLogout.bind(this);

        this.fetchUser();
    }

    fetchUser() {
        let jwt_token = Cookie.load('jwt_token');
        if (!jwt_token) {
        return this.setState({
                error: "Cannot authenticate!"
            });
        }
        console.log('Cookie: ', jwt_token)
        var headers = this.headers;
        headers.Authorization = jwt_token;
        fetch('/api/profile', {
            headers: headers
        })
        .then((res) => {
            return res.json();
        })
        .then(user => {
            this.setState({
                user: user,
                userLink: '/profile',
                userLinkName: 'Profile',
                logoutText: 'Logout'
            });
        })
        .catch((err) => {
            if (err.json) {
                err.json().then(err => {
                    console.log(err);
                });
            } else {
                console.log(err);
            }
        });
    }

    logout() {
        Cookie.setCookie('jwt_token', '');
        delete headers.Authorization;
        this.setState({
            user: {},
            userLink: '/login',
            userLinkName: 'Login',
            logoutText: ''
        });
    }

    showLogout() {
        return this.state.userLinkName === 'Profile';
    }

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
                                    <li><Link to={this.state.userLink}>{this.state.userLinkName}</Link></li>
                                    <li><a href="/logout">{this.state.logoutText}</a></li>
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