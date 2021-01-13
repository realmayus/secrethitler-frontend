import React, { useContext } from "react";
import styles from "./NewsMessage.module.scss";
import { trimString } from "../../util";
import { ModalContext } from "../../App";

export default function NewsMessage(props) {
    const modalContext = useContext(ModalContext);
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.headline}>{props.headline}</h3>
            <p className={styles.previewText}>
                {trimString(props.children, 160)}…{" "}
                <button className={styles.readMore} onClick={() => modalContext.showAlert(props.headline, props.children)}>
                    ➞ Read more
                </button>
            </p>
        </div>
    );
}
