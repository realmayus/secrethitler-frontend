import React, {useContext} from "react";
import styles from "./Lobbies.module.scss";
import Wordmark from "../components/Wordmark";
import {useHistory} from "react-router-dom";
import GameLobbyCard from "../components/Panels/GameLobbyCard";
import Stats from "../components/Panels/Stats";
import News from "../components/Panels/News";
import ButtonHalf from "../components/ButtonHalf";
import Filters from "../components/Panels/Filters";
import {ModalContext, UserContext} from "../App";
import SignInDecision from "../components/modal/SignInDecision";
import ProfileDropdown from "../components/Minor/ProfileDropdown";


const games = [
    {
        gameID: "aosdhoashdiu",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 3,
        maxPlayers: 5,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 4,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false
    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 8,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: true

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 5,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 6,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 8,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: true

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 8,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 4,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 1,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 9,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 3,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    },
    {
        gameID: "odijfgpdofijg",
        name: "test",
        author: {
            username: "mayu"
        },
        currentPlayers: 6,
        maxPlayers: 10,
        joinedPlayers: [
            {
                username: "mayu",
                avatar: "https://i.imgur.com/ipvRMO6.png"
            }
        ],
        locked: false

    }]

export default function Lobbies() {
    const history = useHistory();
    const modalContext = useContext(ModalContext);
    const userContext = useContext(UserContext);


    const openGame = (id) => {
        if(!userContext.loggedIn) {
            modalContext.setOpenModal("signInDecision")
        } else {
            if(id != null) {
                history.push("/game/" + id)
            } else {
                const freeGames = games.filter(game => (game.currentPlayers < game.maxPlayers))
                const bestGame = freeGames.sort((a, b) => a.currentPlayers < b.currentPlayers ? 1 : -1)[0]
                if(bestGame != null) {
                    history.push("/game/" + bestGame.gameID)
                }
            }
        }
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.profileDropdown}>
                <ProfileDropdown/>
            </div>
            <div className={styles.header}>
                <div>
                    <div className={styles.wordmarkWrapper}>
                        <Wordmark inverted={true} />
                    </div>
                    <h3 className={styles.pageTitle}>Lobbies</h3>
                    <div className={styles.buttonBox}>
                        <ButtonHalf text="Back" onClick={() => history.push("/")}/>
                        <ButtonHalf text="Quick Join" onClick={() => openGame()}/>
                        <ButtonHalf text="Create" onClick={() => history.push("/game/create")}/>
                    </div>

                </div>
            </div>


            <div className={styles.page}>
                <div className={styles.sidebarLeft}>
                    <Filters/>
                </div>

                <div className={styles.games}>
                    {
                        games.map((item, index) => (
                            <GameLobbyCard key={index}　onClick={() => openGame(item.gameID)} author={item.author} id={item.gameID} name={item.name} currentPlayers={item.currentPlayers} joinedPlayers={item.joinedPlayers} maxPlayers={item.maxPlayers} locked={item.locked}/>
                        ))
                    }
                </div>
                <div className={styles.sidebarRight}>
                    <Stats/>
                    <News/>
                </div>
                <SignInDecision/>
            </div>
        </div>
    )
}