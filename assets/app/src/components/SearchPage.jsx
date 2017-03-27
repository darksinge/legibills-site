import React, {Component} from 'react';


class SearchResults extends React.Component {
    render() {
        return(
            <p className="flow-text">Search results appear here...</p>
        )
    }
}

class SearchPage extends React.Component {
    render() {
        return (
            <div className="container">
                <header className="header center-align">
                    <h3>Search All The Bills!</h3>
                </header>
                <div className="row">
                    <div className="col s12 m9 offset-m3 l8 offset-l2">                            
                        <div className="input-field">
                            <input id="search" type="text" />
                            <label htmlFor="search"><i className="sm material-icons">search</i></label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m9 offset-m3 l8 offset-l2">
                        <SearchResults />
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPage;