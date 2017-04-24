
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
            <Link to="/login"><span className="waves-effect waves-light btn">Create account</span></Link>
        </div>

      </div>
      <div className="row container">
      <Link to="/bill/2017/HB0442">
        <div className="col s12 m12 l4">
          <div className="card horizontal hoverable feature-card">
            <div className="card-image">
              <img className="" src={tmpImages.first}></img>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title">Alcohol Amendments</span>
                <p className="">This bill modifies provisions related to the regulation of alcoholic beverages.</p>
              </div>
            </div>
          </div>
        </div>
        </Link>
        <Link to="/bill/2017/HB0098">
          <div className="col s12 m12 l4">
            <div className="card horizontal hoverable feature-card">
              <div className="card-image">
                <img src={tmpImages.second}></img>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <span className="card-title">Department Of Administrative Services</span>
                  <p className="">Bill modifies and repeals provisions related to the Department of Administrative Services and funds administered by the Division of Finance.</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/bill/2017/HB0239">
          <div className="col s12 m12 l4">
            <div className="card horizontal hoverable feature-card">
              <div className="card-image">
                <img src={tmpImages.third}></img>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <span className="card-title">Juvenile Justice Amendments</span>
                  <p className="">Bill modifies provisions related to juvenile justice.</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
    );
  }
});

module.exports = HomePage;
