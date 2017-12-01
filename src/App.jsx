import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], //message coming from the server will be stored here as they arrive
      currentNumberOfUsers: 0,
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function (event) {
      console.log("Connected to server");
    };
    window.scrollBy(0, 10);
    this.socket.addEventListener('message', (evt) => {
      const msgReParse = JSON.parse(evt.data);
      if (msgReParse.type === "incomingClientConnect" || msgReParse.type === "incomingClientDisconnect") {
        this.setState({messages: this.state.messages.concat(msgReParse)});
        this.setState({currentNumberOfUsers: msgReParse.size});
      } else {
        this.setState({messages: this.state.messages.concat(msgReParse)});
      }
    });
  }

  onNewMessage (value) {
    let newMessage = {};
    if (this.state.currentUser.name === '') {
      newMessage = {username: 'Anonymous', content: value, type: "postMessage"}; //the new message is this standard format
    } else {
      newMessage = {username: this.state.currentUser.name, content: value, type: "postMessage"}; //the new message is this standard format
    }
    const messages = this.state.messages.concat(newMessage); //messages is the list of all current messages in the list and the new message
    const msgString = JSON.stringify(newMessage);

    this.socket.send(msgString); //send the JSON string to server

  }

  handleChangeUserName (value) {
    const userName = {name: value};
    let oldUsername = this.state.currentUser.name;
      if (oldUsername === '') {
        oldUsername = 'Anonymous';
      }
    const newUsername = value;
    const contentFill = oldUsername + " has changed their name to " + newUsername;
    const newNotification = {type: "postNotification", content: contentFill}; //create new notification in this standard format
    const notificationString = JSON.stringify(newNotification);

    this.socket.send(notificationString); //send the JSON string to server
    this.setState({currentUser: userName}) //set new user name
  }

  render() {
    console.log("Rendering <App/>");
    return (
      scroll.scrollToBottom(),
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className="navbar-users" >{this.state.currentNumberOfUsers} Users Online</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} handleNewMessage={this.onNewMessage} newUserName={this.handleChangeUserName}/>
      </div>
    );
  }
}
export default App;
