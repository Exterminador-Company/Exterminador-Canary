import { Command } from "../../Interfaces";
import firebase from "firebase";
const database = firebase.database()

export const command: Command = {
    name: 'setwelcome',
    description: 'seta o canal de boas vindas',
    aliases: ['set-boas-vindas', 'setentrada', 'set-entrada'],
    run: async(client, message, args) => {
        let db = await database.ref(`Servidores/Welcome/${message.guild.id}`).once('value');
        let db2 = await database.ref(`Servidores/Iniciar/${message.guild.id}`).once('value');
        let db3 = await database.ref(`Servidores/Lingua/${message.guild.id}`).once('value');

        let msg1;
        let msg2;
        let msg3;

        if(!db3.val()) {
            msg1 = `${client.config.emojis.nao} - A database do bot não foi iniciada em seu servidor!\n\n**Para iniciar utilize ${client.config.bot.prefix}iniciar**`
            msg2 = `${client.config.emojis.nao} - Coloque um canal válido!`
            msg3 = `${client.config.emojis.sim} - Sucesso! \n\nCanal setado para: `
        }

        if(db3.val() != null) {
            msg1 = `${client.config.emojis.nao} - The database for the bot is not initializated in this server!\n\n **To start use ${client.config.bot.prefix}start** `
            msg2 = `${client.config.emojis.nao} - Enter a valid channel!`
            msg3 = `${client.config.emojis.sim}- Success! \n\nChannel is set to: `
        }

        if(!db2.val()) return message.channel.send(msg1)

        let canal = message.mentions.channels.first()

        if(!canal) return message.channel.send(msg2);

        database.ref(`Servidores/Welcome/${message.guild.id}`).set({
            ativado: true,
            canal: canal.id
        })

        message.channel.send(msg3 + `${canal}`)

    }
}