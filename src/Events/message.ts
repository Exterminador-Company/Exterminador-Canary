import { Event, Command } from "../Interfaces";
import { Message, MessageEmbed } from "discord.js";
import firebase from 'firebase';
const database = firebase.database()

export const event: Event = {
    name: 'message',
    run: async(client, message: Message) => {
      if(message.author.bot) return;
      if(message.channel.type == 'dm') return;
        let FIX;

        let db = await database.ref(`Servidores/Prefixo/${message.guild.id}`).once('value')
        let db2 = await database.ref(`Servidores/Lingua/${message.guild.id}`).once('value');

        if(!db.val()) {
            FIX = client.config.bot.prefix
        } else {
            FIX = db.val().prefix
        }

        let title; 
        let description;

        if(!db2.val()) {
            title = "Alguém me chamou?"
            description = `Olá! Sou o **${client.user.tag}**! Meu prefixo nesse servidor é: **${FIX}**\n\nSou a versão canary do Exterminador-Bot escrito em Typescript! Ainda estou em desenvolvimento.`
        }

        if(db2.val() !== null) {
            title = "Did anyone call me?"
            description = `Hello! I am **${client.user.tag}**! My prefix on this server is: **${FIX}**\n\nI'm the canary version at Exterminador-Bot writing in Typescript! still in development`
        }

        if(message.content.startsWith(`<@${client.config.bot.id}>`) || message.content.startsWith(`<@!${client.config.bot.id}>`)) {
            const embed = new MessageEmbed()
            .setTitle(`${title}`)
            .setDescription(`${description}`)
            .addField('✨ Prefix:', `\`\`\`${FIX}\`\`\``)
            .addField('🚀 Servers:', `\`\`\`${client.guilds.cache.size}\`\`\``)
            .addField('👨‍👩‍👦 Users: ', `\`\`\`${client.users.cache.size}\`\`\``)
            .setColor(client.config.emojis.corembed)

            message.channel.send(embed)
        }
        if(message.author.bot || !message.guild || !message.content.startsWith(FIX)) return;

        const args = message.content.slice(FIX.length).split(/ +/);

        const CMD = args.shift().toLowerCase();
        const COMANDOS = client.commands.get(CMD) || client.aliases.get(CMD);
        if(COMANDOS) (COMANDOS as Command).run(client, message, args);
    }
}

