import Koa from 'koa';
import KoaCors from '@koa/cors';
import { koaBody } from 'koa-body';
import { router } from './router';
import { decorateCommonResponse } from './src/middlewares';

const app = new Koa();

const port = 3000;

app.use(decorateCommonResponse);
app.use(koaBody());
app.use(KoaCors());
app.use(router.routes());

app.listen(port, () => {
  console.log(`🚀 Server is running on port http://localhost:${port}/`);
});
