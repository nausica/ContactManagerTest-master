/** @jsx React.DOM */
var React         = require('react');
var Router        = require('react-router');
var Reflux        = require('reflux');
var _             = require('lodash');
var ContactsStore = require('../stores/store');


var EditContact = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
    Reflux.ListenerMixin
  ],

  componentDidMount: function() {
    this.listenTo(ContactsStore, this.toggleStatus);
  },

  getInitialState: function() {
    // ? if no id, add
    var contactId = this.getParams().id;
    var contact;

    if (!contactId) {
      contact = {
        id: -1,
        name : '',
        tel: '',
        email: ''
      }
    } else {
      contact = ContactsStore.getContact(parseInt(this.getParams().id));
    }

    return {
      contact: contact
    }
  },

  // update the state when they type stuff a the text box
  handleChange: function(field, e) {
    var thisContact = this.state.contact;
    thisContact[field] = e.target.value;
    this.setState({contact: thisContact});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    ContactsStore.upsertContact(this.state.contact);

    this.setState({
      contact: {}
    });

    this.transitionTo('home');
  },

  render: function() {

    return (
      <div>
        <form onSubmit={ this.handleSubmit } className="form-horizontal contract-form">
              <div className="form-group">
                <label className="col-sm-4 control-label">Full name:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control contact-name-input" value={this.state.contact["name"]} onChange={this.handleChange.bind(this, "name")}/>
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Email address:</label>
                <div className="col-sm-6">
                  <input type="email" className="form-control contact-email-input" value={this.state.contact["email"]} onChange={this.handleChange.bind(this, "email")}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Telephone number:</label>
                <div className="col-sm-6">
                  <input type="tel" className="form-control contact-tel-input" value={this.state.contact["tel"]} onChange={this.handleChange.bind(this, "tel")}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-4 col-sm-3">
                  <button type="submit" className="btn btn-outline btn-lg btn-block">Submit</button>
                </div>
                <div className="col-sm-3">
                  <a href="#" className="btn btn-outline btn-lg btn-block">Cancel</a>
                </div>
              </div>

                </form>
              </div>

    )

  }

});

module.exports = EditContact;
