import { Command } from "../../Interfaces";
import firebase from "firebase"
import { MessageEmbed } from "discord.js";
const database = firebase.database()

export const command: Command = {
    name: 'setlang',
    description: 'Muda a língua do bot',
    aliases: ['set-lang', 'setar-lang', 'setlingua', 'set-lingua'],

    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.config.emojis.nao} - Você não tem permissão de utilizar esse comando!`)
        let db = await database.ref(`Servidores/Lingua/${message.guild.id}`).once('value');

        let linguar = args[0]

        if(!linguar) {
            let embed = new MessageEmbed()
            .setTitle(`Linguas`)
            .setDescription(`${client.config.emojis.nao} - Selecione uma língua válida!\n\nLinguas aceitadas: **EN** / **PT**\n\nExemplos de uso: ${client.config.bot.prefix}setlang EN`)
            .setColor(client.config.emojis.corembed)
            return message.channel.send(embed)
        }
        if(linguar == "EN") {
            database.ref(`Servidores/Lingua/${message.guild.id}`).set({
                lingua: "EN-US"
            })

            return message.channel.send(`${client.config.emojis.sim} - You have selected the English language!`)
        }

        if(linguar == "PT") {
            database.ref(`Servidores/Lingua/${message.guild.id}`).set(null)

            return message.channel.send(`${client.config.emojis.sim} - Você selecionou o idioma português!`)
        }
    }
}