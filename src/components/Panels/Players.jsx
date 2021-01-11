import React, {useContext} from "react";
import styles from "./Players.module.scss";
import ProfileCircle from "../Minor/ProfileCircle";
import {UserContext} from "../../App";


export default function Players(props) {
    const userContext = useContext(UserContext);
    return(
        <div className={styles.wrapper}>
            <h3 className={styles.headline}>Players</h3>
            <div className={styles.avatars}>
                {props.players.map((id) =>
                    <div>
                        <ProfileCircle player={userContext.getOtherUserData(id)} key={id}/>
                        <p>{userContext.getOtherUserData(id).username}</p>
                        {props.chancellor != null && props.chancellor === id &&
                            <span>Chancellor</span>
                        }

                        {props.president != null && props.president === id &&
                        <span>President</span>
                        }
                    </div>
                    )}
            </div>
        </div>
    )
}