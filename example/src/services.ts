import { Service } from 'feathers-memory';
import { validate, resolve } from '@feathersjs/schema';
import { Application, HookContext } from '@feathersjs/feathers';
import { User, Todo } from './schema';

const serviceOptions = {
  paginate: {
    default: 10,
    max: 50
  }
};

const validateSchema = (target: any) => {
  return async (context: HookContext) => {
    if (context.data) {
      context.data = await validate(context.data, target);
    }
  }
}

const runResolve = (target: any) => {
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

export function services (app: Application) {
  app.use('/users', new Service(serviceOptions));
  app.use('/todos', new Service(serviceOptions));

  app.service('/users').hooks({
    before: {
      all: [ validateSchema(User) ]
    },
    after: {
      all: [ runResolve(User) ]
    }
  });

  app.service('/todos').hooks({
    before: {
      all: [ validateSchema(Todo) ]
    },
    after: {
      all: [ runResolve(Todo) ]
    }
  });
}
