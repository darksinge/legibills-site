import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const searchroute = "https://ratemybill.com/engine/search/";

function insertionSort(unsortedList) {  
    var len = unsortedList.length;
    for (var i = 1; i < len; i++) {
        var tmp = unsortedList[i]; //Copy of the current element. 
        /*Check through the sorted part and compare with the number in tmp. If large, shift the number*/
        for (var j = i - 1; j >= 0 && (unsortedList[j] > tmp); j--) {
            //Shift the number
            unsortedList[j + 1] = unsortedList[j];
        }
        //Insert the copied number at the correct position
        //in sorted part. 
        unsortedList[j + 1] = tmp;
    }
    return unsortedList;
}

class SearchResult extends React.Component {
    render() {
        return (
            <div>
                <Link to={'/bill/' + this.props.year + '/' + this.props.id}><h5 className="card-title">{this.props.title}</h5></Link>
                <p><b>description:</b> {this.props.description}</p>
                <div className="divider"></div>
            </div>
        );
    }
}

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            searchResults: [],
            err: ''
        }
        this.onSearch = this.onSearch.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _handleKeyPress(e) {
        if (e.key == "Enter") {
            if (this.state.query === "") {
                this.setState({
                    searchResults: [
                        {
                            bill: "",
                            title: "",
                            name: "Your search returned no results",
                            description: "none",
                            year: 0,
                            id: "",
                            score: 0
                        }
                    ]
                });
            }
            this.onSearch(e);
        }
    }

    onSearch(event) {
        return fetch(searchroute + this.state.query)
        .then((res) => {
            res.json()
            .then(body => {
                var results = []
                Object.keys(body).forEach(function(key) {
                    results.push(body[key])
                });
                results.sort(function(a, b) {
                    return parseFloat(a.tf_idf) < parseFloat(b.tf_idf);
                });
                if (Object.keys(body).length === 0) {
                    results = [
                        {
                            bill: "",
                            title: "",
                            name: "Your search returned no results",
                            description: "none",
                            year: 0,
                            id: "",
                            score: 0
                        }
                    ]
                }
                this.setState({
                    searchResults: results
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
                            <input id="search" type="text" value={this.state.query} onKeyPress={this._handleKeyPress} onChange={this.onSearchInputChange} />
                            <label htmlFor="search"><i className="sm material-icons">search</i></label>
                        </div>
                        <button className="waves-effect waves-light btn" onClick={this.onSearch}>Search</button>
                    </div>
                </div>
                <div className="container">
                    {this.state.searchResults.map((result) =>
                        <SearchResult key={result.bill} title={result.name} description={result.description} year={result.year} id={result.bill} score={result.tf_idf} />
                    )}
                </div>
            </div>
        );
    }
}

export default SearchPage;