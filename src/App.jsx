import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
    this.socket.addEventListener('message', (evt) => {
      const msgReParse = JSON.parse(evt.data);
      if (msgReParse.type === "incomingMessage") {
        this.setState({messages: this.state.messages.concat(msgReParse)});
      } else if (msgReParse.type === "incomingNotification") {
        this.setState({messages: this.state.messages.concat(msgReParse)});
      } else if (msgReParse.type === "incomingClientConnect") {
        this.setState({messages: this.state.messages.concat(msgReParse)});
        this.setState({currentNumberOfUsers: msgReParse.size});
      } else if (msgReParse.type === "incomingClientDisconnect") {
        this.setState({messages: this.state.messages.concat(msgReParse)});
        this.setState({currentNumberOfUsers: msgReParse.size});
      } else {
        throw new Error("Unknown event type " + msgReParse.type);
      }

    });
  }

  onNewMessage (value) {
    const newMessage = {username: this.state.currentUser.name, content: value, type: "postMessage"}; //the new message is this standard format
    const messages = this.state.messages.concat(newMessage); //messages is the list of all current messages in the list and the new message
    const msgString = JSON.stringify(newMessage);

    this.socket.send(msgString); //send the JSON string to server

  }

  handleChangeUserName (value) {
    const userName = {name: value};
    const oldUsername = this.state.currentUser.name;
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
