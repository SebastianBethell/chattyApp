import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [] //message coming from the server will be stored here as they arrive
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function (event) {
      console.log("Connected to server");
    };
    this.socket.addEventListener('message', (msg) => {
      const msgReParse = JSON.parse(msg.data);
      console.log(msgReParse);
      this.setState({messages: this.state.messages.concat(msgReParse)});
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
    //set new user name
    this.setState({currentUser: userName})
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} handleNewMessage={this.onNewMessage} newUserName={this.handleChangeUserName}/>
      </div>
    );
  }
}
export default App;
