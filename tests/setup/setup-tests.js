const Base = new (require('../../base'))();
const fs = require('fs');
const testPlan = JSON.parse(fs.readFileSync('./tests/test_plans/user-search-test-plan.json', 'utf8'));

describe('user tests', function() {

    test('test setup', function() {
        Base.deleteAllUsers(Base.Users.getUsers()['body'])
        Base.createUserTestData(testPlan['createUserTestData']);
    });

});




