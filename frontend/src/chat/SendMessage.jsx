import React, { useState } from 'react';

function SendMessage({ socket, room, userName, setMessageList }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  return (
    <div className="chat-footer">
      <input
        type="text"
        value={currentMessage}
        placeholder="Write a Message"
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === 'Enter' && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  );
}

export default SendMessage;
