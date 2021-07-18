export interface Config {
    bot: {
        token: string;
        prefix: string;
        secret: string;
        id: string;
    },
    emojis: {
        sim: string;
        nao: string;
        duvida: string;
        tempo: string; 
        relogio: string;
        protecao: string;
        corembed: string;
    },
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    }
}