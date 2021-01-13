import React from "react";
import Wordmark from "./Wordmark";
import Button from "./Button";
import styles from "./Header.module.scss";

export default function Header(props) {
    return (
        <header className={styles.header}>
            <Button text={"Join a lobby"} />
            <Wordmark />
            <Button text={"Sign In"} />
        </header>
    );
}
