import React from 'react';

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
        fetch('/api/profile', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
          res.json().then(body => {
                console.log(body);
                this.setState({
                    user: body
                });
            });
        })
        .catch((error) => {
            error.json().then(body => {
                console.log(body);
                this.setState({
                    error: body
                });
            });
        });
    }

    componentDidMount() {
        this.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <h1>Hello {this.state.user.firstname}!</h1>
                <p className="red-text">Error: {this.state.error}</p>
            </div>
        )
    }
}

export default ProfilePage;