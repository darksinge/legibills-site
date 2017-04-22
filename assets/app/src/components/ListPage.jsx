import React from 'react';
import {Link} from 'react-router-dom';

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
            //This is just an example. We could pull in the bills like this and then populate a list.
            billsByYear: [  {"year" : 2017,
                            "bills" :[ 
                                { "id" : "HB001",
                                  "name" : "Name of this one"
                                },
                                { "id" : "HB002",
                                  "name" : "Name of the second one"
                                },
                                { "id" : "HB003",
                                  "name" : "Name of the third one"
                                },
                                { "id" : "HB004",
                                  "name" : "Budget Bill"
                                }]
                            },
                            {"year" : "Other Years",
                             "bills" : [
                                { "id" : " ",
                                  "name" : "Currently None"
                                }]
                            }
                        ]
        }
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