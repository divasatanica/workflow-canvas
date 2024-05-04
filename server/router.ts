import Router from 'koa-router';
import { getFlowById, saveFlow } from './src/controller';

export const router = new Router();

router.prefix('/workflow');

router.get('/:id', getFlowById);

router.post('/save', saveFlow);
