const React = require('react');
const hashHistory = require('react-router').hashHistory;
const SessionActions = require('../actions/SessionActions');
const SessionStore = require('../stores/SessionStore');
const NavBar = require('./NavBar');

const App = React.createClass({
  getInitialState() {
    return { user: SessionStore.currentUser() };
  },
  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.onChange);
    this.otherSessionListener = SessionStore.addListener(this.redirectIfNotLoggedIn);
  },
  componentWillUnmount() {
    this.sessionListener.remove();
  },
  onChange() {
    this.setState({ user: SessionStore.currentUser() });
  },
  handleLogOut() {
    SessionActions.logout();
  },
  redirectIfNotLoggedIn() {
    if (!SessionStore.loggedIn()) {
      hashHistory.push('login');
    }
  },
  render() {
    return (
      <div>
        <NavBar user={this.state.user} />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = App;
