'use strict';
/** @jsx React.DOM */
var React         = require('react/addons');
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
            return <Contact contact={contact} key={contact.id} />
        };
        var items = this.props.contacts.map(function(item, i) {
          return (
            <div key={item.id}>
              <Contact contact={item} key={item.id} />
            </div>
          );
        }.bind(this));
        return (
            <ul className="media-list row contacts-container">
                {this.props.contacts.map(renderContact)}
            </ul>
        );
    }
});

var AddContact = React.createClass({
    handleClick: function(e) {
      e.preventDefault();
      var new_contact = {
        id: this.props.total_contacts+1,
        name : '',
        tel: '',
        email: ''
      };
      ContactsStore.upsertContact(new_contact);
    },
    render: function() {
        return (
            <p className="text-center">
              <a className="btn btn-lg btn-outline add-contact-button" onClick={ this.handleClick }>Add Contact</a>
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
      console.log('onContactsUpdate')
      this.setState({
        contacts: contactsData
      });
    },

    render: function() {
        return (
            <div>
                <h2 className="page-header text-center">List of contacts</h2>
                <AddContact total_contacts={this.state.contacts.length}/>
                <Contacts contacts={this.state.contacts}/>
            </div>
        );
    }
});


module.exports = ContactsList;
