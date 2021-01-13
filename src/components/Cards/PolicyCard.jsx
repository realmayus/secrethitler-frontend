import React, { useState } from "react";
import styles from "./PolicyCard.module.scss";
import PolicyBack from "../../assets/cards/policy_back.png";
import PolicyFascist from "../../assets/cards/policy_fascist.png";
import PolicyLiberal from "../../assets/cards/policy_liberal.png";

export default function PolicyCard({ type, flipped, onClick, index }) {
    return (
        <div
            className={styles.card + " " + (flipped ? styles.endPosition + " " + styles[(type === "fascist" ? "F" : "L") + (index + 1)] : styles.initialPosition)}
            onClick={() => onClick()}
        >
            <div className={styles.cardInner + (flipped ? " " + styles.flipped : "")}>
                <div className={styles.cardFront}>
                    <img className={styles.cardImage} src={PolicyBack} alt="Back of policy card" />
                </div>
                <div className={styles.cardBack}>
                    {type === "liberal" && <img className={styles.cardImage} src={PolicyLiberal} alt="Liberal policy card" />}
                    {type === "fascist" && <img className={styles.cardImage} src={PolicyFascist} alt="Fascist policy card" />}
                </div>
            </div>
        </div>
    );
}
