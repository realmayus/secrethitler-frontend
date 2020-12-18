import React from "react";
import styles from "./ProfileCircle.module.scss";

export default function ProfileCircle({player}) {
    return(
        <div className={styles.avatarWrapper}>
            {/*{ player != null &&*/}
            {/*    <img alt={player.username} src={player.avatar}/>*/}
            {/*}*/}
        </div>
    )
}