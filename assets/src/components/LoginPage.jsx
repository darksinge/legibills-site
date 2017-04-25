import React, {Component} from 'react';
import {Link} from 'react-router-dom';

var authRoute = process.env.NODE_ENV === 'development' ? "http://localhost:1337/oauth/facebook" : 'https://ratemybill.com/oauth/facebook';

class LoginPage extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m8 l6 offset-l3 offset-m2">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Sign In</span>
                                <div className="input-field">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="text" className="validate" />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <input id="password" type="password" className="validate" />
                                </div>
                            </div>
                            <div className="card-action">
                                <Link to="/local/auth"><span className="waves-effect waves-light btn">Sign In</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m3 l3 offset-l6 offset-m6">
                        <a className="btn waves-effect waves-light" href="/oauth/facebook">Log In With Facebook</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
