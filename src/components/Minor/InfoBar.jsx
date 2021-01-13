import React from "react";
import styles from "./InfoBar.module.scss";
import warning from "../../assets/warning.svg";
import Anime from "./Anime";

export default function InfoBar({ type, message, moreOnClick }) {
    return (
        <Anime translateY={[-50, 0]} easing={"easeOutExpo"}>
            <div className={styles.wrapper}>
                {type === "warning" && <img alt="warning" src={warning} className={styles.icon} />}
                <span className={styles.message}>{message}</span>
                {moreOnClick != null && (
                    <button onClick={moreOnClick} className={styles.more}>
                        ➞ More
                    </button>
                )}
            </div>
        </Anime>
    );
}
