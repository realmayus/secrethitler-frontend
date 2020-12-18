import React from "react"
import styles from "./NewsMessage.module.scss";
import {trimString} from "../../util";

export default function NewsMessage(props) {
    return(
        <div className={styles.wrapper}>
            <h3 className={styles.headline}>{props.headline}</h3>
            <p className={styles.previewText}>{trimString(props.children, 160)}… <a className={styles.readMore} href="#" onClick={() => alert("hi")}>➞ Read more</a></p>
        </div>
    )
}