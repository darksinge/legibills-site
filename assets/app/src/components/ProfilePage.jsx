import React from 'react';
import Cookie from 'react-cookie';

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
            error: ''
        }
        this.fetchUser = this.fetchUser.bind(this);
    }

    fetchUser() {
        var jwt_token = Cookie.load('jwt_token');
        if (!jwt_token) {
            return this.setState({
                error: "Cannot authenticate!"
            });
        }
        fetch('/api/profile?jwt=' + jwt_token, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
          res.json().then(body => {
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

    componentDidMount() {
        this.fetchUser();
    }

    

    render() {
        var style = {
            inputBorder: {
                border: "1px solid gray",
                "padding-left": "8px" 
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
                                    <input style={style.inputBorder} type="text" id="firstname" value={this.state.user.firstname} />
                                </div>
                                <b>Last Name</b>
                                <div className="input-field ">
                                    <label htmlFor="lastname" />
                                    <input style={style.inputBorder} type="text" id="lastname" value={this.state.user.lastname} />
                                </div>
                                <b>Username</b>
                                <div className="input-field ">
                                    <label htmlFor="username" />
                                    <input style={style.inputBorder} type="text" id="username" value={this.state.user.username} />
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