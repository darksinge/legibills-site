
var path = require('path');
var React = require('react');
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

var HomePage = React.createClass({
  render: function() {
    return (
    <div className={"container"}>
      <div>
        <h1>Welcome to RateMyBill!</h1>
        <h4>Welcome to the future landing page of a really sweet project where you'll be able to discuss current (and past) legislation being reviewed by the state of Utah.</h4>
        <p className={"flow-text"}>If you really feel the need, you can <a href="https://github.com/darksinge/ratemybill-site">view the source code of this website on github</a>.</p>
        <p className={"flow-text"}>Additionally, the <a href="https://github.com/darksinge/IR-legislation-cs4320_sp17">source code for our data collection and algorithms</a> is also hosted on <a href="https://github.com">github</a>.</p>
      </div>
      <div>
        <p className="flow-text"><Link to="/foo">Click here to test a broken link</Link></p>
      </div>
    </div>
    );
  }
});

module.exports = HomePage;
