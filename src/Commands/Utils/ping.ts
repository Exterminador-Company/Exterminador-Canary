import { Command } from "../../Interfaces";
import firebase from 'firebase'
const database = firebase.database()

export const command: Command = {
    name: 'ping',
    description: 'Exibe o ping do bot',
    aliases: ['pong'],

    run: async(client, message, args) => {
        const testi = message.channel.send('Ping?')
        let db = await database.ref(`Servidores/Lingua/${message.guild.id}`).once('value');
        let m;

        if(!db.val()) {
            m = "Servidor"
        }
        if(db.val() != null) {
            m = "Server"
        }
        

        let ku = await (await testi).createdTimestamp - message.createdTimestamp

        await (await testi).edit(`${client.config.emojis.tempo} - Pong! \n\nAPI: **${client.ws.ping}ms**\n ${m}: **${ku}ms**`);
    }
}