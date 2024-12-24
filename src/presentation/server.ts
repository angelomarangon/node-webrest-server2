import express from 'express';
import path from 'path';

interface Options {
    PORT: number;
    PUBLIC_PATH?: string;
}



export class Server {

    private app = express();
    private readonly PORT: number;
    private readonly PUBLIC_PATH: string;

    constructor(options : Options) {
        const {PORT, PUBLIC_PATH = 'public'} = options;
        this.PORT = PORT;
        this.PUBLIC_PATH = PUBLIC_PATH;
    }

    async start() {

        //* Middlewares

        //* Public Forder
        this.app.use(express.static(this.PUBLIC_PATH));


        this.app.get('*', (req,res) => {
            const indexPath = path.join(__dirname + `../../../${this.PUBLIC_PATH}/index.html`);
            res.sendFile(indexPath);
            return;
        })

        this.app.listen(this.PORT, ()=> {
            console.log(`Server running on port ${this.PORT}`);
        })
    }
}