import React from "react";
import styles from "./Wordmark.module.scss";

export default function Wordmark(props) {
    return(
        <h1 className={(props.inverted ? styles.wordmarkInv : styles.wordmark) + " no-select"}>SECRET HITLER</h1>
    )
}