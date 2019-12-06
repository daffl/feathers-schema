import { schema, property, Type } from '@feathersjs/schema';
import { HookContext } from '@feathersjs/feathers';

@schema({
  name: 'user'
})
export class User {
  @property()
  id?: string;

  @property({
    type: Type.string().email().required()
  })
  email?: string;
}

@schema({
  name: 'todo'
})
export class Todo {
  @property({
    type: Type.string().required()
  })
  text?: string;

  @property()
  completed?: boolean;

  @property({
    type: Type.string().required()
  })
  userId?: string;

  @property({
    async resolve (todo: any, context: HookContext) {
      return context.app.service('users')
        .get(todo.userId, context.params);
    }
  })
  user?: User
}
