# Chatty App Project

Many of the web applications that you use today have real-time functionality where the user does not have to reload the page in order to see updates. Major examples of these include Slack, Twitter and Facebook.

ChattyApp allows users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

## Screenshots

!["One user logged on, changed their name, sent a message"](https://github.com/SebastianBethell/chattyApp/blob/master/docs/oneUser.png)

!["A second user logged on, changed their name, sent a message"](https://github.com/SebastianBethell/chattyApp/blob/master/docs/twoUsers.png)

### Dependencies
  "react": "15.4.2",
  "react-dom": "15.4.2",
  "react-scroll": "^1.6.7",
  "ws": "3.3.2"

## Dev Dependencies

  "babel-core": "6.23.1",
  "babel-loader": "6.3.1",
  "babel-preset-es2015": "6.22.0",
  "babel-preset-react": "6.23.0",
  "babel-preset-stage-0": "6.22.0",
  "css-loader": "0.26.1",
  "eslint": "3.15.0",
  "eslint-plugin-react": "6.9.0",
  "node-sass": "4.5.0",
  "sass-loader": "6.0.0",
  "sockjs-client": "^1.1.2",
  "style-loader": "0.13.1",
  "webpack": "2.2.1",
  "webpack-dev-server": "2.3.0"

## Stretch

  - Added 4 user colors (after the first four are assigned new users get black)
  - Added react-scroll which keeps the newest message on screen when it would go below the current window