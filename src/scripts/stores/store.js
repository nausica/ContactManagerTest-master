/** @jsx React.DOM */
var Reflux    = require('reflux');
var _         = require('lodash');
var actions   = require('../actions/actions');

var _contacts = [];

var defaultContacts = function() {
  return [
            {
              id: 1,
              name : 'Terrence S. Hatfield',
              tel: '651-603-1723',
              email: 'TerrenceSHatfield@rhyta.com'
            },
            {
              id: 2,
              name : 'Chris M. Manning',
              tel: '513-307-5859',
              email: 'ChrisMManning@dayrep.com'
            },
            {
              id: 3,
              name : 'Ricky M. Digiacomo',
              tel: '918-774-0199',
              email: 'RickyMDigiacomo@teleworm.us'
            },
            {
              id: 4,
              name : 'Michael K. Bayne',
              tel: '702-989-5145',
              email: 'MichaelKBayne@rhyta.com'
            },
            {
              id: 5,
              name : 'John I. Wilson',
              tel: '318-292-6700',
              email: 'JohnIWilson@dayrep.com'
            },
            {
              id: 6,
              name : 'Rodolfo P. Robinett',
              tel: '803-557-9815',
              email: 'RodolfoPRobinett@jourrapide.com'
            }
        ]
}

var contactsStore  = Reflux.createStore({

  init: function() {
    // set the private contacts variables to our initial array
    _contacts = defaultContacts();
    // register upsertContact action & bind to upsertContact function
    this.listenTo(actions.upsertContact, this.upsertContact);
    // register removeContact action & bind to removeContact function
    this.listenTo(actions.removeContact, this.removeContact);
    this.listenTo(actions.startEditContact, this.startEditContact);
    this.listenTo(actions.cancelEditContact, this.cancelEditContact);

  },

  // returns the private array of contacts
  getContacts: function() {
    return _contacts;
  },

  // returns a contact by id
  getContact: function(contactId) {
    return _.where(_contacts, { 'id': contactId })[0];
  },

  // updates or inserts a contact, depending on existance in the store
  upsertContact: function(contact) {
    var existing = _.where(_contacts, { 'id': contact.id })[0];
    if (!existing) {
      contact.is_new = true;
      contact.editing = true;
      _contacts.unshift(contact);
      //_contacts.push(contact);
    } else {
      // update
      existing.name = contact.name;
      existing.email = contact.email;
      existing.tel = contact.tel;
      delete existing.editing;
      delete existing.is_new;
    }
    this.trigger(_contacts);
  },

  // removes a contact
  removeContact: function(contact) {
    _.remove(_contacts, function(c) {
      return c.id === contact.id;
    });
    this.trigger(_contacts);
  },

  // stars inline editing
  startEditContact: function(contact) {
    var existing = _.where(_contacts, { 'id': contact.id })[0];
    existing.editing = true;
    this.trigger(_contacts);
  },

  // cancels inline editing
  cancelEditContact: function(contact) {
    var existing = _.where(_contacts, { 'id': contact.id })[0];
    if (existing) {
      if (existing.is_new) {
        this.removeContact(contact);
      } else {
        delete existing.editing;
        this.trigger(_contacts);
      }
    }
  }
});

module.exports = contactsStore;
