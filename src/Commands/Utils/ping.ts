import { Command } from "../../Interfaces";

export const command: Command = {
    name: 'ping',
    description: 'Exibe o ping do bot',
    aliases: ['pong'],

    run: async(client, message, args) => {
        const testi = message.channel.send('Ping?')

        let ku = await (await testi).createdTimestamp - message.createdTimestamp

        await (await testi).edit(`Pong! \n\nLatência Da API: **${client.ws.ping}ms**\nLatência Do Servidor: **${ku}ms**`);
    }
}