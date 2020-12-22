import React, {useContext} from "react";
import styles from "./About.module.scss";
import Modal from "react-modal";
import {ModalContext} from "../../App";


Modal.setAppElement('#root');

export default function About(props) {

    const modalContext = useContext(ModalContext);

    const closeModal = () => {
        modalContext.setOpenModal("");
    }

    return(
        <Modal
            isOpen={modalContext.openModal === "about"}
            onRequestClose={closeModal}
            contentLabel={"About"}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2 className={styles.headline}>About</h2>
            <h3>Source Code</h3>
            <p>The game's source code can be found on the official repos on GitHub.</p>
            <a href={"https://github.com/realmayus/secrethitler-frontend/"}>➞ Frontend</a> <br/>
            <a href={"https://github.com/realmayus/secrethitler-backend/"}>➞ Backend</a>

            <h3>License</h3>
            <p>This adaptation of Secret Hitler is licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons BY-NC-SA 4.0</a></p>
            <p>© realmayus and other contributors</p>
            <h3>Original Game</h3>
            <p>The original tabletop game can be found here: <a href="https://www.secrethitler.com/">https://www.secrethitler.com/</a> <br/>© Max Temkin, Mike Boxleiter, Tommy Maranges, and Mackenzie Schubert; licensed under Creative Commons BY-NC-SA 4.0 </p>
            <p>Many graphics, including the tracks and the cards have been borrowed from the original game. </p>
        </Modal>
    )
}