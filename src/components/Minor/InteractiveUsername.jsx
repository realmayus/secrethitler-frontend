import React from "react";
import styles from "./InteractiveUsername.module.scss";

export default function InteractiveUsername(props) {
    return (
        <div className={styles.wrapper}>
            <span>{props.user.username}</span>
        </div>
    );
}
