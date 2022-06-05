# Flecko APP 
Create bots for https://flecko.app

### Example

```js
const { Client } = require('flecko.app');
const client = new Client();

client.on("ready", async (data) => {
    const uid = data.id;
    const me = await client.users.get("me"); // reserved for your current session
    console.log(data.groups)
    console.log(me)

    const site_stats = await client.stats();
    console.log(site_stats);
});

client.login(
    "YOUR_EMAIL",
    "YOUR_PASSWORD"
);
```