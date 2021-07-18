import { Command } from "../../Interfaces";
import firebase from "firebase";
const database = firebase.database()

export const command: Command = {
    name: 'iniciar',
    description: 'Inicia a database do bot em seu servidor',
    aliases: ['inicio'],

    run: async(client, message, args) => {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.config.emojis.nao} - Você não tem permissão para utilizar esse comando!`)
        let db = await database.ref(`Servidores/Prefixo/${message.guild.id}`).once('value');
        let db2 = await database.ref(`Servidores/Iniciar/${message.guild.id}`).once('value');
        let db3 = await database.ref(`Servidores/Welcome/${message.guild.id}`).once('value');

        if(!db.val()) {
            database.ref(`Servidores/Prefixo/${message.guild.id}`).set({
                prefix: 'e.'
            })
        }

        if(!db2.val()) {
            database.ref(`Servidores/Iniciar/${message.guild.id}`).set({
                iniciado: true
            })
        }

        if(!db3.val()) {
            database.ref(`Servidores/Welcome/${message.guild.id}`).set({
                ativado: false
            })
        }

        if(db.val() != null) {
            return message.channel.send(`${client.config.emojis.nao} - Você já iniciou a database!`)
        }

        if(db2.val() != null) {
            return message.channel.send(`${client.config.emojis.nao} - Você já iniciou a database!`)
        }

        if(db3.val() != null) {
            return message.channel.send(`${client.config.emojis.nao} - Você já iniciou a database!`)
        }

        message.channel.send(`${client.config.emojis.sim} Sucesso! Você iniciou a database do bot no servidor`)
    }
}