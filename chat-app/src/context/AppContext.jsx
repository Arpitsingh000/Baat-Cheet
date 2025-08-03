import React, { createContext, use, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from '../config/firebase.js';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState([]);
    const [messagesId,setMessagesId] = useState(null);
    const [messages,setMessages] = useState([]);
    const [chatUser, setChatUser] = useState(null);
    const [chatView,setChatView] = useState(false);


    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            if (!userSnap.exists()) {
                console.error("No such user!");
                return;
            }
            const userData = userSnap.data();
            console.log(userData);

            setUserData(userData);

            if (userData.avatar && userData.name) {
                navigate('/chat');
            } else {
                navigate('/profile');
            }
            await updateDoc(userRef, {
                lastSeen: Date.now()
            })
            setInterval(async () => {
                if (auth.chatUser) {
                    await updateDoc(userRef, {
                        lastSeen: Date.now()
                    })
                }
            }, 60000);
        } catch (error) {
            console.error("Error loading user data:", error);
            navigate('/profile');
        }
    }

    useEffect(() => {
        if (userData) {
            const chatRef = doc(db, 'chats', userData.id);
            const unSub = onSnapshot(chatRef, async (res) => {
                const chatItems = res.data().chatsData;
                const tempData = [];
                for (const item of chatItems) {
                    const userRef = doc(db, 'users', item.rId);
                    const userSnap = await getDoc(userRef);
                    const userData = userSnap.data();
                    tempData.push({ ...item, userData });
                }
                setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
            });
            return () => {
                unSub();
            }
        }
    }, [userData]);

    const value = {
        userData, setUserData,
        chatData, setChatData,
        messages, setMessages,
        messagesId, setMessagesId,
        chatUser, setChatUser,
        chatView, setChatView,
        loadUserData,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;