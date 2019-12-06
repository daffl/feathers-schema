import { MongoClient } from 'mongodb';
import { Service } from 'feathers-mongodb';
import { errorHandler, Application } from '@feathersjs/express';
import { User, Todo } from './schema';
import { validateSchema, runResolve } from './hooks';


export async function services (app: Application) {
  const client = await MongoClient.connect('mongodb://localhost:27017/feathers');
  const paginate = {
    default: 10,
    max: 50
  };

  app.use('/users', new Service({
    Model: client.db('feathers').collection('users'),
    paginate
  }));
  
  app.use('/todos', new Service({
    Model: client.db('feathers').collection('todos'),
    paginate
  }));

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

  // Express middleware with a nicer error handler
  app.use(errorHandler());
}
