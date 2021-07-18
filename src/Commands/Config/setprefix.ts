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

       if(!db2.val()) return message.channel.send(`A database do bot não foi iniciada em seu servidor! Inicie para utilizar esse comando!\n\n**Para iniciar utilize h.iniciar**`)

        let argumento = args[0]

        if(!argumento) {
            message.channel.send(`Insira um novo prefix!`)
        } else {

        database.ref(`Servidores/Prefixo/${message.guild.id}`).set({
            prefix: argumento
        })

        message.channel.send(`Sucesso!\n\nO novo prefixo do bot é: **${argumento}**`)
    }
    }
}