import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  render() {
    console.log("Rendering <MessageList/>");
    const messages = this.props.messages;
    const messagesList = messages.map((message) =>
      <Message key={message.key} messageValue={message} />
    );
    console.log(messagesList);

    return (
      <main className="messages">
        {messagesList}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;
