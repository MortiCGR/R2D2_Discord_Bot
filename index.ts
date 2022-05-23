import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import CommandHandler from './Commands/CommandHandler'
import welcomeMessage from './Commands/WelcomeMessage/welcomeMessage'
dotenv.config()

const client = new DiscordJS.Client({
    intents : [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
    welcomeMessage(client)
    
    CommandHandler(client)
})

client.login(process.env.TOKEN)