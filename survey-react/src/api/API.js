const api = 'http://localhost:8080';
const headers = {
    'Accept': 'application/json'
};

export const doRegister = (payload) =>
    fetch(`${api}/register`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },

        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        console.log("in response");

        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const doVerify = (payload) =>
    fetch(`${api}/verifycode`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSubmitSurvey = (payload) =>
    fetch(`${api}/submitsurvey`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });