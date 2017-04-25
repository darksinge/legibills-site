import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const listRoute = "https://ratemybill.com/engine/list/";
const now = new Date();
const perPage = 20;

class BillList extends Component {
    render() {
        let billNodes = this.props.bills.map((bill, index) => {
            return (
                <li key={index}>{bill.name}</li>
            );
        });

        return (
            <div id="bill-list">
                <ul>
                    {billNodes}
                </ul>
            </div>
        );
    }
};

export class ListPage extends Component {
    constructor(props) {
        super(props);

        var billsJson = '[{"year":"2017","description":"Rules resolution creates and amends committee rules for the Joint Appropriations Committee, the joint appropriations subcommittees, and the Executive Appropriations Committee","name":"Joint Rules Resolution Creating And Amending","bill":"HJR015","link":"http://le.utah.gov/~2017/bills/static/HJR015.html","tf_idf":0.24397730798729736},{"year":"2017","description":"Bill amends provisions of the Election Code relating to inactive voters","name":"Inactive Voter Amendments","bill":"HB0086","link":"http://le.utah.gov/~2017/bills/static/HB0086.html","tf_idf":0.011010572140886334},{"description":"Bill permits a student to carry and use sunscreen at a public school","name":"School Sunscreen Provision","link":"http://le.utah.gov/~2017/bills/static/HB0288.html","bill":"HB0288","year":"2017"},{"description":"Bill modifies regulations regarding solid fuel burning","name":"Air Conservation Act Amendments","link":"http://le.utah.gov/~2017/bills/static/HB0065.html","bill":"HB0065","year":"2017"},{"year":"2017","description":"Bill modifies criminal trespass provisions","name":"Trespass Amendments","bill":"HB0202","link":"http://le.utah.gov/~2017/bills/static/HB0202.html","tf_idf":0.03684508228183808},{"year":"2017","description":"Bill amends provisions relating to conduct that impedes or blocks traffic","name":"Pedestrian Safety Amendments","bill":"HB0161","link":"http://le.utah.gov/~2017/bills/static/HB0161.html","tf_idf":0.01952742532321779},{"year":"2017","description":"Bill modifies tax credit provisions related to enterprise zones","name":"Targeted Business Income Tax Credit Revisions","bill":"HB0416","link":"http://le.utah.gov/~2017/bills/static/HB0416.html","tf_idf":0.009161215623417962},{"year":"2017","description":"Bill addresses sibling visitation for children in the custody of the Division of Child and Family Services","name":"Foster Children Visitation Amendments","bill":"HB0145","link":"http://le.utah.gov/~2017/bills/static/HB0145.html","tf_idf":0.006839836851925209},{"description":"Bill prohibits government officers or employees from making personal purchases with public funds","name":"Government Employees Reimbursement Amendments","link":"http://le.utah.gov/~2017/bills/static/HB0431.html","bill":"HB0431","year":"2017"},{"year":"2017","description":"Bill appropriates funds for the support and operation of state government for the fiscal year beginning July 1, 20 and ending June 30, 20 ","name":"Business, Economic Development, And Labor Base Budget","bill":"HB0004","link":"http://le.utah.gov/~2017/bills/static/HB0004.html","tf_idf":0.011798576259153794}]'
        var _bills = JSON.parse(billsJson);
        
        this.state = {
            data: _bills,
            offset: 0,
            year: now.getFullYear(),
            pageCount: 0
        }

        this.getBillListFromServer = this.getBillListFromServer.bind(this);
        this.paginationRangeUpdate = this.paginationRangeUpdate.bind(this);

        // this.getBillListFromServer();
    }

    getBillListFromServer(event) {
        return fetch(listRoute + this.state.year)
        .then((res) => {
            res.json()
            .then(body => {
                var bills = [];
                var keys = Object.keys(body);
                for (var i = 0; i < keys.length; i++) {
                    bills.push(body[keys[i]]);
                }
                this.setState({
                    data: bills
                });
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    paginationRangeUpdate() {
        
    }

    handlePageClick(event) {
        console.log("clicked something!");
        let selected = event.selected;
        let offset = Math.ceil(selected * this.props.perPage);-

        this.setState({
            offset: offset
        }, () => {
            this.updatePaginationRange();
        });
    };

    render() {
        return (
            <div className="container">
                <h4>List of {this.state.year} Bills</h4>
                <p>Does this work?</p>
                <div className="commentBox">
                    <ul>
                    {this.state.data.map((data) => 
                        <li key={data.bill}><Link key={data.bill} to={'/'}>{data.name}</Link></li>
                    )}
                    </ul>
                    <ReactPaginate  previousLabel={"previous"}
                                    nextLabel={"next"}
                                    breakLabel={<a href="">...</a>}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                </div>

            </div>
        )
    }
}