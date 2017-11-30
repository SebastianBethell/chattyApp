import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    if (this.props.messageValue.type === 'incomingMessage') {
      return (
        <div className="message">
          <span className="message-username" >{this.props.messageValue.username}</span>
          <span className="message-content" >{this.props.messageValue.content}</span>
        </div>
      );
    }
    if (this.props.messageValue.type === 'incomingNotification') {
      return (
        <div className="message system">
          {this.props.messageValue.content}
        </div>
      );
    }
    if (this.props.messageValue.type === 'incomingClientConnect') {
      return (
        <div className="message system">
          A user has joined the channel
        </div>
      );
    }
    if (this.props.messageValue.type === 'incomingClientDisconnect') {
      return (
        <div className="message system">
          A user has left the channel
        </div>
      );
    }
  }
}
export default Message;
