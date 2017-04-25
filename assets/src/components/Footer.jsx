import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Footer extends Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">About</h5>
                        <p className="grey-text text-lighten-4">
                            Ratemybill.com is a data classification and information retrieval project being developed by students at <a className="green-text" href="https://usu.edu">Utah State University</a>.
                        </p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                        <li><a className="grey-text text-lighten-3" href="https://github.com/darksinge/ratemybill-site">Github repository</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

export default Footer;

ReactDOM.render(<Footer />, document.getElementById("footer"));