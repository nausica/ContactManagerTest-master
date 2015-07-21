/** @jsx React.DOM */
var React         = require('react');
var Router        = require('react-router');
var _             = require('lodash');

var ContactForm   = require('./form');

var AddContact = React.createClass({

  render: function() {

    return (
      <div>
        <h2 className="page-header text-center">Add Contact</h2>
        <ContactForm />
      </div>

    )

  }

});

module.exports = AddContact;
