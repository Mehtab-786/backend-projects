require('dotenv').config();
const {Client, GatewayIntentBits} = require('discord.js');

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('clientReady',() => {
    console.log('Bot is ready!@')
});

client.on('messageCreate', (message) => {
    console.log('Message recieved : ', message.content)
})

client.login(process.env.DISCORD_BOT_TOKEN)