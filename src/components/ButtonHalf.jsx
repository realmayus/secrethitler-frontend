import React from "react";
import styles from "./ButtonHalf.module.scss";

export default function ButtonHalf({text, onClick}) {
    return <button className={styles.button} onClick={onClick}>{text}</button>
}