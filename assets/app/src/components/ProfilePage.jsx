import React from 'react';
import Cookie from 'react-cookie';

var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

class ProfilePage extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                id: '',
                username: ''
            },
            error: '',
            successText: ''
        }
        this.fetchUser = this.fetchUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    fetchUser() {
        var jwt_token = Cookie.load('jwt_token');
        if (!jwt_token) {
            return this.setState({
                error: "Cannot authenticate!"
            });
        }
        fetch('/api/profile?jwt=' + jwt_token, {
            headers: headers
        })
        .then((res) => {
          res.json().then(body => {
              console.log(body.user);
                this.setState({
                    user: body.user
                });
            });
        })
        .catch((error) => {
            error.json().then(body => {
                console.log(body);
                this.setState({
                    error: body.error || body
                });
            });
        });
    }

    updateProfile() {
        var user = this.state.user;
        var params = '?username=' + user.username + '&firstname=' + user.firstname + '&lastname=' + user.lastname;
        fetch('/user/' + this.state.user.id + params, {
            method: 'PUT',
            headers: headers
        })
        .then((res) => {
            res.json().then(body => {
                this.setState({
                    successText: "Profile updated!"
                });
            });
        })
        .catch(err => {
            err.json().then(errJSON => {
                console.error(errJSON);
                this.setState({
                    error: err.error || err
                });
            });
        });
    }

    componentDidMount() {
        this.fetchUser();
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        var user = this.state.user;
        if (name == 'firstname') user.firstname = value;
        if (name == 'lastname') user.lastname = value;
        if (name == 'username') user.username = value;
        this.setState({
            user: user
        });
    }

    render() {
        var style = {
            inputBorder: {
                border: "1px solid gray",
                paddingLeft: "8px" 
            },
            successText: {
                display: "inline"
            }
        }
        return (
            <div>
                <div className="container">
                    <p className="red-text center-align">{this.state.error}</p>
                </div>
                <div className="row">
                    <div className="col s12 m6 l4 offset-m3 offset-l4">
                        <h3>My Profile</h3>
                        <div className="card">
                            <div className="card-content">
                                <b>First Name</b>
                                <div className="input-field ">
                                    <label htmlFor="firstname" />
                                    <input 
                                    style={style.inputBorder} 
                                    name="firstname"
                                    type="text"
                                    value={this.state.user.firstname} 
                                    onChange={this.handleChange}/>
                                </div>
                                <b>Last Name</b>
                                <div className="input-field ">
                                    <label htmlFor="lastname" />
                                    <input 
                                    style={style.inputBorder} 
                                    type="text" 
                                    name="lastname" 
                                    value={this.state.user.lastname} 
                                    onChange={this.handleChange}/>
                                </div>
                                <b>Username</b>
                                <div className="input-field ">
                                    <label htmlFor="username" />
                                    <input 
                                    style={style.inputBorder} 
                                    type="text" 
                                    name="username" 
                                    value={this.state.user.username} 
                                    onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="row">
                                    <div className="col s6">
                                        <a className="waves-effect waves-light btn" onClick={this.updateProfile}>Save Changes</a>
                                    </div>
                                    <div className="col s6">
                                        <p style={style.successText} className="green-text flow-text right-align">{this.state.successText}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ProfilePage;