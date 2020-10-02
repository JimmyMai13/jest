class Base {

    constructor(apiHost=apihost, token='') {
        this.Token = new (require('./auth0_api/token'))(apiHost);
        let auth = this.authenticateUser(apiHost, token);
        this.Clients = auth['Clients'];
        this.Connections = auth['Connections'];
        this.Users = auth['Users'];
    }

     authenticateUser(apiHost, accessToken) {
        if (!accessToken) {
            accessToken = this.Token.createOAuthToken()['access_token'];
        }
        if (!apiHost) {
            apiHost = apihost;
        }
        console.log(accessToken)
        const Clients = new (require('./auth0_api/clients'))(apiHost, accessToken);
        const Connections = new (require('./auth0_api/connections'))(apiHost, accessToken);
        const Users = new (require('./auth0_api/users'))(apiHost, accessToken);
        return {Clients: Clients, Connections: Connections, Users: Users}
    }

    createUserTestData(testPlan) {
        for (let i=0; i<testPlan.length; i++) {
            testPlan[i]['connection'] = this.getRandomConnection()['name'];
            console.log(this.Users.createUser(testPlan[i]));
        }
    }

    deleteAllUsers(usersList) {
        let reservedUsers = [''];
        for (let i=0; i<usersList.length; i++) {
            if (!reservedUsers.includes(usersList[i]['user_id'])) {
                this.Users.deleteUser(usersList[i]['user_id'])
            }
        }
    }

    getRandomConnection() {
        let conn = this.Connections.getConnections();
        let randInt = Math.floor(Math.random() * conn.length-1) + 1
        if (conn[randInt]['name'] === "google-oauth2") {
            if (randInt === 0) {
                return conn[randInt+1];
            } else {
                return conn[randInt-1];
            }
        } else {
            return conn[randInt];
        }
    }

    getRandomUser() {
        let users = this.Users.getUsers()['body'];
        let randInt = Math.floor(Math.random() * users.length-1) + 1
        return users[randInt];
    }

}
module.exports = Base;