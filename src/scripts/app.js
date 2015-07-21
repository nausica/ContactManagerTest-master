'use strict';
/** @jsx React.DOM */
var React = require('react');

// routing
var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
var DefaultRoute  = Router.DefaultRoute;

// view components
var ContactsList = require('./components/contactsList');
var ViewContact = require('./components/contactView');
var AddContact = require('./components/contactView');


var routes = (
  <Route handler={ ContactManager }>
    <Route name="contact" path="/edit/:id" handler={ ViewContact } />
    <Route name="add" path="/new" handler={ AddContact } />
    <DefaultRoute name="contacts" handler={ ContactsList } />
  </Route>
);

var ContactManager = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    );
  }
});

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
