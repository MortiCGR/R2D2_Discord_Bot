import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import welcomeMessage from './welcomeMessage'
dotenv.config()

const client = new DiscordJS.Client({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
    welcomeMessage(client)
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: 'pong',
            allowedMentions: { repliedUser: false }
        })
    }
})

client.login(process.env.TOKEN)