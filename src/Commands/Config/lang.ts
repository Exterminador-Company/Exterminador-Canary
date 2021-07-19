import { Command } from "../../Interfaces";
import firebase from "firebase"
import { MessageEmbed } from "discord.js";
const database = firebase.database()

export const command: Command = {
    name: 'lang',
    description: 'Exibe o idioma do bot',
    aliases: ['lingua'],

    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.config.emojis.nao} - Você não tem permissão de utilizar esse comando!`)
        let db = await database.ref(`Servidores/Lingua/${message.guild.id}`).once('value');

        let kuka;

        if(!db.val()) {
            kuka = `O idioma desse servidor atualmente é: **Português**\n\nCaso queira mudar, utilize ${client.config.bot.prefix}setlang EN`
        }

        if(db.val() != null) {
            kuka = `The language of this server is: **English**\n\n If you want to change use ${client.config.bot.prefix}setlang PT`
        }
        
        let embed = new MessageEmbed()
        .setTitle(`Idioma`)
        .setDescription(kuka)
        .setColor(client.config.emojis.corembed)

        message.channel.send(embed)
    }
}