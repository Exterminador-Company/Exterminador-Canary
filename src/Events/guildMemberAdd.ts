import { Event } from '../Interfaces'
import firebase from "firebase";
import { TextChannel } from 'discord.js';
const database = firebase.database()
export const event: Event = {
    name: 'guildMemberAdd',
    run: async (client, member) => {
        let db = await database.ref(`Servidores/Welcome/${member.guild.id}`).once('value')
        if(!db.val()) return;
        if(!db.val().canal) return
        let canal = client.channels.cache.get(db.val().canal) as TextChannel
        let guild = client.guilds.cache.get(member.guild.id)

        canal.send(`Bem vindo **${member}** ao **${guild.name}**`)
    }
}