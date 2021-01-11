import React from "react";
import styles from "./Textbox.module.scss";


export default function Textbox(props) {
    return(
        <label className={styles.label}>
            {props.label}
            <input type={props.type} onChange={props.onChange} value={props.value} className={styles.input}/>
        </label>
    )
}