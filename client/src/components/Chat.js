import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import {getFormattedDateTime} from '../utils/dateHelper';

class Chat extends React.Component {
      constructor(props) {
            super(props);
            this.sendMsg = this.sendMsg.bind(this);
            this.handleInputMessage = this.handleInputMessage.bind(this);

            //           this.props.userName = 'neo';
      }

      handleInputMessage(e) {
          this.props.onTypeMessage(e.target.value);
       }
      sendMsg(e) {
            e.preventDefault();
            if (this.props.newMessage != '') {
                  this.props.onSendMessage(this.props.newMessage);
            }
      }
      render() {
            
            const p = this.props;
            const messages =(p&& p.messages) || [];

            return (
                  <div className="col-sm-12 action-chat" id="chatBox">
                        <ul className="list-group" id="chatList">
                              {
                                    messages.map(msg =>
                                          <li className="chat-item list-group-item" key={msg.messageId}>
                                                <span>{msg.timeStamp}</span> <span className="text-danger" />: <br />
                                                <label className="text-info" >{msg.message}</label>
                                          </li>
                                    )}

                        </ul>
                        <hr />
                        <form onSubmit={this.sendMsg}>
                              <div className="form-group">
                                    <label>Message:</label>
                                    <input type="text" value={p.newMessage} onChange={this.handleInputMessage} className="form-control rounded" placeholder="Enter message" />
                              </div>

                              <button type="submit" onClick={this.sendMsg} className="btn btn-default">Send</button>
                        </form>
                  </div>);
      }
}
Chat.propTypes = {
      onSendMessage: PropTypes.func,
      onTypeMessage: PropTypes.func,
      messages: PropTypes.arrayOf(PropTypes.shape({
            messageId: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            timeStamp: PropTypes.string.isRequired
      }).isRequired),
      newMessage: PropTypes.string,
      userName: PropTypes.string
};

const mapStateToProps = (state) => {
      return {
            messages: state.chat.messages,
            newMessage: state.chat.newMessage
      };
};

const mapDispatchToProps = (dispatch) => {
      return {
            onSendMessage: (message) => dispatch({ type: 'SEND_MESSAGE', text: message, messageId: uuid.v4(), messageTimeStamp: getFormattedDateTime() }),
            onTypeMessage: (message) => dispatch({type: 'TYPE_MESSAGE', text: message})
      };

};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);