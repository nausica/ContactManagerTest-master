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
var classNames    = require('classnames');

var Contact = React.createClass({

    getInitialState: function() {
      return {
        contact: this.props.contact
      }
    },
    handleSubmit: function(e) {
      e.preventDefault();
      ContactsStore.upsertContact(this.state.contact);

    },
    // update the state when they type stuff a the text box
    handleChange: function(field, e) {
      var thisContact = this.state.contact;
      thisContact[field] = e.target.value;
      this.setState({contact: thisContact});
    },

    render: function() {

        var createThumbnail = function(contact) {
          var MAX_IMAGES = 15;
          var image_id = (contact.id % MAX_IMAGES) + 1;
          var url = '../images/faces/'+image_id+'.jpg';
          return <img className='media-object profile-pic' src={url}/>;
        };
        var cl_editable_contact = classNames('media', 'col-md-6', 'col-lg-4', { 'inline-mode': this.state.contact.editing || false });
        var cl_editable_field = classNames({ 'inline-edit': !this.state.contact.editing || false, 'inline-edit-active': this.state.contact.editing || false })
        var cl_editable_buttons = classNames('overlay', { 'hide': !this.state.contact.editing || false});
        var actions_disabled = this.state.contact.editing ? false : true;

        return (
            <li className={cl_editable_contact}>
              <form onSubmit={ this.handleSubmit }>
                <div className='media-left media-middle'>
                  <div className='profile-pic-thumb'>
                    {createThumbnail(this.props.contact)}
                  </div>
                </div>

                <div className='media-body'>
                    <div className='media-heading'>
                      <h4>
                        <input className={cl_editable_field} value={this.state.contact.name} placeholder="Enter name here" disabled={actions_disabled ? "disabled" : false} onChange={this.handleChange.bind(this, "name")}/>
                      </h4>
                    </div>
                    <dl>
                        <dt>Phone Number:</dt>
                        <dd><input className={cl_editable_field} value={this.state.contact.tel} placeholder="Enter phone here" disabled={actions_disabled ? "disabled" : false} onChange={this.handleChange.bind(this, "tel")}/></dd>
                        <dt>Email:</dt>
                        <dd><input className={cl_editable_field} value={this.state.contact.email} placeholder="Enter email here" disabled={actions_disabled ? "disabled" : false} onChange={this.handleChange.bind(this, "email")} /></dd>
                    </dl>
                    <div className='contact-actions'>
                      <Glyphicon className='contact-actions-icon' glyph='pencil' onClick={Actions.startEditContact.bind(this, this.state.contact)}/>
                      <Glyphicon className='contact-actions-icon' glyph='trash' onClick={Actions.removeContact.bind(this, this.state.contact)} />
                    </div>
                    <ButtonToolbar className={cl_editable_buttons}>
                      <Button type='submit' bsStyle='primary' bsSize='xsmall'>Save</Button>
                      <Button bsSize='xsmall' onClick={Actions.cancelEditContact.bind(this, this.state.contact)} >Cancel</Button>
                    </ButtonToolbar>
                </div>
                <hr/>
              </form>
            </li>
        );
    }
});

module.exports = Contact;
