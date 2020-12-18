import React from "react"
import {Route, Switch} from "react-router-dom"
import Home from "./routes/Home";
import HomeNew from "./routes/HomeNew";
import Lobbies from "./routes/Lobbies";
import err404 from "./routes/err404";
import Game from "./routes/Game";


export default function Router(props) {
    return(
        <main>
            <Switch>
                <Route exact path="/" component={HomeNew}/>
                <Route exact path="/lobbies" component={Lobbies}/>
                <Route exact path="/game/:gameID" component={Game}/>
                <Route exact path="/g/:gameID" component={Game}/>
                <Route path="/" component={err404}/>
            </Switch>
        </main>
    )
}


