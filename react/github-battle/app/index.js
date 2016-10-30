var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
var raven = require('raven-js');


var sentryKey='e96bc21d4498402781aa7e6e5f51066f'
var sentryApp='110582'
var sentryURL='https://' + sentryKey + '@sentry.io/' + sentryApp;

var _APP_INFO = {
  name: 'Github Battle',
  branch: '4',
  version: '1.0'
}
raven.config(sentryURL, {
  release: _APP_INFO.version,
  tags: {
    branch: _APP_INFO.branch,
  }
}).install();

ReactDOM.render(routes, document.getElementById('app'));
