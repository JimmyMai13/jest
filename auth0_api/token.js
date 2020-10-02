const request = require('sync-request')

class Token {

    constructor(apiHost) {
        this.apiHost = apiHost
    }

    createOAuthToken(body=`grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}&audience=${this.apiHost}/api/v2/`) {
        let res = request(
            'POST',
            `${this.apiHost}/oauth/token`,
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: body
            }
        )

        return JSON.parse(res.getBody('utf8'))
    }
}
module.exports = Token;