import { validate, resolve } from '@feathersjs/schema';
import { HookContext } from '@feathersjs/feathers';

export const validateSchema = (target: any) => {
  return async (context: HookContext) => {
    if (context.data) {
      context.data = await validate(context.data, target);
    }
  }
}

export const runResolve = (target: any) => {
  return async (context: HookContext) => {
    const { result, method } = context;

    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map((item: any) =>
        resolve(item, target, context)
      ));
    } else {
      context.result = await resolve(result, target, context);
    }

    return context;
  }
}
