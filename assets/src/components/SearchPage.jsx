import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SearchResult extends React.Component {
    render() {
        return (
            <div>
                <Link to={'/bill/' + this.props.id}><h5 className="card-title">{this.props.title}</h5></Link>
                <p><b>description:</b> {this.props.description}</p>
                <div className="divider"></div>
            </div>
        );
    }
}

export class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            query: "Enter search here",
            searchResults: [],
            err: ''
        }
        this.onSearch = this.onSearch.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _handleKeyPress(e) {
        if (e.key == "Enter") {
            this.onSearch(e);
        }
    }

    onSearch(event) {
        return fetch('/api/search?query=' + this.state.query)
        .then((res) => {
            res.json()
            .then(body => {
                console.log(body);
                this.setState({
                    searchResults: body.results
                });
            });
        })
        .catch((error) => {
            this.setState({
                error: JSON.stringify(error.body, null, 2)
            });
        });
    }

    onSearchInputChange(event) {
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
                            <input id="search" type="text" value={this.state.query} onChange={this.onSearchInputChange} />
                            <label htmlFor="search"><i className="sm material-icons">search</i></label>
                        </div>
                        <a className="waves-effect waves-light btn" onClick={this.onSearch} onKeyUp={this._handleKeyPress}>Search</a>
                    </div>
                </div>
                <div className="container">
                    {this.state.searchResults.map((result) =>
                        <SearchResult title={result.title} description={result.description} key={result.id} id={result.id} rank={result.rank} />
                    )}
                </div>
            </div>
        );
    }
}
