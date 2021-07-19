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
        let db4 = await database.ref(`Servidores/Lingua/${message.guild.id}`).once('value');

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

        let alreadyDatabase;
        let sucess;

        if(db4.val() != null) {
            alreadyDatabase = `${client.lang.en.iniciar.alreadyDatabase}`
            sucess = `${client.lang.en.iniciar.success}`
        }

        if(!db4.val()) {
            alreadyDatabase = `${client.lang.pt.iniciar.alreadyDatabase}`
            sucess = `${client.lang.pt.iniciar.success}`
        }


        if(db.val() != null) {
            return message.channel.send(`${alreadyDatabase}`)
        }

        if(db2.val() != null) {
            return message.channel.send(`${alreadyDatabase}`)
        }

        if(db3.val() != null) {
            return message.channel.send(`${alreadyDatabase}`)
        }

        message.channel.send(`${sucess}`)
    }
}