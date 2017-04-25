import React from 'react';
import {Link} from 'react-router-dom';

const billroute = "https://ratemybill.com/engine/bill_info/";

const fontSize = {
    fontSize: "10pt"
}

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

class BillPage extends React.Component {
    constructor(props) {
        super()
        this.state = {
            bId: "HB000",
            bName: "Bill Name",
            bVotes: [2,1,5],
            bLink: "https://le.utah.gov/~2017/bills/static/HB0001.html",
            bText: "This is where bill text will be.",
            bDesc: "This is the bill's description",
            bComments: "This is where comments will go.",
            year: 2017,
            relatedBills: []
        }
        this.addHappyVote = this.addHappyVote.bind(this);
        this.addMehVote = this.addMehVote.bind(this);
        this.addAngryVote = this.addAngryVote.bind(this);
        this.unclickButtons = this.unclickButtons.bind(this);
        this.getBill = this.getBill.bind(this);

        this.getBill(props);
    }

    addHappyVote(event){
        this.unclickButtons();
        this.updateVotes(this.state.year, this.state.bId, "happy");
        document.getElementById("happyBtn").className = "waves-effect waves-light btn-flat black";
    }

    addMehVote(event){
        this.unclickButtons();
        this.updateVotes(this.state.year, this.state.bId, "meh");
        document.getElementById("mehBtn").className = "waves-effect waves-light btn-flat black";
    }

    addAngryVote(event){
        this.unclickButtons();
        this.updateVotes(this.state.year, this.state.bId, "angry");
        document.getElementById("angryBtn").className = "waves-effect waves-light btn-flat black";
    }

    unclickButtons(){
        // if button is clicked, unclick and decrease vote count
        if(document.getElementById("happyBtn").className == "waves-effect waves-light btn-flat black"){
           // this.updateDownVotes(this.state.year, this.state.bId, "happy");
           document.getElementById("happyBtn").className = "waves-effect waves-light btn-flat";
        } else if (document.getElementById("mehBtn").className == "waves-effect waves-light btn-flat black"){
            // this.updateDownVotes(this.state.year, this.state.bId, "meh");
            document.getElementById("mehBtn").className = "waves-effect waves-light btn-flat";
        } else if (document.getElementById("angryBtn").className == "waves-effect waves-light btn-flat black"){
            // this.updateDownVotes(this.state.year, this.state.bId, "angry");
            document.getElementById("angryBtn").className = "waves-effect waves-light btn-flat";
        }
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
                bId: body.bill,
                bName: body.name,
                bLink: body.link,
                bDesc: body.description,
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
                bText: tempText
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
            var tempArray = [body.happyVotes, body.mehVotes, body.angryVotes];
            this.setState({
                bVotes: tempArray
            });
       })
       .catch(err => {
           console.error(err);
       });
   }

   updateVotes(year, billId, voteType){
   console.log("increase votes " + voteType);
    return fetch("/billinfo/vote/" + year + '/' + billId + '/' + voteType)
        .then(res => {
           return res.json();
       })
       .then(body => {
            var tempArray = [body.happyVotes, body.mehVotes, body.angryVotes];
            console.log(tempArray);
            this.setState({
                bVotes: tempArray
            });
       })
       .catch(err => {
           console.error(err);
       });
   }

   updateDownVotes(year, billId, voteType){
    console.log("decrease votes " + voteType);
    return fetch("/billinfo/decreasevote/" + year + '/' + billId + '/' + voteType)
        .then(res => {
           return res.json();
       })
       .then(body => {
            var tempArray = [body.happyVotes, body.mehVotes, body.angryVotes];
            console.log(tempArray);
            this.setState({
                bVotes: tempArray
            });
       })
       .catch(err => {
           console.error(err);
       });
   }

    render() {
        return (
            <div className="container">
                <h4>{this.state.bId}</h4>
                <h5>{this.state.bName}</h5>
                <h6>{this.state.year}</h6>
                <h6>{this.state.bDesc}</h6>
                <a target="_blank" href={this.state.bLink}>
                <font size="3">
                    See this bill on the Utah Sate Legislature's web page.
                </font>
                </a>
                <div className="container">
                    <p className="flow-text">How do you feel about this bill?
                    <a id="happyBtn" className="waves-effect waves-light btn-flat" onClick={this.addHappyVote}>😊</a>
                    <a id="mehBtn" className="waves-effect waves-light btn-flat" onClick={this.addMehVote}>😕</a>
                    <a id="angryBtn" className="waves-effect waves-light btn-flat" onClick={this.addAngryVote}>😠</a></p>
                    <p style={fontSize}> This is how our users feel: 
                        😊 {this.state.bVotes[0]} &nbsp;&nbsp; 
                        😕 {this.state.bVotes[1]} &nbsp;&nbsp; 
                        😠 {this.state.bVotes[2]}
                    </p>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: this.state.bText}}></div>
                <p className={"flow-text"}>{this.state.bComments}</p>
                <h5>Related Bills</h5>
                <div className="divider"></div>
                <div>
                    {this.state.relatedBills.map((result) =>
                        <RelatedBills title={result.name} description={result.description} year={result.year} id={result.bill} />
                    )}
                </div>
            </div>
        )
    }
}

export default BillPage;