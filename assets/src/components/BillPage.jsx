import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const billroute = "https://ratemybill.com/engine/bill_info/";

const fontSize = {
    fontSize: "10pt"
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
        super()
        this.state = {
            billId: "",
            billName: "",
            votes: {
                upVotes: 0,
                downVotes: 0,
                mehVotes: 0
            },
            billLink: "",
            text: "",
            description: "",
            comments: "",
            year: now.getFullYear(),
            relatedBills: []
        }
        this.addHappyVote = this.addHappyVote.bind(this);
        this.addMehVote = this.addMehVote.bind(this);
        this.addAngryVote = this.addAngryVote.bind(this);
        this.getBill = this.getBill.bind(this);

        this.updateVotes = this.updateVotes.bind(this);
        this.isActive = this.isActive.bind(this);

        this.getBill(props);
    }

    addHappyVote(event){
        this.updateVotes(this.state.year, this.state.billId, "happy");
    }

    addMehVote(event){
        this.updateVotes(this.state.year, this.state.billId, "meh");
    }

    addAngryVote(event){
        this.updateVotes(this.state.year, this.state.billId, "angry");
    }

    getBill(props) {
       let location = props.location.pathname.split('/');
       const year = location[2];
       const billId = location[3];
       this.getRelatedBills(year, billId);
       this.getVotes(year, billId);
       this.getBillText(year, billId);
       return fetch("https://ratemybill.com/engine/bill_info/" + year + '/' + billId)
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

   getBillText(year, billId){
    return fetch("https://ratemybill.com/engine/bill_text/" + year + '/' + billId)
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

   getRelatedBills(year, billId){
    return fetch("https://ratemybill.com/engine/cluster/" + year + '/' + billId)
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

   getVotes(year, billId){
    return fetch("/billinfo/" + year + '/' + billId)
        .then(res => {
           return res.json();
       })
       .then(body => {
            this.setState({
                votes: {
                    upVotes: body.happyVotes,
                    downVotes: body.angryVotes,
                    mehVotes: body.mehVotes
                }
            });
       })
       .catch(err => {
           console.error(err);
       });
   }

   updateVotes(year, billId, voteType){
    
    return fetch("/billinfo/vote/" + year + '/' + billId + '/' + voteType)
        .then(res => {
           return res.json();
       })
       .then(body => {
            this.setState({
                votes: {
                    upVotes: body.happyVotes,
                    downVotes: body.angryVotes,
                    mehVotes: body.mehVotes
                }
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
        if (filter === 'happy') {
            this.addHappyVote();
        } else if (filter === 'angry') {
            this.addAngryVote();
        } else if (filter === 'meh') {
            this.addMehVote();
        }
    }

    isActive(filter) {
        return "btn-flat btn-floating waves-effect waves-light " + ((filter === this.state.selected) ? ' green darken-3' : ' red lighten-1 ');
    }

    render() {
        return (
            <div className="container">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <h4>{this.state.billId}</h4>
                <h5>{this.state.billName}</h5>
                <h6>{this.state.year}</h6>
                <p className="flow-text">{this.state.description}</p>
                <a target="_blank" href={this.state.billLink} style={fontSize}>See this bill on the Utah Sate Legislature's web page.</a>
                <div className="container">
                    <span className="flow-text">How do you feel about this bill?</span>
                    <a className={this.isActive('happy')} onClick={this.setFilter.bind(this, 'happy')}><i className="material-icons">sentiment_very_satisfied</i></a>
                    <a className={this.isActive('meh')} onClick={this.setFilter.bind(this, 'meh')}><i className="material-icons">sentiment_neutral</i></a>
                    <a className={this.isActive('angry')} onClick={this.setFilter.bind(this, 'angry')}><i className="material-icons">sentiment_very_dissatisfied</i> </a>
                    <p style={fontSize}> This is how our users feel:</p>
                    <span><i className="material-icons">sentiment_very_satisfied</i> {this.state.votes.upVotes}</span>
                    <span><i className="material-icons">sentiment_neutral</i> {this.state.votes.upVotes}</span>
                    <span><i className="material-icons">sentiment_very_dissatisfied</i> {this.state.votes.downVotes}</span>
                </div>

                <div className="content" dangerouslySetInnerHTML={{__html: this.state.text}} />

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