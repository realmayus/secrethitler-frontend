export const apiURL = "http://localhost:5000";
export const socketURL = "http://localhost:5000";


export const login = async (username, password) => {
    return fetch(apiURL + "/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(res => {
        if(res.status >= 200 && res.status <= 299) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    })
}

export const checkIfLoggedIn = async () => {
    return fetch(apiURL + "/auth/checkLoginStatus", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        if(res.status >= 200 && res.status <= 299) {
            return res.json();
        } else {
            return Promise.reject(res.status);
        }
    })

}

export const createGame = async (name, minPlayers, maxPlayers, token) => {
    return fetch(apiURL + "/game/create", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            minPlayers,
            maxPlayers,
            token
        })
    }).then(res => res.json())
}

export const joinGame = async (gameID, token) => {
     return fetch(apiURL + "http://localhost:5000/game/join", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            gameID,
            token
        })
    }).then(res => res.json());

}

export const nominate = async (nominee, token) => {
    return fetch(apiURL + "/game/nomination", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nomineeID: nominee,
            token: token
        })
    }).then(res => res.json());
}

export const vote = async (choice, token) => {
    return fetch(apiURL + "/game/election", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            vote: String(choice),
            token
        })
    }).then(res => res.json());
}
export const discardPolicy = async (policy, token) => {
    return fetch(apiURL + "/game/legislative", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            discard: policy,
            token
        })
    }).then(res => res.json());
}