const BoardForm = require('./board/BoardForm');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const Modal = require('react-bootstrap').Modal;
const React = require('react');
const SessionActions = require('../actions/SessionActions');
const SessionStore = require('../stores/SessionStore');

const NavBar = React.createClass({
  getInitialState() {
    return { modalShown: false, boards: SessionStore.currentUser().boards };
  },
  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.onChange);
  },
  componentWillUnmount() {
    this.sessionListener.remove();
  },
  onChange() {
    this.setState({ boards: SessionStore.currentUser().boards });
  },
  showBoardForm() {
    this.setState({ modalShown: true });
  },
  closeBoardForm() {
    this.setState({ modalShown: false });
  },
  redirectToPins() {
    const pinPath = `users/${this.props.user.id}/pins`;
    hashHistory.push(pinPath);
  },
  logout() {
    SessionActions.logout();
    hashHistory.push("/");
  },
  render() {
    const user = this.props.user;
    return (
      <div id="nav-bar">
        <i className="fa fa-bars"></i>
        <div className="sidebar-content">
          <div className="nav-content">
            <div className="nav-item feed-link">
              Feed
              <Link to="/" className="nav-item-link"></Link>
            </div>
            <div className="nav-header">
              <i className="fa fa-chevron-right"></i>
              <h3>My Boards</h3>
            </div>
            {
              this.state.boards.map(board => {
                const boardLink = `/boards/${board.id}`;
                return (
                  <div className="nav-item" key={board.id}>
                    {board.name}
                    <Link key={board.id} to={boardLink} className="nav-item-link"></Link>
                  </div>
                );
              })
            }
            <div className="nav-item new-board-button" onClick={this.showBoardForm}>New Board</div>
          </div>
          <div className="nav-profile">
            <div className="nav-header">
              <i className="fa fa-chevron-right"></i>
              <h3>{user.name}</h3>
            </div>
            <div className="nav-item" onClick={this.redirectToPins}>My Pins</div>
            <div className="nav-item nav-log-out" onClick={this.logout}>Log Out</div>
          </div>
        </div>
        <Modal show={this.state.modalShown} onHide={this.closeBoardForm} >
          <Modal.Body>
            <BoardForm userId={user.id} modalCallback={this.closeBoardForm} />
          </Modal.Body>
        </Modal>
      </div>
    );
  },
});

module.exports = NavBar;
