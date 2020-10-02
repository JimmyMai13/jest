const Base = new (require('../base'))();
const fs = require('fs');
const testPlan = JSON.parse(fs.readFileSync('./tests/test_plans/user-search-test-plan.json', 'utf8'));
const querystring = require('querystring');
import each from 'jest-each';
const expect = require('chai').expect;
const _ = require('lodash');

describe('user tests', function() {

    // only use this if not using concurrent
    // beforeAll (function () {
    //     deleteAllUsers(Base.Users.getUsers()['body'])
    //     createUserTestData();
    // })

    each(testPlan['testUserSearch']).test.concurrent('test user search', async function(query, expected) {
        let qs = querystring.stringify(query);
        console.log(qs);
        let resp = Base.Users.getUsers(`?q=${qs}`);
        console.log(JSON.stringify(resp['body'], null, 4))
        console.log(resp['statusCode'])

        for (let i=0; i<expected['responseBody'].length; i++) {
            expect(_.omit(resp['body'][i], ['created_at', 'updated_at', 'identities.0.connection']))
                .to.deep.equal(_.omit(expected['responseBody'][i], ['created_at', 'updated_at', 'identities.0.connection']))
        }
        expect(resp['statusCode']).to.equal(expected['statusCode']);

    });

    test.concurrent('test get user by id', async function() {
        let randomUser = Base.getRandomUser();
        let getUserById = Base.Users.getUserById(randomUser['user_id'])
        expect(_.omit(getUserById['body'], ['created_at', 'updated_at', 'identities.0.connection']))
            .to.deep.equal(_.omit(randomUser, ['created_at', 'updated_at', 'identities.0.connection']))
        expect(getUserById['statusCode']).to.equal(200);
    });

});




