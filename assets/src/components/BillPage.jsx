import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Cookie from 'react-cookie'

const billroute = "https://ratemybill.com/engine/bill_info/";

const fontSize = {
    fontSize: "10pt"
}

const icons = {
    happy: {
        black: '/images/icons/ic_sentiment_very_satisfied_black_36px.svg',
        white: '/images/icons/ic_sentiment_very_satisfied_white_36px.svg'
    },
    neutral: {
        black: '/images/icons/ic_sentiment_neutral_black_36px.svg',
        white: '/images/icons/ic_sentiment_neutral_white_36px.svg'
    },
    sad: {
        black: '/images/icons/ic_sentiment_very_dissatisfied_black_36px.svg',
        white: '/images/icons/ic_sentiment_very_dissatisfied_white_36px.svg'
    }
}

const now = new Date();

class RelatedBills extends React.Component {
    render() {
        return (
              <div className="col s12 m12 l4">
                <div className="card hoverable">
                  <div className="card-stacked">
                    <div className="card-content">
                      <Link target="_self" to={'/bill/' + this.props.year + '/' + this.props.id}><span className="card-title">{this.props.title}</span></Link>
                      <p className="">{this.props.description}</p>
                    </div>
                  </div>
                </div>
              </div>
        );
    }
}

class BillPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billId: "",
            billName: "",
            votes: {
                happy: 0,
                sad: 0,
                neutral: 0
            },
            billLink: "",
            text: "",
            description: "",
            comments: "",
            year: now.getFullYear(),
            relatedBills: [],
            voteErrorMessage: ""
        }

        this.submitVote = this.submitVote.bind(this);
        this.getBill = this.getBill.bind(this);
        this.getBillText = this.getBillText.bind(this);
        this.getRelatedBills = this.getRelatedBills.bind(this);
        this.getVotes = this.getVotes.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.isSelected = this.isSelected.bind(this);

        this.getBill(props);
    }

    getBill(props) {
       let location = props.location.pathname.split('/');
       const year = location[2];
       const name = location[3];
       this.getRelatedBills(year, name);
       this.getVotes(year, name);
       this.getBillText(year, name);
       fetch("https://ratemybill.com/engine/bill_info/" + year + '/' + name)
       .then(res => {
           return res.json();
       })
       .then(body => {
            this.setState({
                billId: body.bill,
                billName: body.name,
                billLink: body.link,
                description: body.description,
                year: body.year
            });
       })
       .catch(err => {
           console.error(err);
       });
   }

   getBillText(year, name){
    fetch("https://ratemybill.com/engine/bill_text/" + year + '/' + name)
       .then(res => {
           return res.json();
       })
       .then(body => {
            var tempText = "";
            Object.keys(body).forEach(function(key) {
                tempText = body[key];
            });
            this.setState({
                text: tempText
            });
       })
       .catch(err => {
           console.error(err);
       });
   }

   getRelatedBills(year, name){
    fetch("https://ratemybill.com/engine/cluster/" + year + '/' + name)
       .then(res => {
           return res.json();
       })
       .then(body => {
            this.setState({
                relatedBills: body.similar
            });
       })
       .catch(err => {
           console.error(err);
       });
   }

    getVotes(year, name){
        fetch("/billinfo/" + year + '/' + name)
        .then(res => {
            return res.json();
        })
        .then(bill => {
            this.setState({
                votes: {
                    happy: bill.upvotes,
                    sad: bill.downvotes,
                    neutral: bill.neutralVotes
                }
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

   submitVote(type) {
       console.log(type);
       fetch('/billinfo/' + type + '/' + this.state.year + '/' + this.state.billId, {
           headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': Cookie.load('jwt_token')
           }
       })
       .then(res => {
           if (res.status === 403) {
                this.setState({
                    voteErrorMessage: "You're not logged in"
                });
                return;
           }
           return res.json();
       })
       .then(bill => {
           this.setState({
                votes: {
                    happy: bill.upvotes,
                    sad: bill.downvotes,
                    neutral: bill.neutralVotes
                },
                selected: type
           });
       })
       .catch(err => {
            console.error(err);
       });
   }

    setFilter(filter) {
        this.setState({
            selected: filter
        });
    }

    isSelected(filter) {
        return filter === this.state.selected ? 'chip green' : 'chip';
    }

    render() {
        return (
            <div className="container">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <h4>{this.state.billId}, {this.state.year}</h4>
                <h5>{this.state.billName}</h5>
                <div className="amber lighten-5 md-padding">
                    <p className="flow-text">{this.state.description}</p>
                </div>
                <a target="_blank" href={this.state.billLink} style={fontSize}>See this bill on the Utah Sate Legislature's web page.</a>
                <div className="container">
                    <span className="flow-text">How do you feel about this bill?</span>
                    <div>
                        <div className={this.isSelected('upvote')}>
                            <img className="btn-floating btn-flat waves-effect waves-light" src={icons.happy.black} onClick={()=>this.submitVote("upvote")} />
                            {this.state.votes.happy}
                        </div>
                        <div className={this.isSelected('neutralvote')}>
                            <img className="btn-floating btn-flat waves-effect waves-light" src={icons.neutral.black} onClick={()=>this.submitVote("neutralvote")} />
                            {this.state.votes.neutral}
                        </div>
                        <div className={this.isSelected('downvote')}>
                            <img className="btn-floating btn-flat waves-effect waves-light" src={icons.sad.black} onClick={()=>this.submitVote("downvote")} />
                            {this.state.votes.sad}
                        </div>
                        <span className="red-text">{this.state.voteErrorMessage}</span>
                    </div>
                </div>

                {/*<div className="content" dangerouslySetInnerHTML={{__html: this.state.text}} />*/}

                <p className={"flow-text"}>{this.state.comments}</p>
                <h5>Related Bills</h5>
                <div className="divider"></div>
                <div>
                    {this.state.relatedBills.map((result) =>
                        <RelatedBills key={result.name} title={result.name} description={result.description} year={result.year} id={result.bill} />
                    )}
                </div>
                
            </div>
        )
    }
}

export default BillPage;