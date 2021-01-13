import React, { useState } from "react";
import styles from "./BallotCard.module.scss";
import ballotBack from "../../assets/cards/ballot_back.png";
import ballotJa from "../../assets/cards/ballot_ja.png";
import ballotNein from "../../assets/cards/ballot_nein.png";

export default function VoteCard(props) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div className={styles.card + " " + styles.initialPosition} onClick={() => setFlipped(!flipped)}>
            <div className={styles.cardInner + (flipped ? " " + styles.flipped : "")}>
                <div className={styles.cardFront}>
                    <img className={styles.cardImage} src={ballotBack} alt="Back of ballot card" />
                </div>
                <div className={styles.cardBack}>
                    <img className={styles.cardImage} src={ballotJa} alt="Ballot card saying 'Ja' ('Yes')" />
                </div>
            </div>
        </div>
    );
}
