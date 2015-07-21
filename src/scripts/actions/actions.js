/** @jsx React.DOM */
var Reflux = require('reflux');

var actions = Reflux.createActions({
    'upsertContact': {},
    'removeContact': {}
});

module.exports = actions;
