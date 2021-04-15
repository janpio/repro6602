import Koa, { Context } from 'koa';
import Router from 'koa-router';
import { PrismaClient } from '@prisma/client';


const HOST = "127.0.0.1";
const PORT = process.env.PORT || 7000;

const router = new Router();
export const app = new Koa();
router.get('/', (ctx) => ctx.body = { message: 'Welcome to MikroORM Koa TS example, try CRUD on /author and /book endpoints!' });


(async () => {
    const prisma = new PrismaClient();
    app.use(router.routes())
    app.use(router.allowedMethods())
    console.log("Added Routes");
    app.use((ctx, next) => {
      ctx.status = 404;
      ctx.body = { message: 'No route found' };
    });

    app.on("error", err => {
      console.log(err);
    })

    app.listen(PORT, () => {
      console.log("Ready to roll"); 
    });

})();