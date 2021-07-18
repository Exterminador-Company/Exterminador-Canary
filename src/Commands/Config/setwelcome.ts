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

        if(!db2.val()) return message.channel.send(`A database do bot não foi iniciada em seu servidor! Inicie para utilizar esse comando!\n\n**Para iniciar utilize h.iniciar**`)

        let canal = message.mentions.channels.first()

        if(!canal) return message.channel.send(`Coloque um canal válido!`);

        database.ref(`Servidores/Welcome/${message.guild.id}`).set({
            ativado: true,
            canal: canal.id
        })

        message.channel.send(`Sucesso! \n\nCanal setado para: ${canal}`)

    }
}