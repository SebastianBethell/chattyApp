import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages;
    const messagesList = messages.map((message) =>
      <Message key={message.key} messageValue={message} />
    );

    return (
      <main className="messages">
        {messagesList}
      </main>
    );
  }
}
export default MessageList;
