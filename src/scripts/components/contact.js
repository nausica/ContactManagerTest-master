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
            var url = '../images/faces/'+contact.id+'.jpg';
            return <img className="media-object profile-pic" src={url}/>;
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
                      <h3>
                        <input className={cl_editable_field} value={this.state.contact.name} disabled={actions_disabled ? "disabled" : false} onChange={this.handleChange.bind(this, "name")}/>
                          <small>
                            <span className='contact-actions'>
                              <Glyphicon glyph='pencil' onClick={Actions.startEditContact.bind(this, this.state.contact)}/>
                              <Glyphicon glyph='trash' onClick={Actions.removeContact.bind(this, this.state.contact)} />
                            </span>
                          </small>
                      </h3>
                    </div>
                    <dl>
                        <dt>Phone Number:</dt>
                        <dd><input className={cl_editable_field} value={this.state.contact.tel} disabled={actions_disabled ? "disabled" : false} onChange={this.handleChange.bind(this, "tel")}/></dd>
                        <dt>Email:</dt>
                        <dd><input className={cl_editable_field} value={this.state.contact.email} disabled={actions_disabled ? "disabled" : false} onChange={this.handleChange.bind(this, "email")} /></dd>
                    </dl>
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
