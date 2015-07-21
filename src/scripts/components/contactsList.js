'use strict';
/** @jsx React.DOM */
var React         = require('react');
var Glyphicon     = require('react-bootstrap').Glyphicon;
var Link          = require('react-router').Link;
var Reflux        = require('reflux');
var ContactsStore = require('../stores/store');
var Actions       = require('../actions/actions');


var Contact = React.createClass({

    render: function() {
        var createThumbnail = function(contact) {
            var url = '../images/faces/'+contact.id+'.jpg';
            return <img className="media-object" src={url}/>;
        };
        return (
            <li className="media col-md-6 col-lg-4">
                <div className="media-left">
                    {createThumbnail(this.props.contact)}
                </div>

                <div className="media-body">
                    <div className="media-heading">
                      <h3>
                          {this.props.contact.name}
                          <small>
                              <Link to="contact" params={{ id: this.props.contact.id }}>
                                <Glyphicon glyph='pencil' />
                              </Link>
                              <a onClick={Actions.removeContact.bind(this, this.props.contact)} className="delete-contract" href="#">
                                  <Glyphicon glyph='trash' />
                              </a>
                          </small>
                      </h3>
                    </div>
                    <dl>
                        <dt>Phone Number:</dt>
                        <dd>{this.props.contact.tel}</dd>
                        <dt>Email:</dt>
                        <dd>{this.props.contact.email}</dd>
                    </dl>
                </div>
                <hr/>
            </li>
        );
    }
});

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
