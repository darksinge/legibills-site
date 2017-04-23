import React from 'react';

const billroute = "https://ratemybill.com/engine/bill_info/";

const fontSize = {
    fontSize: "10pt"
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
            bComments: "This is where comments will go.",
            year: 2017
        }
        this.addHappyVote = this.addHappyVote.bind(this);
        this.addMehVote = this.addMehVote.bind(this);
        this.addAngryVote = this.addAngryVote.bind(this);
        this.unclickButtons = this.unclickButtons.bind(this);

        this.getBill(props);
    }

    addHappyVote(event){
        this.unclickButtons();
        document.getElementById("happyBtn").className = "btn-floating waves-effect waves-light btn-flat black";
    }

    addMehVote(event){
        this.unclickButtons();
        document.getElementById("mehBtn").className = "btn-floating waves-effect waves-light btn-flat black";
    }

    addAngryVote(event){
        this.unclickButtons();
        document.getElementById("angryBtn").className = "btn-floating waves-effect waves-light btn-flat black";
    }

    unclickButtons(){
        // if button is clicked, unclick and decrease vote count
        if(document.getElementById("happyBtn").className == "btn-floating waves-effect waves-light btn-flat black"){
           // decrease vote count
           document.getElementById("happyBtn").className = "btn-floating waves-effect waves-light btn-flat";
        } else if (document.getElementById("mehBtn").className == "btn-floating waves-effect waves-light btn-flat black"){
            // decrease vote count
            document.getElementById("mehBtn").className = "btn-floating waves-effect waves-light btn-flat";
        } else if (document.getElementById("angryBtn").className == "btn-floating waves-effect waves-light btn-flat black"){
            // decrease vote count
            document.getElementById("angryBtn").className = "btn-floating waves-effect waves-light btn-flat";
        }
    }

    getBill(props) {
       let location = props.location.pathname.split('/');
       const year = location[2];
       const billId = location[3];
       return fetch("https://ratemybill.com/engine/bill_info/" + year + '/' + billId)
       .then(res => {
           return res.json();
       })
       .then(body => {
            this.setState({
                bId: body.bill,
                bName: body.name,
                bLink: body.link,
                bText: body.description,
                year: body.year
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
                <div>
                    <p className="flow-text">How do you feel about this bill?</p>
                    <p className="flow-text" >
                    <a id="happyBtn" className="btn-floating waves-effect waves-light btn-flat" onClick={this.addHappyVote}>😊</a>
                    <a id="mehBtn" className="btn-floating waves-effect waves-light btn-flat" onClick={this.addMehVote}>😕</a>
                    <a id="angryBtn" className="btn-floating waves-effect waves-light btn-flat" onClick={this.addAngryVote}>😠</a></p>
                    <div id="votesDV"> 
                        <p style={fontSize}> This is how other users felt: 
                        😊 {this.state.bVotes[0]} &nbsp;&nbsp; 
                        😕 {this.state.bVotes[1]} &nbsp;&nbsp; 
                        😠 {this.state.bVotes[2]}
                        </p>
                    </div>
                </div>
                <p className={"flow-text"}>
                    <a target="_blank" href={this.state.bLink}>
                    <font size="3">
                        See this bill on the Utah Sate Legislature's web page.
                    </font>
                    </a>
                </p>
                <p className={"z-depth-2"} >{this.state.bText}</p>
                <p className={"flow-text"}>{this.state.bComments}</p>
            </div>
        )
    }
}

export default BillPage;