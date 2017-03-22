
var React = require('react');

var NavBar = require('/home/craig/Documents/sites/ratemybill-site/views/NavBar.jsx');

var App = React.createClass({
  render: function() {
    return (
    <div className={"container"}>
      <NavBar />
      {this.props.children}
    </div>
    );
  }
});

module.exports = App;
