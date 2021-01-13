import React from "react";
import BlueBox from "./BlueBox";
import styles from "./Stats.module.scss";

export default function Stats(props) {
    return (
        <BlueBox>
            <h2 className={styles.headlineB}>Stats</h2>
            <div className={styles.statRow}>
                <span className={styles.statType}>Lobbies active:</span> <span className={styles.stat}>45</span>
            </div>
            <div className={styles.statRow}>
                <span className={styles.statType}>Players online:</span> <span className={styles.stat}>145</span>
            </div>
            <div className={styles.statRow} style={{ marginBottom: "5px" }}>
                <span className={styles.statType}>Win rate:</span> <span className={styles.textLiberal}>Liberals</span> <span className={styles.stat}>45%</span>
            </div>
            <div className={styles.statRow} style={{ marginTop: "0px" }}>
                <span className={styles.textFascist}>Fascists</span> <span className={styles.stat}>55%</span>
            </div>
        </BlueBox>
    );
}
