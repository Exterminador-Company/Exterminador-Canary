import { Command } from "../../Interfaces";
import firebase from "firebase"
const database = firebase.database()

export const command: Command = {
    name: 'prefix',
    description: 'Exibe o prefix atual do bot!',
    aliases: ['prefixo'],

    run: async(client, message, args) => {
        let db = await database.ref(`Servidores/Prefixo/${message.guild.id}`).once('value');
        let db2 = await database.ref(`Servidores/Lingua/${message.guild.id}`).once('value');
        
        let prefixo;

        if(!db.val()) {
            prefixo = client.config.bot.prefix
        } else {
            prefixo = db.val().prefix
        }

        let messagi;

        if(!db2.val()) {
            messagi = `${client.config.emojis.sim} - O prefixo atual do bot é **${prefixo}**`
        }
        if(db2.val() != null) {
            messagi = `${client.config.emojis.sim} - The bot's current prefix is **${prefixo}**`
        }

        message.channel.send(`${messagi}`)
    }
}