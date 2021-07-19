import { Command } from "../../Interfaces";
import firebase from "firebase";
const database = firebase.database()

export const command: Command = {
    name: 'setprefix',
    description: 'Muda o prefixo do bot',
    aliases: ['set-prefix'],

    run: async(client, message, args) => {
       let db = await database.ref(`Servidores/Prefixo/${message.guild.id}`).once('value');
       let db2 = await database.ref(`Servidores/Iniciar/${message.guild.id}`).once('value');
       let db3 = await database.ref(`Servidores/Lingua/${message.guild.id}`).once('value');

       let msg1;
       let msg2;
       let msg3;
       let argumento = args[0]

       if(db3.val() != null) {
           msg1 = `${client.config.emojis.nao} - The database for the bot is not initializated in this server!\n\n **To start use ${client.config.bot.prefix}start** `
           msg2 = "enter a new prefix"
           msg3 = `${client.config.emojis.sim} - Success!\n\nThe new prefix for the bot is: **${argumento}**`
       }

       if(!db3.val()) {
           msg1 = `${client.config.emojis.nao} - A database do bot não foi iniciada em seu servidor! \n\n**Para iniciar utilize ${client.config.bot.prefix}iniciar**`
           msg2 = "Insira um novo prefix!"
           msg3 = `${client.config.emojis.sim} - Sucesso!\n\nO novo prefixo do bot é: **${argumento}**`
       }

       if(!db2.val()) return message.channel.send(msg1)

        if(!argumento) {
            message.channel.send(msg2)
        } else {

        database.ref(`Servidores/Prefixo/${message.guild.id}`).set({
            prefix: argumento
        })

        message.channel.send(msg3)
    }
    }
}