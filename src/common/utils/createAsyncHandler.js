'use strict';

let React = require('react');

function createAsyncHandler(getHandlerAsync, displayName) {
  let Handler = null;

  return React.createClass({
    displayName: displayName,

    statics: {
      willTransitionTo(transition, params, query, callback) {
        getHandlerAsync().then(resolvedHandler => {
          Handler = resolvedHandler;
          
          if (!Handler.willTransitionTo) {
            return callback();
          }

          Handler.willTransitionTo(transition, params, query, callback);
          if (Handler.willTransitionTo.length < 4) {
            callback();
          }
        });
      },

      willTransitionFrom(transition, component, callback) {
        if (!Handler || !Handler.willTransitionFrom) {
          callback();
          return;
        }

        Handler.willTransitionFrom(transition, component, callback);
        if (Handler.willTransitionFrom.length < 3) {
          callback();
        }
      }
    },

    render() {
      return <Handler {...this.props} />;
    }
  });
}

module.exports = createAsyncHandler;