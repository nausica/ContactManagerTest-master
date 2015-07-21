'use strict';
/** @jsx React.DOM */
var React         = require('react');
var Glyphicon     = require('react-bootstrap').Glyphicon;
var Button        = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Link          = require('react-router').Link;
var Reflux        = require('reflux');
var ContactsStore = require('../stores/store');
var Actions       = require('../actions/actions');
var Contact       = require('./contact');


var Contacts = React.createClass({

    render: function() {

        var renderContact = function(contact) {
            return <Contact contact={contact} key={contact.id} />;
        };
        return (
            <ul className="media-list row contacts-container">
                {this.props.contacts.map(renderContact)}
            </ul>
        );
    }
});

var AddContact = React.createClass({
    render: function() {
        return (
            <p className="text-center">
                <Link to="add">
                    <a className="btn btn-lg btn-outline">Add Contact</a>
                </Link>
            </p>
        );
    }
});

function getContacts() {
  return {
    contacts: ContactsStore.getContacts()
  }
}

var ContactsList = React.createClass({

    mixins: [
      Reflux.listenTo(ContactsStore, 'onContactsUpdate')
    ],

    getInitialState: function() {
      return getContacts();
    },

    onContactsUpdate: function(contactsData) {
      this.setState({
        contacts: contactsData
      });
    },

    render: function() {
        return (
            <div>
                <h2 className="page-header text-center">List of contacts</h2>
                <AddContact />
                <Contacts contacts={this.state.contacts}/>
            </div>
        );
    }
});


module.exports = ContactsList;
