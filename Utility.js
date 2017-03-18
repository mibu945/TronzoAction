import Config from './config'
export default class Client {
    static _fetch(url, method, body, cb) {
        return fetch(url, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt"),
                },
            method: method,
            body: body
        }).then(checkStatus)
        .then(parseJSON)
        .then(res => {
            if(res.error){
                return cb(res.error, null);
            } else {
                return cb(null, res);
            }
        });
    }
    static _fetch2(url, method, body, cb) {
        return fetch(url, {
            headers: {
                //"Accept": "application/json, */*",
                //"Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("jwt"),
            },
            method: method,
            body: body
        }).then(checkStatus)
        .then(parseJSON)
        .then(res => {
            if(res.error){
                return cb(res.error, null);
            } else {
                return cb(null, res);
            }
        });
    }
}

function checkStatus(response) {
    if ((response.status >= 200 && response.status < 300) || response.status === 400) {
 //       console.log(response);
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }
}
function parseJSON(response) {
  return response.json();
}

