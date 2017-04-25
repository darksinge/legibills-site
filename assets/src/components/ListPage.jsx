import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import billsJson from '../dev/billsJson';


const listRoute = "https://ratemybill.com/engine/list/";
const now = new Date();
const perPage = 20;

class BillList extends Component {
    render() {
        return (
            <div id="bill-list">
                <ul>
                    {this.props.bills.map((bill, index) => 
                        <li key={index}><Link to={'/bill/' + now.getFullYear() + '/' + bill.bill}>{bill.name}</Link></li>
                    )}
                </ul>
            </div>
        );
    }
};

class ListPage extends Component {
    constructor() {

        super();
        
        this.state = {
            data: [],
            bills: billsJson,
            offset: 0,
            year: now.getFullYear()
        }

        this.getBillListFromServer = this.getBillListFromServer.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);

        this.getBillListFromServer();
    }

    getBillListFromServer(event) {
        return fetch(listRoute + this.state.year)
        .then((res) => {
            return res.json();
            
        })
        .then(body => {
            var bills = [];
            var keys = Object.keys(body);
            for (var i = 0; i < keys.length; i++) {
                bills.push(body[keys[i]]);
            }
            var data = bills.slice(0, perPage);
            this.setState({
                data: data,
                bills: bills,
                pageCount: Math.ceil(bills.length / perPage)
            });
        })
        .catch((err) => {
            if (err.toString) err = err.toString();
            this.setState({
                bills: billsJson,
                data: billsJson.slice(0, perPage),
                pageCount: Math.ceil(this.state.bills.length/perPage)
            });
            console.error(err);
        });
    }

    handlePageClick(ev) {
        let selected = ev.selected;
        let offset = Math.ceil(selected * perPage);

        this.setState({
            data: this.state.bills.slice(offset, offset+perPage)
        });
    };

    render() {
        return (
            <div className="container">
                <h4>List of {this.state.year} Bills</h4>
                <div className="">
                    <BillList bills={this.state.data} />
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

export default ListPage;