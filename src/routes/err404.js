import React from "react";
import styles from "./err404.module.scss";
import card404 from "../assets/404.png";
import {Link} from "react-router-dom";

export default function err404() {
    return(
        <div>
            <div className={styles.content}>
                    <img draggable="false" alt="404 - Not Found" src={card404}/>
                    <p><Link to={"/"}>➞ Take me home</Link></p>
            </div>
        </div>
    )
}