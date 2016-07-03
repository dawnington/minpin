const PinIndex = require('../pin/PinIndex');
const React = require('react');
const SessionStore = require('../../stores/SessionStore');

const UserPinIndex = React.createClass({
  getInitialState() {
    return { user: SessionStore.currentUser() };
  },
  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.onChange);
  },
  componentWillUnmount() {
    this.sessionListener.remove();
  },
  onChange() {
    this.setState({ user: SessionStore.currentUser() });
  },
  render() {
    return (
      <div>
        <PinIndex userId={this.state.user.id} />
      </div>
    );
  },
});

module.exports = UserPinIndex;


// <hgroup className="header">
//   <div className="header-title">
//     <h3 className="board-name">My Pins</h3>
//     <h5 className="board-description">All of the things that inspire me</h5>
//   </div>
// </hgroup>
