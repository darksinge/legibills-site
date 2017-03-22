
var path = require('path');
var React = require('react');

var HomePage = React.createClass({
  render: function() {
    return (
    <div className={"page-wrapper"}>
      <div className={"container"}>
        <h1 className={"page-header"}>Welcome to RateMyBill!</h1>
        <h3>Welcome to the future landing page of a really sweet project where you'll be able to discuss current (and past) legislation being reviewed by the state of Utah.</h3>
        <p className={"lead"}>If you really feel the need, you can <a href="https://github.com/darksinge/ratemybill-site">view the source code of this website on github</a>.</p>
        <p className={"lead"}>Additionally, the <a href="https://github.com/darksinge/IR-legislation-cs4320_sp17">source code for our data collection and algorithms</a> is also hosted on <a href="https://github.com">github</a>.</p>
      </div>
      <div className={"container"}>
        <p><a href="/foo">Click here to test a broken link</a></p>
      </div>
    </div>
    );
  }
});

module.exports = HomePage;
