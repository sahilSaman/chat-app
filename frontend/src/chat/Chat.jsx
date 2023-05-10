import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import SendMessage from './SendMessage';
function Chat({ socket, userName, room }) {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const handleMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on('recieve_message', handleMessage);
    return () => {
      socket.off('recieve_message', handleMessage);
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                className="message"
                id={userName === messageContent.author ? 'you' : 'other'}
              >
                <div>
                  <Message messageContent={messageContent} />
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>{' '}
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <SendMessage
        socket={socket}
        room={room}
        userName={userName}
        setMessageList={setMessageList}
      />
    </div>
  );
}

export default Chat;
