import React, {useEffect, useState, useContext} from "react";
import styles from "./Game.module.scss";
import libTrack from "../assets/tracks/trackLiberal.png";
import fasTrack5_6 from "../assets/tracks/trackFascist_5-6.png";
import Players from "../components/Panels/Players";
import Chat from "../components/Panels/Chat";
import PolicyCard from "../components/Cards/PolicyCard";
import Wordmark from "../components/Wordmark";
import useWebSocket  from 'react-use-websocket';
import {socketURL} from "../api";
import {useHistory} from "react-router-dom";
import {UserContext} from "../App";

export default function Game(props) {
    useEffect(() => {
        document.title = props.match.params.gameID;
    }, [props.match.params.gameID])

    const [lPolicies, setLPolicies] = useState([]);
    const [fPolicies, setFPolicies] = useState([]);
    const history = useHistory();
    const toggleLPolicy = (indexToFlip) => {
        setLPolicies(currentCards =>
            currentCards.map((card, index) => {
                    if(index === indexToFlip) {
                        return { ...card, flipped: !card.flipped }
                    }
                    return card
                }
            ));
    }
    const toggleFPolicy = (indexToFlip) => {
        setFPolicies(currentCards =>
            currentCards.map((card, index) => {
                    if(index === indexToFlip) {
                        return { ...card, flipped: !card.flipped }
                    }
                    return card
                }
            ));
    }

    const spawnLPolicy = () => {
        setLPolicies((currentPolicies) => [...currentPolicies, {
            flipped: false
        }])

    }
    const spawnFPolicy = () => {
        setFPolicies((currentPolicies) => [...currentPolicies, {
            flipped: false
        }])
    }

    const [action, setAction] = useState(undefined);

    // const {
    //     sendMessage
    // } = useWebSocket(socketURL, {
    //     onOpen: () => {
    //         console.log("opened ws")
    //     },
    //     shouldReconnect: () => true,
    //     onMessage: (event) => handleWSMessage(event)
    // })
    //
    // const handleWSMessage = (event) => {
    //     const msg = JSON.parse(event.data);
    //     console.log(msg);
    //
    // }

    const userContext = useContext(UserContext);
    if(!userContext.loggedIn) {
        history.push("/login/" + encodeURI("game/" + props.match.params.gameID))

        return (
            <div className={styles.body}>
                <h3>Checking if you're logged in...</h3>
            </div>
        )
    }
    return (
        <div className={styles.body}>
            <div className={styles.game}>

                { action === "nomination" &&
                <div>
                    <h2 className={styles.action}>Legislative Session</h2>
                    <p className={styles.actionDescription}>The President and Chancellor now work together to enact a new policy.</p>
                    <h3 className={styles.role}>You are: <span className={styles.Liberal}>Liberal</span></h3>
                    <button style={{color: "#000000"}} onClick={spawnLPolicy}>Spawn Liberal policy</button>
                    <button style={{color: "#000000"}} onClick={spawnFPolicy}>Spawn Fascist policy</button>
                </div>
                }

                { action === "election" &&
                    <div>
                        <h2 className={styles.action}>Legislative Session</h2>
                        <p className={styles.actionDescription}>The President and Chancellor now work together to enact a new policy.</p>
                        <h3 className={styles.role}>You are: <span className={styles.Liberal}>Liberal</span></h3>
                        <button style={{color: "#000000"}} onClick={spawnLPolicy}>Spawn Liberal policy</button>
                        <button style={{color: "#000000"}} onClick={spawnFPolicy}>Spawn Fascist policy</button>
                    </div>
                }

                { action === "legislative" &&
                <div>
                    <h2 className={styles.action}>Legislative Session</h2>
                    <p className={styles.actionDescription}>The President and Chancellor now work together to enact a new policy.</p>
                    <h3 className={styles.role}>You are: <span className={styles.Liberal}>Liberal</span></h3>
                    <button style={{color: "#000000"}} onClick={spawnLPolicy}>Spawn Liberal policy</button>
                    <button style={{color: "#000000"}} onClick={spawnFPolicy}>Spawn Fascist policy</button>
                </div>
                }



                <div>
                    <div style={{backgroundImage: `url(${libTrack})`}} className={styles.track}>
                        {
                            lPolicies.map((policy, index) => <PolicyCard type={"liberal"} onClick={() => toggleLPolicy(index)} flipped={policy.flipped} index={index}/>)
                        }
                    </div>
                    {/*<VoteCard/>*/}
                </div>
                <div>
                    <div style={{backgroundImage: `url(${fasTrack5_6})`}} className={styles.track}>
                        {
                            fPolicies.map((policy, index) => <PolicyCard type={"fascist"} onClick={() => toggleFPolicy(index)} flipped={policy.flipped} index={index}/>)
                        }
                    </div>
                </div>
            </div>
            <div className={styles.sidebar}>
                <Wordmark/>
                <Chat/>
                <Players/>
                {/*<GamePanel/>*/}
            </div>
        </div>
    )
}