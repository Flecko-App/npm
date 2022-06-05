import events from 'events';
import fetch from 'node-fetch';

class Client extends events.EventEmitter {
    constructor() {
        super();

        this.debug = false;
        this.api = this.debug ? `http://localhost:3000/v1` : `https://flecko.app/api/v1`;
        this.uid = null;
        this.user = null;

        this.users = {
            /**
             * 
             * @param {string} uid Either UUIDV4 or Custom ID or "me"
             */
            get: async (uid) => {
                if(!uid) throw new Error('User ID is required');

                try {
                    const res = await fetch(`${this.api}/users/${uid}`)
        
                    const data = await res.json();

                    if(data.code !== 200) throw new Error(data.msg);

                    let user = data.user;
                    user["groups"] = data.groups;

                    return user;
                } catch(e){
                    throw new Error(e);
                }
            }
        }
    }

    async stats(){
        try {
            const res = await fetch(`${this.api}/stats`)

            const data = await res.json();

            if(data.code !== 200) throw new Error(data.msg);

            return data;
        } catch(e){
            throw new Error(e);
        }
    }

    async login(email, password){
        if(!email || !password){
            throw new Error('Email and password are required');
        }

        try {
            const res = await fetch(`${this.api}/auth/access`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    secret: password
                })
            })

            const data = await res.json();

            if(data.code !== 200) throw new Error(data.msg);

            this.token = data.token;
            this.uid = data.uid;

            const thisUser = await this.users.get(data.uid);

            this.user = thisUser;

            this.emit('ready', thisUser);
            return data.code;
        } catch(e){
            throw new Error(e);
        }
    }
}

export default Client;