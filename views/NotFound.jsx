import React from 'react';

var NotFound = React.createClass({
    render() {
        return(
            <div>
                <h1>404 Page Not Found</h1>
                <p className="flow-text">This is not the page you are looking for...</p>
            </div>
        )
    }
});

module.exports = NotFound;