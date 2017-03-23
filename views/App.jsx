
var React = require('react');

var AppRouter = require('/home/craig/Documents/sites/ratemybill-site/views/AppRouter.jsx');

var App = React.createClass({
  render: function() {
    return (
    <div>
      <AppRouter />
      <div className="container">
          {this.props.children}
      </div>
    </div>
    );
  }
});

module.exports = App;
