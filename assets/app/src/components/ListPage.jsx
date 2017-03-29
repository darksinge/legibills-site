import React from 'react';

class ListPage extends React.Component {
    constructor() {
        super()
        this.state = {
            //This is just an example. We could pull in the bills like this and then populate a list.
            billsByYear: {2017:["HB001", "HB002", "HB003", "HB004"], "Other Years":["Currently None"]}
        }
    }

    render() {
        return (
            <div className="container">
                <h4> List of Bills (by year)</h4>
                <h5> 2017 </h5>
                <ul>
                    <li><a href="/bill">HB001</a> Bill info here</li>
                    <li><a href="/bill">HB002</a> Bill info here</li>
                    <li><a href="/bill">HB003</a> Bill info here</li>
                    <li><a href="/bill">HB004</a> Bill info here</li>
                </ul>
                <h5> Other Years </h5>
                <ul>
                    <li> None Yet </li>
                </ul>
            </div>
        )
    }
}

export default ListPage;