'use strict';
/** @jsx React.DOM */
var React = require('react');

var ContactsList  = require('./components/contactsList');
var App = React.createClass({

  render: function() {
    return (
          <ContactsList />
      )
  }
});

React.render(<App />,
  document.getElementById('app'));
