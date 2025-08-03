import React, { useContext, useEffect, useState } from 'react';
import './leftSidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, where, doc, setDoc, serverTimestamp, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const LeftSidebar = () => {

    const navigate = useNavigate();
    const { userData, chatData, chatUser, setChatUser, setMessagesId, messagesId, chatView, setChatView } = useContext(AppContext);
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);


    const inputHandler = async (e) => {
        try {
            const input = e.target.value;
            if (input) {
                setShowSearch(true);
                const userRef = collection(db, 'users');
                const q = query(userRef, where('username', '==', input.toLowerCase()));
                const querySnap = await getDocs(q);
                if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
                    let userExist = false;
                    if (Array.isArray(chatData)) {
                        chatData.forEach((user) => {
                            if (user.rId === querySnap.docs[0].data().id) {
                                userExist = true;
                            }
                        });
                    }
                    if (!userExist) {
                        setUser(querySnap.docs[0].data());
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }

            }
        } catch (error) {
            console.error(error)
        }
    }


    const addChat = async () => {
        const messagesRef = collection(db, "messages");
        const chatsRef = collection(db, "chats");
        try {
            const newMessageRef = doc(messagesRef);

            await setDoc(newMessageRef, {
                createdAt: serverTimestamp(),
                messages: []
            })

            await updateDoc(doc(chatsRef, user.id), {
                chatsData: arrayUnion({
                    messageId: newMessageRef.id,
                    lastMessage: "",
                    rId: userData.id,
                    updatedAt: Date.now(),
                    messageSeen: true
                })
            })

            await updateDoc(doc(chatsRef, userData.id), {
                chatsData: arrayUnion({
                    messageId: newMessageRef.id,
                    lastMessage: "",
                    rId: user.id,
                    updatedAt: Date.now(),
                    messageSeen: true
                })
            })

            const uSnap = await getDoc(doc(db, "users", user.id))
            const uData = uSnap.data();
            setChat({
                messageId: newMessageRef.id,
                lastMessage: "",
                rId: user.id,
                updatedAt: Date.now(),
                messageSeen: true,
                userData: uData
            })
            setShowSearch(false);
            setChatView(true);

        } catch (error) {
            toast.error(error.message)
            console.error(error)

        }
    }

    const setChat = async (item) => {
        try {
            setMessagesId(item.messageId);
            setChatUser(item);
            const userChatRef = doc(db, 'chats', userData.id);
            const userChatsSnapshot = await getDoc(userChatRef);
            const userChatsData = userChatsSnapshot.data();
            const chatIndex = userChatsData.chatsData.findIndex((c) => c.messageId === item.messageId);
            userChatsData.chatsData[chatIndex].messageSeen = true;
            await updateDoc(userChatRef, {
                chatsData: userChatsData.chatsData
            })
            setChatView(true)
        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
    }

    useEffect(() => {
        const updateChatUserData = async () => {
            if (chatUser) {
                const userRef = doc(db, "users", chatUser.userData.id);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();
                setChatUser(prev => ({ ...prev, userData: userData }))
            }
        }
        updateChatUserData();
    }, [chatData])

    return (
        <div className={`left ${chatView ? "hidden" : ""}`}>
            <div className="left-top">
                <div className="left-nav">
                    <img src={assets.logo} className='logo' alt="" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt="" />
                        <div className="sub-menu">
                            <p onClick={() => navigate('/profile')}>Edit Profile</p>
                            <hr />
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="left-search">
                    <img src={assets.search_icon} alt="" />
                    <input onChange={inputHandler} type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="left-list">
                {showSearch && user ? <div onClick={addChat} className='friends add-user'>
                    <img src={user.avatar} alt="" />
                    <p>{user.name}</p>
                </div> : chatData.map((item, index) => (<div onClick={() => setChat(item)} key={index} className={`friends ${item.messageSeen || item.messageId === messagesId ? "" : "border"}`}>
                    <img src={item.userData.avatar} alt="" />
                    <div>
                        <p>{item.userData.name}</p>
                        <span>{item.lastMessage}</span>
                    </div>
                </div>))
                }
            </div>
        </div>
    );
}

export default LeftSidebar;
