import React, { useContext } from "react";
import styles from "./GameLobbyCard.module.scss";
import { populateArrayToLength } from "../../util";
import ProfileCircle from "../Minor/ProfileCircle";
import RightArrow from "../../assets/rightArrow.svg";
import Lock from "../../assets/lock.svg";
import { UserContext } from "../../App";
import FadeInSection from "../Minor/FadeScrollSection";

export default function GameLobbyCard({ gameID, name, author, currentPlayers, maxPlayers, joinedPlayers, onClick, locked }) {
    const userContext = useContext(UserContext);

    return (
        <FadeInSection delay={400}>
            <button className={styles.blueBox} onClick={() => onClick(gameID)}>
                <div className={styles.playerCountWrapper}>
                    <div>
                        <span className={styles.currentPlayers}>{currentPlayers}</span> <span className={styles.maxPlayers}>of {maxPlayers}</span>
                    </div>
                </div>
                <div className={styles.centerColumn}>
                    <div className={styles.nameRow}>
                        <span className={styles.name}>{name}</span> <span className={styles.author}>{author == null ? undefined : author.username}</span>{" "}
                        {locked && <img alt="Protected by password" src={Lock} className={styles.lock} />}
                    </div>
                    <div className={styles.playerListWrapper}>
                        {populateArrayToLength(joinedPlayers, maxPlayers).map((item, index) => (
                            <ProfileCircle player={userContext.getOtherUserData(item)} key={index} />
                        ))}
                    </div>
                </div>
                <img src={RightArrow} alt="Open Game" className={styles.rightArrow} />
            </button>
        </FadeInSection>
    );
}
