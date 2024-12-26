import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(() => {
    main();
})();

function main() {
    const server = new Server({
        PORT: envs.PORT,
        routes: AppRoutes.routes,
        PUBLIC_PATH: envs.PUBLIC_PATH
    });
    server.start();
}