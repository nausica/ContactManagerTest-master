'use strict';
/** @jsx React.DOM */
var React       = require('react');
var Glyphicon   = require('react-bootstrap').Glyphicon;


var Contact = React.createClass({
    render: function() {
        var createThumbnail = function(contact) {
            var url = '../images/faces/'+contact.id+'.jpg';
            return <img className="media-object" src={url}/>;
        };
        return (
            <li className="media col-md-6 col-lg-4">
                <div className="thumbnail">
                    {createThumbnail(this.props.contact)}
                </div>
                <div className="media-heading">
                    <h3>
                        {this.props.contact.name}
                        <small>
                            <a href="#contacts/edit/1">
                                <Glyphicon glyph='pencil' />
                            </a>
                            <a href="#contacts/delete/1" className="delete-contract">
                                <Glyphicon glyph='trash' />
                            </a>
                        </small>
                    </h3>
                </div>
                <div className="media-body">
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
                <a href="#contacts/new" className="btn btn-lg btn-outline">Add Contact</a>
            </p>
        );
    }
});

var ContactsList = React.createClass({
    render: function() {
        return (
            <div>
                <h2 className="page-header text-center">List of contacts</h2>
                <AddContact />
                <Contacts contacts={CONTACTS} />
            </div>
        );
    }
});


var CONTACTS = [
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
];

module.exports = ContactsList;
