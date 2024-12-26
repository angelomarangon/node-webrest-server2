import express, { Router } from 'express';
import path from 'path';

interface Options {
    PORT: number;
    routes: Router;
    PUBLIC_PATH?: string;
}



export class Server {

    private app = express();
    private readonly PORT: number;
    private readonly PUBLIC_PATH: string;
    private readonly routes: Router;

    constructor(options : Options) {
        const {PORT, routes, PUBLIC_PATH = 'public'} = options;
        this.PORT = PORT;
        this.PUBLIC_PATH = PUBLIC_PATH;
        this.routes = routes;
    }

    async start() {

        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded

        //* Public Forder
        this.app.use(express.static(this.PUBLIC_PATH));

        //* Routes
        this.app.use(this.routes);

        //* SPA (cualquier ruta no definida, redirigir a index.html)
        this.app.get('*', (req,res) => {
            const indexPath = path.join(__dirname + `../../../${this.PUBLIC_PATH}/index.html`);
            res.sendFile(indexPath);
            return;
        });


        this.app.listen(this.PORT, ()=> {
            console.log(`Server running on port http://localhost:${this.PORT}`);
        })
    }
}