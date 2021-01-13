import React, { useEffect } from "react";
import styles from "./ProfileCircle.module.scss";

export default function ProfileCircle({ player }) {
    useEffect(() => {
        console.log(player);
    }, [player]);
    return (
        <div className={styles.avatarWrapper} title={player != null ? player.username + ":" + player.userID : ""}>
            {player != null && <img alt={player.username} src={player.avatar} />}
        </div>
    );
}
