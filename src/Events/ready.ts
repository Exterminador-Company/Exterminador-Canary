import { Event } from '../Interfaces'

export const event: Event = {
    name: 'ready',
    run: (client) => {
        console.log(`✅ - Eu, o ${client.user.tag} se encontra online!`)
    }
}