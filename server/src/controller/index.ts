import Router from 'koa-router';
import { getFlowByIdService, saveFlowService } from '../service';

export const getFlowById: Router.IMiddleware = async (ctx, next) => {
  const { id } = ctx.params;
  const data = await getFlowByIdService(id as string);

  console.log('Get:', data);
  ctx.body = data;
  next();
};

export const saveFlow: Router.IMiddleware = async (ctx, next) => {
  const { flow } = ctx.request.body;
  await saveFlowService(flow);

  next();
};
