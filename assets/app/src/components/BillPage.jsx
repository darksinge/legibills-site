import React from 'react';

class BillPage extends React.Component {
    constructor() {
        super()
        this.state = {
            bName: "Bill Name",
            bInfo: "This is bill header info (like who wrote it, who voted on it, etc...)",
            bVotes: "This is user votes.",
            bText: "This is where bill text will be.",
            bComments: "This is where comments will go."
        }
    }

    render() {
        return (
            <div className="container">
                <h4>{this.state.bName}</h4>
                <p className={"flow-text"}>{this.state.bInfo}</p>
                <p className={"flow-text"}>{this.state.bVotes}</p>
                <p className={"flow-text"}>{this.state.bText}</p>
                <p className={"flow-text"}>{this.state.bComments}</p>
            </div>
        )
    }
}

export default BillPage;