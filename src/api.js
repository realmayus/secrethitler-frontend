export const apiURL = "http://localhost:5000";
export const socketURL = "ws://localhost:5000";


export const getLobbies = async () => {
    return fetch(apiURL + "/game/lobbies", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }).then(res => {
        console.log(res)
        if(res.status >= 200 && res.status <= 299) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    })
}
export const sendChatMessage = async (message) => {
    return fetch(apiURL + "/game/sendMessage", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            message
        })
    }).then(res => {
        console.log(res)
        if(res.status >= 200 && res.status <= 299) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    })
}

export const login = async (username, password) => {
    return fetch(apiURL + "/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(res => {
        console.log(res)
        if(res.status >= 200 && res.status <= 299) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    })
}

export const signup = async (email, username, password) => {
    return fetch(apiURL + "/auth/signup", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    }).then(res => {
        console.log(res)
        if(res.status >= 200 && res.status <= 299) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    })
}

export const signout = async () => {
    return fetch(apiURL + "/auth/logout", {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    }).then(res => {
        if(res.status >= 200 && res.status <= 299) {
            return "yay";
        } else {
            return Promise.reject(res);
        }
    })
}

export const requestTemporaryAccount = async () => {
    return fetch(apiURL + "/auth/temp", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        if(res.status >= 200 && res.status <= 299) {
            console.log("OK")
            return res.json();
        } else {
            console.log("Not OK")
            return Promise.reject(res);
        }
    })
}

export const checkIfLoggedIn = async () => {
    return fetch(apiURL + "/auth/checkLoginStatus", {
        credentials: 'include',
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }).then(res => {
        if(res.status >= 200 && res.status <= 299) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    })

}

export const createGame = async (name, minPlayers, maxPlayers) => {
    return fetch(apiURL + "/game/create", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            name,
            minPlayers,
            maxPlayers
        })
    }).then(res => res.json())
}

export const joinGame = async (gameID) => {
     return fetch(apiURL + "/game/join", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            gameID
        })
    }).then(res => {
        if(res.status >= 200 && res.status <= 299) {
         return res.json();
     } else {
         return Promise.reject(res);
     }}
     );

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