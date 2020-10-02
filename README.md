# Jest

### Install

1. Install [nodejs](https://nodejs.org/en/download/)

2. ```$ npm install``` in project root

### Environment Variables or set values in jest.config.js in globals section

1. ```$ export APIHOST=<apihost>```
2. ```$ export CLIENTID=<client id>```
3. ```$ export CLIENTSECRET=<client secret>``` 

### Usage

Running with concurrent improves test execution for parallel testing. When running with concurrent, before/after blocks does not work correctly with Jest and is a known issue. A work around for this is to execute the test setup once before running full suite. 

To run this one time setup :

- ```npx jest --config=jest.config.js tests/setup/setup-tests.js```

If there is strong desire to run with before/after blocks, can uncomment the beforeAll block and remove ".concurrent" from file to run tests sequentially.

To run tests:

- ```npx jest --config=jest.config.js tests/user-tests.js```
