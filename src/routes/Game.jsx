import React, { useEffect, useState, useContext } from "react";
import styles from "./Game.module.scss";
import libTrack from "../assets/tracks/trackLiberal.png";
import fasTrack5_6 from "../assets/tracks/trackFascist_5-6.png";
import Players from "../components/Panels/Players";
import Chat from "../components/Panels/Chat";
import PolicyCard from "../components/Cards/PolicyCard";
import Wordmark from "../components/Wordmark";
import useWebSocket from "react-use-websocket";
import { joinGame, login, sendChatMessage, socketURL } from "../api";
import { useHistory } from "react-router-dom";
import { ModalContext, UserContext } from "../App";
import { handleRequestError } from "../util";
import anime from "animejs";
import Anime from "../components/Minor/Anime";

export default function Game(props) {
    useEffect(() => {
        document.title = props.match.params.gameID;
    }, [props.match.params.gameID]);

    const [registered, setRegistered] = useState(false);

    const [gameInfo, setGameInfo] = useState(null);
    const [currentAction, setCurrentAction] = useState(null);

    const [chatMessages, setChatMessages] = useState([]);

    const [lPolicies, setLPolicies] = useState([]);
    const [fPolicies, setFPolicies] = useState([]);
    const history = useHistory();
    const toggleLPolicy = indexToFlip => {
        setLPolicies(currentCards =>
            currentCards.map((card, index) => {
                if (index === indexToFlip) {
                    return { ...card, flipped: !card.flipped };
                }
                return card;
            }),
        );
    };
    const toggleFPolicy = indexToFlip => {
        setFPolicies(currentCards =>
            currentCards.map((card, index) => {
                if (index === indexToFlip) {
                    return { ...card, flipped: !card.flipped };
                }
                return card;
            }),
        );
    };

    const sendChatMessage_ = msg => {
        sendChatMessage(msg).then(
            res => {
                setChatMessages([...chatMessages, res.message]);
            },
            err => handleRequestError(err, modalContext.showAlert),
        );
    };

    const spawnLPolicy = () => {
        setLPolicies(currentPolicies => [
            ...currentPolicies,
            {
                flipped: false,
            },
        ]);
    };
    const spawnFPolicy = () => {
        setFPolicies(currentPolicies => [
            ...currentPolicies,
            {
                flipped: false,
            },
        ]);
    };

    const [action, setAction] = useState(undefined);

    const { sendMessage } = useWebSocket(socketURL, {
        onOpen: () => {
            console.log("opened ws");
        },
        shouldReconnect: () => true,
        onMessage: event => handleWSMessage(event),
    });

    const handleWSMessage = event => {
        const msg = JSON.parse(event.data);
        console.log(msg);
        if (msg.type != null) {
            switch (msg.type) {
                case "gameInfo":
                    setGameInfo(msg);
                    setCurrentAction(msg.currentAction);
                    break;
                case "greeting":
                    break;
                case "action":
                    setCurrentAction(msg);
                    if (msg.actionType === "legislative" && msg.status === "end") {
                        //{msg.actionSpecs.policy} policy enacted!
                    }
                    break;
                case "newChatMessage":
                    setChatMessages([...chatMessages, msg.message]);
                    break;
            }
        } else {
            console.warn("Unknown WS message");
        }
    };

    const userContext = useContext(UserContext);
    const modalContext = useContext(ModalContext);

    useEffect(() => {
        console.log("woop", userContext.loggedIn);
        if (!userContext.loggedIn) {
            modalContext.setOpenModal("signInDecision");
        } else if (userContext.userData != null) {
            if (modalContext.openModal === "signInDecision") {
                modalContext.setOpenModal(null);
            }
        }
    }, [userContext.loggedIn, userContext.userData]);

    const registerWS = () => {
        sendMessage(JSON.stringify({ type: "register", token: userContext.token }));
        setRegistered(true);
    };

    useEffect(() => {
        if (userContext.loggedIn && userContext.userData && userContext.token != null) {
            joinGame(props.match.params.gameID).then(
                res => {
                    userContext.setGame(props.match.params.gameID);
                    registerWS();
                },
                err => {
                    handleRequestError(err, modalContext.showAlert);
                },
            );
        }
    }, [userContext.loggedIn, userContext.userData, userContext.token]);

    return userContext.loggedIn && registered && gameInfo != null ? (
        <div className={styles.body}>
            <div className={styles.game}>
                <div className={styles.gameInfo}>
                    {gameInfo.yourRole !== "spectator" && (
                        <h3 className={styles.role}>
                            You are: {gameInfo.yourRole === "liberal" && <span className={styles.Liberal}>Liberal</span>}
                            {gameInfo.yourRole === "fascist" && <span className={styles.Fascist}>Fascist</span>}
                            {gameInfo.yourRole === "hitler" && <span className={styles.Fascist}>Hitler</span>}
                        </h3>
                    )}
                    {gameInfo.currentAction != null && gameInfo.currentAction.name === "nomination" && (
                        <div>
                            <h2 className={styles.action}>Legislative Session</h2>
                            <p className={styles.actionDescription}>The President and Chancellor now work together to enact a new policy.</p>
                        </div>
                    )}
                    {gameInfo.currentAction != null && gameInfo.currentAction.name === "election" && (
                        <div>
                            <h2 className={styles.action}>Legislative Session</h2>
                            <p className={styles.actionDescription}>The President and Chancellor now work together to enact a new policy.</p>
                        </div>
                    )}
                    {gameInfo.currentAction != null && gameInfo.currentAction.name === "legislative" && (
                        <div>
                            <h2 className={styles.action}>Legislative Session</h2>
                            <p className={styles.actionDescription}>The President and Chancellor now work together to enact a new policy.</p>
                        </div>
                    )}
                </div>

                <div>
                    <div style={{ backgroundImage: `url(${libTrack})` }} className={styles.track}>
                        {lPolicies.map((policy, index) => (
                            <PolicyCard type={"liberal"} onClick={() => toggleLPolicy(index)} flipped={policy.flipped} index={index} />
                        ))}
                    </div>
                    {/*<VoteCard/>*/}
                </div>
                <div>
                    <div style={{ backgroundImage: `url(${fasTrack5_6})` }} className={styles.track}>
                        {fPolicies.map((policy, index) => (
                            <PolicyCard type={"fascist"} onClick={() => toggleFPolicy(index)} flipped={policy.flipped} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.overlay}></div>
            <div className={styles.sidebar}>
                <div className={styles.wordmarkWrapper}>
                    <Wordmark inverted={true} />
                </div>
                <Chat messages={chatMessages} sendMessage={sendChatMessage_} />
                <Players players={gameInfo.players} president={gameInfo.president} chancellor={gameInfo.chancellor} />
                {/*<GamePanel/>*/}
            </div>
        </div>
    ) : (
        <div>
            <code>
                <p>Logged in: {userContext.loggedIn ? "Yes" : "No"}</p>
                <p>Registered: {registered ? "Yes" : "No"}</p>
                <p>gameInfo: {JSON.stringify(gameInfo, null, 4)}</p>
            </code>
        </div>
    );
}
