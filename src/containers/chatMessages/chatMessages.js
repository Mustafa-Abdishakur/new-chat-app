import React, { useEffect, useRef } from 'react';
import classes from './chatMessages.module.css';

const ChatMessages = (props) => {

    //Automatic scroll to the end of chat
    const messagesEndRef = useRef(null)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    });

    return (
            <div className={classes.midContainer}>
                <div className={classes.headerContainer}>
                    <h1>Welcome to chat App</h1>
                </div>
                <div className={classes.mainChatContainer}>
                    {props.messagesArr.map(message => {
                        return (
                            <div className={classes.ChatContainer} key={message.key}>
                                <div className={classes.textContainer}>
                                    <div className={classes.ImgContainer}>
                                        <img src={message.profilePic} alt="profile" />
                                    </div>
                                    <div className={classes.text}>
                                        <div className={classes.topText}>
                                            <span>{message.name}</span>
                                            <span>{message.messageDate} {message.messageTime}</span>
                                        </div>
                                        <span>{message.message}</span>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
                <div className={classes.InputContainer}>
                    <input type="text" placeholder="type your message here..." onKeyUp={props.chatInputHandler} />
                </div>
            </div>
    )

}
export default ChatMessages;