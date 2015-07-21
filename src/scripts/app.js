'use strict';
/** @jsx React.DOM */
var React = require('react');

var App = React.createClass({

  render: function() {
    return (
        <h1> Contact Manager </h1>
      )
  }
});

React.render(<App />,
  document.getElementById('app'));
