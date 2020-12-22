import React, {useContext, useState, useEffect} from "react";
import styles from "./SignIn.module.scss";
import Modal from "react-modal";
import {ModalContext, UserContext} from "../../App";
import ButtonHalf from "../ButtonHalf";
import {requestTemporaryAccount} from "../../api";
import {handleRequestError} from "../../util";
import Textbox from "../Input/Textbox";


Modal.setAppElement('#root');

export default function SignIn(props) {

    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);

    const closeModal = () => {
        modalContext.setOpenModal("");
        resetFields();
    }

    const resetFields = () => {
        setUsername("");
        setPassword("");
    }

    useEffect(() => {
        if (modalContext.openModal !== "signIn") {
            resetFields();
        }
    }, [modalContext.openModal])


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <Modal
            isOpen={modalContext.openModal === "signIn"}
            onRequestClose={closeModal}
            contentLabel={"Sign in"}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2 className={styles.headline}>Sign In</h2>
            <p>Don't want to create an account? Play with a <button>temporary account</button></p>
            <div className={styles.inputs}>
                <Textbox label={"Username"} type={"text"} onChange={(e) => setUsername(e.target.value)} value={username}/>
                <Textbox label={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button style={{marginTop: 10}} onClick={() => modalContext.setOpenModal("forgot")}>Recover account</button>
            </div>

            <div className={styles.buttonBox}>
                <ButtonHalf text="Sign In" onClick={() => {
                    requestTemporaryAccount().catch(err => handleRequestError(err, modalContext.showAlert)).then( res => {
                            userContext.setUserData(res);
                            userContext.setLoggedIn(true);
                        }
                    )
                }}/>
                    <button onClick={() => modalContext.setOpenModal("signUp")}>Sign Up</button>
            </div>
        </Modal>
    )
}