import React, { useContext, useEffect, useState } from "react";
import "./chat.css";
import ChatBox from "../../components/chatBox/ChatBox";
import RightSidebar from "../../components/rightSidebar/RightSidebar";
import LeftSidebar from './../../components/leftSidebar/leftSidebar';
import { AppContext } from "../../context/AppContext";

const Chat = () => {

  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false)
    }
  }, [chatData, userData])

  return (
    <div className="chat container">
      {
        loading ? <p className="loading">Loading...</p> :
          <div className="chat-contanier">
            <LeftSidebar />
            <ChatBox />
            <RightSidebar />
          </div>
      }
    </div>
  );
}

export default Chat;