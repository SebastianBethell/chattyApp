import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.enterIsPressed = this.enterIsPressed.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }

  //is triggered EVERY keypress but doesn't do anything unless the key is ENTER
  enterIsPressed (e) {
    const key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      this.props.handleNewMessage(e.target.value); // pass value of chatbar-message to app and tell app to rerender the messagelist
      e.target.value = '';  //clears the message bar after passing the content to app
    }
  }

  changeUserName (e) {
    if (e.target.value === '') {
      this.props.newUserName('Anonymous');
    } else {
      this.props.newUserName(e.target.value);
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} onBlur={this.changeUserName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.enterIsPressed}/>}
      </footer>
    );
  }
}
export default ChatBar;
