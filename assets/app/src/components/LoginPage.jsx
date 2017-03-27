import React, {Component} from 'react';
import {Link} from 'react-router-dom';

var LoginPage = React.createClass({
    render: () => {
        return (
            <div className="container"> 
                <div className="row">
                    <div className="col s12 m8 l6 offset-l3 offset-m2">
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">Sign In</span>
                                <div className="input-field">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="text" className="validate"></input>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <input id="password" type="password" className="validate"></input>
                                </div>
                            </div>
                            <div className="card-action">
                                <Link to="/local/auth"><span className="waves-effect waves-light btn">Sign In</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginPage;