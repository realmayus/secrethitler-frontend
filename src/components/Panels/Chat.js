import React, {useState, useEffect, useRef, useMemo} from "react";
import styles from "./Chat.module.scss";
import InteractiveUsername from "../Minor/InteractiveUsername";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";





export default function Chat(props) {
    const [messages, setMessages] = useState([
        {
            author: {
                username: "realmayus",
                id: 0
            },
            text: "test"
        },
        {
            author: {
                username: "realmayus",
                id: 0
            },
            text: "test"
        },
        {
            author: {
                username: "realmayus",
                id: 0
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "test"
        },
        {
            author: {
                username: "realmayus",
                id: 0
            },
            text: "test"
        },
        {
            author: {
                username: "realmayus",
                id: 0
            },
            text: "test"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "5 is suspicious af and prolly hitleasdasdasdasdasdasdasdasdr"
        },
        {
            author: {
                username: "hunter42",
                id: 1
            },
            text: "What the fuck?"
        },
        {
            author: {
                username: "realmayus",
                id: 0
            },
            text: "test"
        },
    ]);

    const [message, setMessage] = useState("");
    const chatRef = useRef(null);

    const sendMessage = (e) => {
        e.preventDefault();
        let msgCopy = messages;
        msgCopy.push({
            author: {
                username: "realmayus",
                id: 0
            },
            text: message
        })
        setMessages(msgCopy);
        setMessage("");
    }


    useEffect(() => {
        if (chatRef.current != null) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    })

    let previousAuthor;
    return(
        <div className={styles.wrapper}>
            <h3 className={styles.headline}>Chat</h3>
            <div className={styles.textWrapper} ref={chatRef}>
                {
                    messages.map((msg, i) => {
                        if(previousAuthor == null || previousAuthor.id !== msg.author.id) {
                            previousAuthor = msg.author;
                            return (<div>
                                <InteractiveUsername user={msg.author}/>
                                <p>{msg.text}</p>
                            </div>);
                        }
                        return (<div>
                            <p>{msg.text}</p>
                        </div>);
                    })
                }
            </div>
            <form onSubmit={sendMessage} className={styles.msgBoxWrapper}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className={styles.msgBox}/>
                <button className={styles.sendButton}><FontAwesomeIcon icon={faPaperPlane} className={styles.sendButtonImg}/></button>
            </form>
        </div>
    )
}