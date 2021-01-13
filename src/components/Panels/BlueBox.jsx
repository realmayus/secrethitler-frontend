import React from "react";
import styles from "./BlueBox.module.scss";

export default function BlueBox(props) {
    return <div className={styles.box}>{props.children}</div>;
}
