import React, {useState, useEffect, useRef, useContext} from "react";
import styles from "./Chat.module.scss";
import InteractiveUsername from "../Minor/InteractiveUsername";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {UserContext} from "../../App";
import {DateTime} from "luxon";

export default function Chat({messages, sendMessage, deleteMessage, editMessage}) {
    const [message, setMessage] = useState("");
    const chatRef = useRef(null);
    const userContext = useContext(UserContext);

    const sendMessage_ = (e) => {
        e.preventDefault();
        setMessage("");
        sendMessage(message);
    }


    useEffect(() => {
        if (chatRef.current != null) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages])

    const getRelativeTime = (timestamp) => {
        if (DateTime.fromMillis(timestamp).diffNow().as('seconds') > -5) return 'just now';
        return DateTime.fromMillis(timestamp).toRelative();
    }

    let previousAuthor;
    return(
        <div className={styles.wrapper}>
            <h3 className={styles.headline}>Chat</h3>
            <div className={styles.textWrapper} ref={chatRef}>
                {
                    messages.map((msg) => {
                        if(previousAuthor == null || previousAuthor !== msg.authorId) {
                            previousAuthor = msg.authorId;
                            return (<div key={msg.id}>
                                <div className={styles.messageCategory}>
                                    <InteractiveUsername user={userContext.getOtherUserData(msg.authorId)}/>
                                    <span className={styles.timestamp}>{getRelativeTime(msg.timestamp)}</span>
                                </div>
                                <p title={DateTime.fromMillis(msg.timestamp).toISOTime({suppressMilliseconds: true})}>{msg.text}</p>
                            </div>);
                        }
                        return (<div key={msg.id}>
                            <p title={DateTime.fromMillis(msg.timestamp).toISOTime({suppressMilliseconds: true})}>{msg.text}</p>
                        </div>);
                    })
                }
            </div>
            <form onSubmit={sendMessage_} className={styles.msgBoxWrapper}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className={styles.msgBox}/>
                <button className={styles.sendButton}><FontAwesomeIcon icon={faPaperPlane} className={styles.sendButtonImg}/></button>
            </form>
        </div>
    )
}