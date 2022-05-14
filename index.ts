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
    const guildId = '963913950041370676'; // Test
    const guild = client.guilds.cache.get(guildId)
    welcomeMessage(client)
    CommandHandler(client)

    let commands

    if (guild)
    {
        guild.commands
    }
    else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong',
    })

    commands?.create({
        name: 'pace',
        description: 'Calculated how many waves you will have at the end of this season',
        options: [
            {
                name: 'currentWaves',
                description: 'Your current seasonal waves',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER
            }
        ]
    })

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