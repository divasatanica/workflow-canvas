import Router from 'koa-router';

export const decorateCommonResponse: Router.IMiddleware = async (ctx, next) => {
  try {
    await next();
    const oldBody = {...ctx.body};

    ctx.body = {
      code: 0,
      message: '',
      data: oldBody,
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      message: e.message,
      stack: e.stack,
    };
  }
}
