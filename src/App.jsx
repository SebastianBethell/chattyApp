import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          key: "1",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          key: "2",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {key: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  onNewMessage (value) {
    console.log(this);
    const keyI = this.state.messages.length + 1; //set new key to be 1 more than current key
    const newMessage = {key: keyI, username: this.state.currentUser.name, content: value};
    const messages = this.state.messages.concat(newMessage)
    // on new message add content to messages array
    this.setState({messages: messages})
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
