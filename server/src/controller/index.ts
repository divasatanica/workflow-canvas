import Router from 'koa-router';
import { getFlowByIdService, listFlowService, saveFlowService } from '../service';

export const getFlowById: Router.IMiddleware = async (ctx, next) => {
  const { id } = ctx.params;
  const data = await getFlowByIdService(id as string);

  console.log('Get:', data);
  ctx.body = {
    detail: data
  };
  next();
};

export const saveFlow: Router.IMiddleware = async (ctx, next) => {
  const { flow } = ctx.request.body;
  await saveFlowService(flow);

  next();
};

export const listFlow: Router.IMiddleware = async (ctx, next) => {
  const list = await listFlowService();
  ctx.body = {
    list,
  };

  next();
}
