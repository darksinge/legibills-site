import React from 'react';
import {Link} from 'react-router-dom';

const listRoute = "https://ratemybill.com/engine/list/";
const now = new Date();

class ListByYear extends React.Component{
    render() {
        return (
            <div>
                <h5>{this.props.year}</h5>
                {this.props.bills.map((resultB) =>
                    <p> 
                        <Link to={'/bill/' + this.props.year + '/' + resultB.id}><b>{resultB.id}</b></Link>: 
                        {resultB.name}
                    </p>
                )}
            </div>
        );
    }
}

class ListPage extends React.Component {
    constructor() {
        super();
        this.state = {
            billsByYear: [],
            year: now.getFullYear(),

            /**
             * {
             *      id: "123",
             *      name: "name",
             *      description: "desc",
             *      year: 2017
             * }
             */

            billsByYear: [  
                {
                    "year" : 2017,
                    "bills" : [ 
                        { 
                            "id" : "HB001",
                            "name" : "Name of this one"
                        },
                        { 
                            "id" : "HB002",
                            "name" : "Name of the second one"
                        },
                        { 
                            "id" : "HB003",
                            "name" : "Name of the third one"
                        },
                        { 
                            "id" : "HB004",
                            "name" : "Budget Bill"
                        }
                    ]
                },
                {
                    "year" : "Other Years",
                 "bills" : [
                    { "id" : " ",
                      "name" : "Currently None"
                    }
                    ]
                }
            ]
        }
        this.getList();
    }

    getList(event) {
        return fetch(listRoute + this.state.year)
        .then((res) => {
            res.json()
            .then(body => {
                console.log(body);
                var results = [];
                var keys = Object.keys(body);
                console.log("KEYS: ", keys);
                for (var i = 0; i < keys.length; i++) {
                    results.push(body[keys[i]]);
                }
                this.setState({
                    billsByYear: results
                });
            });
        })
        .catch((error) => {
            this.setState({
                error: JSON.stringify(error.body, null, 2)
            });
        });
    }

    render() {
        return (
            <div className="container">
                <h4> List of Bills (by year)</h4>
                {this.state.billsByYear.map((result) =>
                    <ListByYear year={result.year} bills={result.bills} />
                )}
            </div>
        )
    }
}

export default ListPage;