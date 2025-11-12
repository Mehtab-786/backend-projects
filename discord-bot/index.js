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
    if(message.author.bot) return;
    console.log(message);
    
    message.reply('hellioo, replied to this message')
})

client.login(process.env.DISCORD_BOT_TOKEN)