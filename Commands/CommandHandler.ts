import { Client } from "discord.js"
import paceCalculator from "./PaceCalculator/paceCalculator"

export default (client : Client) => {

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return
        }
        const {commandName, options} = interaction

        switch (commandName) {
            case 'pace':
                paceCalculator(interaction)
                break;
        
            default:
                break;
        }
    })
}