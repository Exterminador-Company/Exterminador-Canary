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

        if(!db.val()) {
            FIX = client.config.bot.prefix
        } else {
            FIX = db.val().prefix
        }

        if(message.content.startsWith(`<@${client.config.bot.id}>`) || message.content.startsWith(`<@!${client.config.bot.id}>`)) {
            const embed = new MessageEmbed()
            .setTitle(`Alguém me chamou?`)
            .setDescription(`Olá! Sou o **${client.user.tag}**! Meu prefixo nesse servidor é: **${FIX}**`)
            .addField('✨ Prefix:', `\`\`\`${FIX}\`\`\``)
            .addField('🚀 Servidores:', `\`\`\`${client.guilds.cache.size}\`\`\``)
            .addField('👨‍👩‍👦 Usuários: ', `\`\`\`${client.users.cache.size}\`\`\``)
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

