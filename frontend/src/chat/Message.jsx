import React from 'react';

const Message = ({ messageContent }) => {
  return (
    <div className="message-content">
      <p>{messageContent.message}</p>
    </div>
  );
};

export default Message;
