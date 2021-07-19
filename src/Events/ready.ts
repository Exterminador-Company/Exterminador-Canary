import { Event } from '../Interfaces'

export const event: Event = {
    name: 'ready',
    run: (client) => {
        console.log(`✅ - Eu, o ${client.user.tag} se encontra online!`)

        client.user.setStatus("idle")
        client.user.setActivity("EM DESENVOLVIMENTO!", {type: "PLAYING"})
           
        setInterval( async () => {
            let random = Math.floor(Math.random() * 10);
          
          
          client.user.setStatus("idle")
     
         let membrus = client.users.cache.size
          
          if (random == 0) client.user.setActivity(`🧑Meu criador: Vitogiu1#1418🧑 [${client.guilds.cache.size}]`, {type: "LISTENING"})
          if (random == 1) client.user.setActivity(`🤖Vote em mim! https://extlist.com/bots/789512083972161546/votar 🤖 [${client.guilds.cache.size}]`, {type: "STREAMING", url: "https://www.twitch.tv/vitogiu1"})
          if (random == 3) client.user.setActivity(`🔍${client.guilds.cache.size}  servidores🔍 [${client.guilds.cache.size}]`, {type: "WATCHING"})
          if (random == 4) client.user.setActivity(`🚀 Meu servidor de Suporte => https://discord.com/invite/REdUdMFZy9 🚀 [${client.guilds.cache.size}]`, {type: "STREAMING", url: "https://www.twitch.tv/vitogiu1"})
          if (random == 5) client.user.setActivity(`🔑O meu prefixo é [e.]!🔑 [${client.guilds.cache.size}]`)
           if (random == 6) client.user.setActivity(`🌈Que Seu Dia Seja Cheio De FELICIDADE🌈[${client.guilds.cache.size}]`, {type: "STREAMING", url: "https://www.twitch.tv/vitogiu1"})
          if (random == 7) client.user.setActivity(`👩‍👩‍👦‍👦${membrus} Membros👩‍👩‍👦‍👦  `, {type: "LISTENING"})
         }, 1000 * 5);
    }
}