import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
        super()
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
            relatedBills: []
        }
        this.addHappyVote = this.addHappyVote.bind(this);
        this.addMehVote = this.addMehVote.bind(this);
        this.addAngryVote = this.addAngryVote.bind(this);
        this.getBill = this.getBill.bind(this);

        this.updateVotes = this.updateVotes.bind(this);
        this.isActive = this.isActive.bind(this);
        this.isSelected = this.isSelected.bind(this);

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
                happy: body.happyVotes || 0,
                sad: body.angryVotes || 0,
                neutral: body.mehVotes || 0
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
                    happy: body.happyVotes || 0,
                    sad: body.angryVotes || 0,
                    nuetral: body.mehVotes || 0
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
        } else if (filter === 'sad') {
            this.addAngryVote();
        } else if (filter === 'neutral') {
            this.addMehVote();
        }
    }

    isActive(filter) {
        return "btn-floating btn-flat waves-effect waves-light " + ((filter === this.state.selected) ? ' green' : '');
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
                        <div className={this.isSelected('happy')}>
                            <img className={this.isActive('happy')} src={icons.happy.black} onClick={this.setFilter.bind(this, 'happy')} />
                            {this.state.votes.happy}
                        </div>
                        <div className={this.isSelected('neutral')}>
                            <img className={this.isActive('neutral')} src={icons.neutral.black} onClick={this.setFilter.bind(this, 'neutral')} />
                            {this.state.votes.neutral}
                        </div>
                        <div className={this.isSelected('sad')}>
                            <img className={this.isActive('sad')} src={icons.sad.black} onClick={this.setFilter.bind(this, 'sad')} />
                            {this.state.votes.sad}
                        </div>
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