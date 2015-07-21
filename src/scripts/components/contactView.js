/** @jsx React.DOM */
var React = require('react');


var ContactForm = React.createClass({
    render: function() {
        return (
            <form role="form" className="form-horizontal contract-form">
              <div className="form-group">
                <label className="col-sm-4 control-label">Full name:</label>
                  <div className="col-sm-6">
                    <input type="text" className="form-control contact-name-input" value=""/>
                  </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Email address:</label>
                <div className="col-sm-6">
                  <input type="email" className="form-control contact-email-input" value=""/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-4 control-label">Telephone number:</label>
                <div className="col-sm-6">
                  <input type="tel" className="form-control contact-tel-input" value=""/>
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
        );
    }
});
var ContactView = React.createClass({

  render: function() {
    return (
      <div>
        <h2 className="page-header text-center">Edit Contact</h2>
        <ContactForm />
      </div>
    );
  }

});

module.exports = ContactView;
