import React from "react"
import BlueBox from "./BlueBox";
import styles from "./News.module.scss";
import NewsMessage from "./NewsMessage";


export default function News(props) {
    return(
        <BlueBox>
            <h2 className={styles.headlineB}>News</h2>
            <div className={styles.newsWrapper}>
                <NewsMessage headline="We created a discord server!">
                    We created a discord server so that players can play games on there together, with voicechat, and socialize. You can also message the devs and mods on there and report issues. Click this link to join: https://discord.gg/8x6HmGr2jD
                </NewsMessage>
                <NewsMessage headline="We created a discord server!">
                    We created a discord server so that players can play games on there together, with voicechat, and socialize. You can also message the devs and mods on there and report issues. Click this link to join: https://discord.gg/8x6HmGr2jD
                </NewsMessage>
                <NewsMessage headline="We created a discord server!">
                    We created a discord server so that players can play games on there together, with voicechat, and socialize. You can also message the devs and mods on there and report issues. Click this link to join: https://discord.gg/8x6HmGr2jD
                </NewsMessage>
                <NewsMessage headline="We created a discord server!">


                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim

                </NewsMessage>

            </div>
        </BlueBox>
    )
}