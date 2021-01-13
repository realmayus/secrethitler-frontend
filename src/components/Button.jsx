import styles from "./Button.module.scss";
import React from "react";

export default function Button(props) {
    return (
        <button className={styles.buttonHome + " " + props.className} onClick={props.onClick}>
            {props.text}
        </button>
    );
}
