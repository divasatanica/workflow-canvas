import Router from 'koa-router';
import { getFlowById, listFlow, saveFlow } from './src/controller';

export const router = new Router();

router.prefix('/workflow');

router.get('/detail/:id', getFlowById);

router.post('/save', saveFlow)
      .post('/list', listFlow);
