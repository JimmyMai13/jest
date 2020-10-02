const request = require('sync-request')

class Clients {

    constructor(apiHost, token) {
        this.apiHost = apiHost
        this.token = token

    }

    getClients() {
        let res = request(
            'GET',
            `${this.apiHost}/api/v2/clients`,
            {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            }
        )
        return JSON.parse(res.getBody('utf8'))
    }

    createClient(body) {
        let res = request(
            'POST',
            `${this.apiHost}/api/v2/clients`,
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
module.exports = Clients;