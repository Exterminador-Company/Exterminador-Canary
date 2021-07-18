import { Client, Collection } from 'discord.js';
import path from 'path';
import { readdirSync } from 'fs'
import { Command, Event, Config } from '../Interfaces'
import Configjson from '../config.json'
import Firebase from 'firebase'

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public config: Config = Configjson
    public aliases: Collection<string, Command> = new Collection()

    public async init() {
        this.login(this.config.bot.token)
        var firebaseConfig = {
            apiKey: this.config.firebase.apiKey,
            authDomain: this.config.firebase.authDomain,
            databaseURL: this.config.firebase.databaseURL,
            projectId: this.config.firebase.projectId,
            storageBucket: this.config.firebase.storageBucket,
            messagingSenderId: this.config.firebase.messagingSenderId,
            appId: this.config.firebase.appId
          };
          // Initialize Firebase
          Firebase.initializeApp(firebaseConfig);
          const database = Firebase.database()

        
        //Comandos ;D
        const comandus = path.join(__dirname, "..", "Commands");
        readdirSync(comandus).forEach((dir) => {
            const commands = readdirSync(`${comandus}/${dir}`).filter((file) => file.endsWith('.ts'));

            for (const file of commands) {
                const { command } = require(`${comandus}/${dir}/${file}`);
                this.commands.set(command.name, command);

                if(command?.aliases.length !== 0) {
                    command.aliases.forEach(alias => {
                        this.aliases.set(alias, command)
                    });
                }
            }
        })


        //Eventos ;D

        const eventus = path.join(__dirname, "..", "Events");
        readdirSync(eventus).forEach(async (file) => {
            const { event } = await import(`${eventus}/${file}`);
            this.events.set(event.name, event);
            console.log(event);
            this.on(event.name, event.run.bind(null, this));
        })
    }
}

export default ExtendedClient;