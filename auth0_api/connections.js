const request = require('sync-request')

class Connections {

    constructor(apiHost, token) {
        this.apiHost = apiHost
        this.token = token

    }

    getConnections() {
        let res = request(
            'GET',
            `${this.apiHost}/api/v2/connections`,
            {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }
        )
        return JSON.parse(res.getBody('utf8'))
    }

    createConnection(body) {
        let res = request(
            'POST',
            `${this.apiHost}/api/v2/connections`,
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

}
module.exports = Connections;