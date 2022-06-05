const events = require('events');
const fetch = require('node-fetch');

class Client extends events.EventEmitter {
    constructor() {
        super();

        
    }

    login(email, password){
        if(!email || !password){
            throw new Error('Email and password are required');
        }

        
    }
}

module.exports = Client;