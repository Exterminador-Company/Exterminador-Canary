import { Event } from '../Interfaces'

export const event: Event = {
    name: 'ready',
    run: (client) => {
        console.log(`โ - Eu, o ${client.user.tag} se encontra online!`)

        client.user.setStatus("idle")
        client.user.setActivity("EM DESENVOLVIMENTO!", {type: "PLAYING"})
           
        setInterval( async () => {
            let random = Math.floor(Math.random() * 10);
          
          
          client.user.setStatus("idle")
     
         let membrus = client.users.cache.size
          
          if (random == 0) client.user.setActivity(`๐งMeu criador: Vitogiu1#1418๐ง [${client.guilds.cache.size}]`, {type: "LISTENING"})
          if (random == 1) client.user.setActivity(`๐คVote em mim! https://extlist.com/bots/789512083972161546/votar ๐ค [${client.guilds.cache.size}]`, {type: "STREAMING", url: "https://www.twitch.tv/vitogiu1"})
          if (random == 3) client.user.setActivity(`๐${client.guilds.cache.size}  servidores๐ [${client.guilds.cache.size}]`, {type: "WATCHING"})
          if (random == 4) client.user.setActivity(`๐ Meu servidor de Suporte => https://discord.com/invite/REdUdMFZy9 ๐ [${client.guilds.cache.size}]`, {type: "STREAMING", url: "https://www.twitch.tv/vitogiu1"})
          if (random == 5) client.user.setActivity(`๐O meu prefixo รฉ [e.]!๐ [${client.guilds.cache.size}]`)
           if (random == 6) client.user.setActivity(`๐Que Seu Dia Seja Cheio De FELICIDADE๐[${client.guilds.cache.size}]`, {type: "STREAMING", url: "https://www.twitch.tv/vitogiu1"})
          if (random == 7) client.user.setActivity(`๐ฉโ๐ฉโ๐ฆโ๐ฆ${membrus} Membros๐ฉโ๐ฉโ๐ฆโ๐ฆ  `, {type: "LISTENING"})
         }, 1000 * 5);
    }
}