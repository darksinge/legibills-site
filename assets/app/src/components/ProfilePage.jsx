import React from 'react';

class ProfilePage extends React.Component {

    getInitialState() {
        return {
            user: {}
        };
    }

    render() {
        return (
            <div className="container">
                <h1>Hello {this.props.firstname}!</h1>
            </div>
        )
    }
}

export default ProfilePage;