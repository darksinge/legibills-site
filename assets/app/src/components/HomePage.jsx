
var path = require('path');
var React = require('react');
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

var tmpImages = {
    first: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQpZK55hgEWDWGK1B-jgB_omDOJDt9fDIWiSKzFtJg90xxUKVsH',
    second: 'http://globalgenes.org/wp-content/uploads/2012/03/capitol_hill_washington_DC_lobbying.jpg',
    third: 'https://i.imgflip.com/1idalc.jpg'
}


var HomePage = React.createClass({
  render: function() {
    return (
    <div>
      <div className="row container">
        <p className="flow-text red-text center-align">This site is in development!</p>
        <p className="red-text center-align">Although we do not store sensitive information, we do not currently guarantee the integrity or persistence of data such as user accounts, comments, or posts.</p>
        <div className="divider"></div>
        <div className="col l9 offset-l3">
          <h1 className="">Welcome to RateMyBill!</h1>
        </div>
        <div className="col l6 offset-l3">
            <p className="flow-text">Ratemybill.com is the demystifier of Utah legislation that allows users to discuss bills, view trends, and voice opinions.</p>
            <p className="flow-text"><Link to="/list"> Click here to view the list of bills </Link></p>
            <Link to="/signup"><span className="waves-effect waves-light btn">Create account</span></Link>
        </div>

      </div>
      <div className="row container">
      <Link to="/bill">
        <div className="col s12 m12 l4">
          <div className="card horizontal hoverable feature-card">
            <div className="card-image">
              <img className="" src={tmpImages.first}></img>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title">Feature 1</span>
                <p className="">This is the first featured bill.</p>
              </div>
            </div>
          </div>
        </div>
        </Link>
        <div className="col s12 m12 l4">
          <div className="card horizontal hoverable feature-card">
            <div className="card-image">
              <img src={tmpImages.second}></img>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title">Feature 2</span>
                <p className="">This is the second featured bill.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 m12 l4">
          <div className="card horizontal hoverable feature-card">
            <div className="card-image">
              <img src={tmpImages.third}></img>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title">Feature 3</span>
                <p className="">This is the third featured bill.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
});

module.exports = HomePage;
