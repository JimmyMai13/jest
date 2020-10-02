const request = require('sync-request');


class Users {

    constructor(apihost, token) {
        this.token = token
        this.apiHost = apihost
    }

    createUser(body) {
        console.log(body)
        let res = request(
            'POST',
            `${this.apiHost}/api/v2/users`,
            {
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                },
                json: body
            }
        )
        return JSON.parse(res.getBody('utf8'))
    }

    deleteUser(userID) {
        let res = request(
            'DELETE',
            `${this.apiHost}/api/v2/users/${userID}`,
            {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }
        )
        return res.getBody('utf8')
    }

    getUsers(query='') {
        let res = request(
            'GET',
            `${this.apiHost}/api/v2/users${query}`,
            {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }
        )
        return {'statusCode': res.statusCode, 'body': JSON.parse(res.getBody('utf8')), 'headers': res.headers}
    }

    getUserById(userID) {
        let res = request(
            'GET',
            `${this.apiHost}/api/v2/users/${userID}`,
            {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }
        )
        return {'statusCode': res.statusCode, 'body': JSON.parse(res.getBody('utf8')), 'headers': res.headers}
    }

}
module.exports = Users;

