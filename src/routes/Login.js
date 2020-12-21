import React, {useState, useContext} from "react";
import styles from "./Login.module.scss";
import {login} from "../api";
import {UserContext} from "../App";
import ButtonHalf from "../components/ButtonHalf";
import {useLocation, useHistory} from "react-router-dom";


export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userContext = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();

    const doLogin = (e) => {
        e.preventDefault();
        login(username, password).then(res => {
            userContext.setUserData(res);
            userContext.setLoggedIn(true);
            if(location.pathname.replace("/login", "").length > 0) {
                history.push(location.pathname.replace("/login", ""));
            }
        }).catch(err => {
            userContext.setLoggedIn(false);
            userContext.setUserData(undefined);
            console.log(err)
        })


    }

    return(
        <div className={styles.wrapper}>
            <div>
                <h1>Log in</h1>
                <form onSubmit={doLogin} className={styles.form}>
                    <input className={styles.textbox} type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input className={styles.textbox} type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <ButtonHalf text={"Log in"} onClick={() => ""}/>
                </form>
                { userContext.loggedIn &&
                    <div>
                        <code className={styles.code}>
                            {
                                JSON.stringify(userContext.userData, undefined, 4)
                            }
                        </code>

                        <p>-> Logged in as {userContext.userData.username}</p>
                    </div>
                }
            </div>
        </div>
    )
}