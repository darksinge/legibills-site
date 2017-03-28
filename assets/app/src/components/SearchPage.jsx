import React, {Component} from 'react';
import Request from 'react-http-request';

class SearchPage extends React.Component {
    constructor() {
        super()
        this.state = {
            query: "events",
            searchResults: "Search results appear here..."
        }
        this.onSearch = this.onSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSearch(event) {
        return fetch('https://api.shingo.org/salesforce/' + this.state.query + '?publish_to_web=true')
        .then((res) => {
            res.json()
            .then(body => {
                console.log(body);
                this.setState({
                    searchResults: JSON.stringify(body)
                });
            });
        })
        .catch((error) => {
            this.setState({
                searchResults: JSON.stringify(error.body, null, 2)
            });
        });
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    render() {
        return (
            <div className="container">
                <header className="header center-align">
                    <h3>Search All The Bills!</h3>
                </header>
                <div className="row">
                    <div className="col s12 m9 offset-m3 l8 offset-l2">                            
                        <div className="input-field">
                            <input id="search" type="text" value={this.state.query} onChange={this.handleChange} />
                            <label htmlFor="search"><i className="sm material-icons">search</i></label>
                        </div>
                        <a className="waves-effect waves-light btn" onClick={this.onSearch}>Search</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m9 offset-m3 l8 offset-l2">
                        <code>{this.state.searchResults}</code>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPage;