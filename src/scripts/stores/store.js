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

  },

  // returns the private array of contacts
  getContacts: function() {
    return _contacts;
  },

  // returns a contact by id
  getContact: function(contactId) {
    return _.where(_contacts, { 'id': contactId })[0];
  },

  upsertContact: function(contact) {
    var existing = _.where(_contacts, { 'id': contact.id })[0];
    if (!existing) {
      contact.id = _contacts.length + 1;
      _contacts.push(contact);
    } else {
      // update
      existing.name = contact.name;
      existing.email = contact.email;
      existing.tel = contact.tel;
    }
  },

  removeContact: function(contact) {
    _.remove(_contacts, function(c) {
      return c.id === contact.id;
    });
    this.trigger(_contacts);
  },
});

module.exports = contactsStore;
