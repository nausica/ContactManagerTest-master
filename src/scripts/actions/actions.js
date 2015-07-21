/** @jsx React.DOM */
var Reflux = require('reflux');

var actions = Reflux.createActions({
    'upsertContact': {},
    'removeContact': {},
    'startEditContact': {},
    'cancelEditContact': {},
    'startAddContact': {},
    'cancelAddContact': {}
});

module.exports = actions;
