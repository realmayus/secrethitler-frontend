import React from "react";
import styles from "./Home.module.scss";
import BlueBox from "../components/Panels/BlueBox";
import Stats from "../components/Panels/Stats";
import News from "../components/Panels/News";

export default function Home(props) {
    return(
        <main className={styles.body}>
            <div className={styles.bodyWrapper}>
                <div className={styles.text}>
                    <h2 className={styles.headlineB} style={{margin: "1em 0"}}>An online implementation of the social deduction game <a href="https://secrethitler.com" className={styles.merriweatherLink}>Secret Hitler</a>.</h2>
                    <strong>The year is 1932. The place is pre-WWII Germany. In Secret Hitler, players are German politicians attempting to hold a fragile Liberal government together and stem the rising tide of Fascism. Watch out though—there are secret Fascists among you, and one player is Secret Hitler.</strong>

                    <div className={styles.rules}>
                        <h1 className={styles.headline}>Overview</h1>
                        <p>At the beginning of the game, each player is secretly assigned to one of three roles: Liberal, Fascist , or  Hitler . The Liberals have a majority, but they don’t know for sure who anyone is; Fascists must resort to secrecy and sabotage to accomplish their goals.
                            Hitler plays for the Fascist team, and the Fascists know Hitler’s identity from the outset, but Hitler doesn’t know the Fascists and must work to figure them out.</p>

                        <p>Whenever a Fascist Policy is enacted, the government becomes more powerful, and the President is granted a single-use power which must be used before the next round can begin. It doesn’t matter what team the President is on; in fact, even Liberal players might be tempted to enact a Fascist Policy to gain new powers. </p>


                        <h1 className={styles.headline}>Object</h1>
                        <p>Every player has a secret identity as a member of either the Liberal team or the Fascist team. Players on the Liberal team win if either:</p>
                        <ul>
                            <li>Five liberal policies are enacted OR</li>
                            <li>Hitler is assassinated.</li>
                        </ul>
                        <p>Players on the Facist team win if either:</p>
                        <ul>
                            <li>Six Facist policies are enacted OR</li>
                            <li>Hitler is elected Chancellor any time after the third Fascist Policy has been enacted.</li>
                        </ul>


                        <h1 className={styles.headline}>Setup</h1>
                        <p>The 11 Fascist Policy tiles and the 6 Liberal Policy tiles are shuffled into a single Policy deck. Use the table below to determine the distribution of roles.</p>
                        <table className={styles.table}>
                            <tr>
                                <th># Players</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>10</th>
                            </tr>
                            <tr>
                                <td>Liberals</td>
                                <td>3</td>
                                <td>4</td>
                                <td>4</td>
                                <td>5</td>
                                <td>5</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>Fascists</td>
                                <td>1 + H</td>
                                <td>1 + H</td>
                                <td>2 + H</td>
                                <td>2 + H</td>
                                <td>3 + H</td>
                                <td>3 + H</td>
                            </tr>
                        </table>


                        <h1 className={styles.headline}>Gameplay</h1>
                        <h2 className={styles.subheading}>Election</h2>
                        1.   <strong>Pass the Presidential Candidacy</strong>
                        <p>At the beginning of a new round, the Presidency moves to the next player in the row.</p>
                        2.   <strong>Nominate a chancellor</strong>
                        <p>The presidential candidate chooses a Chancellor candidate. The Presidential candidate is free to discuss Chancellor options with all the other players to make it more likely the Government gets elected.</p>
                        3.   <strong>Vote on the Government</strong>
                        <p>Once the Chancellor candidate was chosen, every player, including the candidates themselves votes on the proposed Government.</p>
                        <p>If the election ends up in a tie or if the majority of players votes no, the election fails. The next player in the row becomes the Presidential candidate and the election failed. The election tracker advances.</p>

                        <em>Election Tracker:</em> If the group rejects three Governments in a row, the country is thrown into chaos. The policy on top of the policy deck gets revealed and enacted. The tracker resets every time a policy gets enacted, whether it was enacted by an elected Government or by the frustrated populance.

                        <p>If the majority of players votes yes, the Presidential candidate and the Chancellor candidate become the new President and Chancellor, respectively.</p>
                        <p>➡️ If three or more fascist policies have been enacted already and the new Chancellor is Hitler, the game is over and the Fascists win. Otherwise, other players know for sure the Chancellor is not Hitler.</p>

                        <h2 className={styles.subheading}>Legislative Session</h2>
                        <p>During the Legislative Session, the President and Chancellor work together to enact a new Policy in secret. The President draws the top three tiles from the Policy deck, looks at them in secret, and discards one tile face down into the Discard pile. The remaining two tiles go to the Chancellor, who looks in secret, discards one Policy tile face down, and enacts the remaining Policy by placing the tile face up on the corresponding track.</p>

                        <h2 className={styles.subheading}>Executive Action</h2>
                    </div>
                </div>


                <div className={styles.sidebar}>
                    <Stats/>
                    <News/>
                </div>
            </div>
        </main>
    )
}